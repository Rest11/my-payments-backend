import { number, object, ObjectSchema, SchemaMap, string } from 'joi';

const schemaMap: SchemaMap = {
    amountPayment: number()
        .required()
        .integer()
        .min(1)
        .max(15),
    stripeTokenId: string()
        .required(),
    description: string()
        .required(),
};

export const DONATION: ObjectSchema = object().keys(schemaMap);
