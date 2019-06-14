import { NestFactory } from '@nestjs/core';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AppModule } from './app.module';
import { config } from '../config/config';
import { Rest } from './core/contracts/rest.contract';

async function bootstrap () {
    // setting global prefix for each request
    const globalPrefix: string = `${Rest.API}/v${config.server.apiVersion}`;

    // setting options for Nest application
    const nestOptions: NestApplicationOptions = {
        cors: true,
        bodyParser: true,
    };

    // creating Nest application instance
    const app: INestApplication & INestExpressApplication = await NestFactory.create(AppModule, nestOptions);

    // set global prefix
    app.setGlobalPrefix(globalPrefix);

    // start the server
    await app.listen(config.server.port);
    console.log(`The server is started on the port ${config.server.port}`);
}

bootstrap();
