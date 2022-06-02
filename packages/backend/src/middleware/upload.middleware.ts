import util from 'util';
import Multer from 'multer';

const processFile = Multer({
  storage: Multer.memoryStorage(),
}).single('file');

export const processFileMiddleware = util.promisify(processFile);
