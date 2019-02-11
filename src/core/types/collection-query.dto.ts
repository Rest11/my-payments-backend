import { SortOrders } from '../constants';

export interface CollectionQueryDto {
    readonly limit?: number;
    readonly offset?: number;
    readonly sortField?: string;
    readonly sortOrder?: SortOrders;
}
