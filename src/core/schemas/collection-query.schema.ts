import { number, object, ObjectSchema, SchemaMap, string } from 'joi';
import { SortOrders } from '../constants';

enum Errors {
    LIMIT = 'Incorrect limit query parameter',
    OFFSET = 'Incorrect offset query parameter',
    SORT_FIELD = 'Incorrect "sort field" parameter',
    SORT_ORDER = 'Incorrect "sort order" parameter',
}

const schemaMap: SchemaMap = {
    limit: number()
        .integer()
        .min((0))
        .error(new Error(Errors.LIMIT)),
    offset: number()
        .integer()
        .min((0))
        .error(new Error(Errors.OFFSET)),
    sortField: string()
        .optional()
        .valid(['id', 'alias'])
        .error(new Error(Errors.SORT_FIELD)),
    sortOrder: string()
        .optional()
        .valid([
           SortOrders.ASC, SortOrders.DESC, SortOrders.RANDOM,
        ])
        .error(new Error(Errors.SORT_ORDER)),
};

export const COLLECTION_QUERY_SCHEMA: ObjectSchema = object().keys(schemaMap);
