import { CollectionQueryDto } from '../../../core/types/collection-query.dto';

export interface TransactionsDto extends CollectionQueryDto{
    userId: string;
}
