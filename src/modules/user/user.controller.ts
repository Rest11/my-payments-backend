import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Rest } from '../../core/contracts/rest.contract';

@Controller(Rest.User.BASE)
export class UserController {
    constructor (

    ) {}

    @Post()
    @UseGuards(AuthGuard)
    public saveUser (): any {
        return { isWork: 'WORK' };
    }
}
