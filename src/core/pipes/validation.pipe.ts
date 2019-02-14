import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor (
        private readonly schema: Joi.SchemaLike,
    ) {}

    transform (value: any, metadata: ArgumentMetadata) {
        const { error } = Joi.validate(value, this.schema);
        if (error) throw new BadRequestException(error.message);

        return value;
    }
}
