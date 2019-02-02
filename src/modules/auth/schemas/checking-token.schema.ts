import { object, ObjectSchema, SchemaMap, string } from 'joi';

const schemaMap: SchemaMap = {
    currentToken: string()
        .optional(),
};

export const CHECKING_TOKEN: ObjectSchema = object().keys(schemaMap);
