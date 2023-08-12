import { BadRequestException, ValidationError } from '@nestjs/common';
export declare const errorValidationAdvice: (errors: ValidationError[]) => BadRequestException;
