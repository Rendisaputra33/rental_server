import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

export const multerAdvice = (): MulterOptions => ({
  dest: './uploads',
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|heic)$/)) {
      return callback(
        new BadRequestException('Only image files are allowed!'),
        false,
      );
    }

    if (file.size > 2000000) {
      return callback(
        new BadRequestException('File size should not exceed 2 MB!'),
        false,
      );
    }

    callback(null, true);
  },

  storage: memoryStorage(),
});
