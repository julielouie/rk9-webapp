import { format } from 'util';
import { Storage } from '@google-cloud/storage';
import { InvalidUploadException } from '../exceptions/badRequestExceptions';
import TestimonialModel from '../models/testimonial';
import BlogPostModel from '../models/blogPost';
import PostModel from '../models/post';

const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('rk9-academy');

export const getAllUploads = async (): Promise<{ name: string; url: string }[]> => {
  const [files] = await bucket.getFiles();
  if (!files) throw new InvalidUploadException('Unable to read list of files.');

  const uploadsList: { name: string; url: string }[] = [];
  files.forEach((file) => {
    uploadsList.push({
      name: file.name,
      url: file.metadata.mediaLink,
    });
  });
  return uploadsList;
};

export const getUpload = async (name: string): Promise<any> => {
  const [metaData] = await bucket.file(name).getMetadata();
  if (!metaData) throw new InvalidUploadException('Could not download the file.');
  return metaData.mediaLink;
};

export const upload = async (id: string, postType: any, files: any): Promise<string> => {
  if (!files) throw new InvalidUploadException('No file provided');

  const { media } = files;
  const blob = bucket.file(media.name);
  const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    public: true,
  });
  blobStream.on('error', () => {
    throw new InvalidUploadException('Unable to upload the file to Google Cloud Storage');
  });
  blobStream.on('finish', async () => {
    await bucket
      .file(media.name)
      .makePublic()
      .catch(() => {
        throw new InvalidUploadException(
          `Uploaded the file successfully: ${media.name}, but public access at ${publicUrl} is denied!`,
        );
      });
  });
  blobStream.end(media.data);

  let result;
  switch (postType) {
    case 'testimonial':
      result = await TestimonialModel.findOneAndUpdate(
        { id },
        { $set: { image: publicUrl } },
        { new: true },
      );
      break;
    case 'blogPost':
      result = await BlogPostModel.findOneAndUpdate(
        { id },
        { $set: { image: publicUrl } },
        { new: true },
      );
      break;
    case 'post':
      result = await PostModel.findOneAndUpdate(
        { id },
        { $set: { media: publicUrl } },
        { new: true },
      );
      break;
    default:
      break;
  }
  if (!result) throw new InvalidUploadException(`Error updating image public link for ${postType}`);

  return publicUrl;
};
