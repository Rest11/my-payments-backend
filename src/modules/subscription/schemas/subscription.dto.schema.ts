import { object, ObjectSchema, SchemaMap, string } from 'joi';

const schemaMap: SchemaMap = {
    paymentToken: string()
        .required(),
    subscriptionPlanId: string()
        .required(),
};

export const SUBSCRIPTION_DTO: ObjectSchema = object().keys(schemaMap);
