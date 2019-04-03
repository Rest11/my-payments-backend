import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserResponse } from '../core/types/user-response';

@Injectable()
export class AuthFacebookService {
    constructor (
        private readonly http: HttpService,
    ) {}

    public async getUser (decodedToken: string): Promise<UserResponse | null> {
        const userFields: string = 'id, name, email, picture';
        try {
            const url: string = 'https://graph.facebook.com/me';
            const options: AxiosRequestConfig = {
                params: {
                    access_token: decodedToken,
                    fields: userFields,
                },
            };

            const res: AxiosResponse = await this.http.get<any>(url, options).toPromise();

            return {
                id: res.data.id,
                name: res.data.name,
                email: res.data.email,
                avatar: res.data.picture.data.url,
            };
        } catch (err) {
            return null;
        }
    }
}
