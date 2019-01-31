import { CustomFactory } from '@nestjs/core/injector/module';
import { Injectables } from '../core/constants';
import { Database } from './database';

export const databaseProvider: CustomFactory = {
    name: Injectables.DATABASE,
    provide: Injectables.DATABASE,
    useFactory: () => new Database().create(),
};
