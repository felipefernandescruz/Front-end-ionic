import { UserType } from '../enums/user-type.enum';

export class FacebookModel {

    name: string;
    lastName:string;
    email: string;
    password: string;
    confirmPassword: string;
    picture: any;
    type: number;

    constructor() {
        this.name = '';
        this.lastName='';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.type = null;
    }
}