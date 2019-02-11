import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseQueryPipe implements PipeTransform {
    public transform (value: any, metadata: ArgumentMetadata) {
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                try {
                    value[key] = JSON.parse(value[key]);
                } catch (exc) { }
            }
        }
        return value;
    }
}
