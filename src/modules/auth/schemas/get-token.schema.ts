import { object, ObjectSchema, SchemaMap, string } from 'joi';

const schemaMap: SchemaMap = {
    currentToken: string()
        .required(),
};

export const GET_TOKEN: ObjectSchema = object().keys(schemaMap);
