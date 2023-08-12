import { BadRequestException, ValidationError } from '@nestjs/common';

export const errorValidationAdvice = (errors: ValidationError[]) => {
  const err = {
    statusCode: 400,
    error: 'Bad Request',
    messages: {},
  };

  errors.forEach((e) => {
    err.messages[e.property] = Object.values(e.constraints);
  });

  return new BadRequestException(err);
};
