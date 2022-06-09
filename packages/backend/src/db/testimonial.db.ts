import TestimonialModel, { ITestimonial, ITestimonialDocument } from '../models/testimonial';
import { TestimonialNotFoundException } from '../exceptions/notFoundExceptions';

export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
  const query: any = {};
  const testimonialList: ITestimonial[] = await TestimonialModel.find(query).select('-__v').exec();
  return testimonialList;
};

export const getTestimonial = async (id: string): Promise<ITestimonial> => {
  const testimonial: ITestimonialDocument | null = await TestimonialModel.findOne({ id })
    .select('-__v')
    .exec();
  if (!testimonial) throw new TestimonialNotFoundException(id);

  const result: ITestimonial = testimonial.toObject();
  delete result._id;
  return result;
};

export const createTestimonial = async (payload: any): Promise<ITestimonial> => {
  const testimonial = new TestimonialModel(payload);
  testimonial.id = testimonial._id;
  const savedTestimonial = await testimonial.save();

  const result: ITestimonial = savedTestimonial.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const updateTestimonial = async (id: string, payload: any): Promise<ITestimonial> => {
  const testimonial = await TestimonialModel.findOneAndUpdate({ id }, payload, { new: true });
  if (!testimonial) throw new TestimonialNotFoundException(id);

  const result: ITestimonial = testimonial.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const deleteTestimonial = async (id: string): Promise<ITestimonial> => {
  const deletedTestimonial = await TestimonialModel.findOne({ id }).exec();
  if (!deletedTestimonial) throw new TestimonialNotFoundException(id);

  return deletedTestimonial.deleteOne();
};
