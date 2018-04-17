import { UserType } from '../enums/user-type.enum';

export class RegisterModel {

    userId?: number;
    facebookId?:number;
    firstName: string;
    lastName:string;
    userName?:string;
    email: string;
    password: string;
    confirmPassword: string;
    originAccess: number;
    picture?: any;
    token?: string;

    constructor() {
        this.firstName = '';
        this.lastName='';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.originAccess = 0;
        this.picture = './assets/imgs/profile-picture.png'
    }

    public setUser(data : any){
        this.email = data.data[2].email;
        this.firstName = data.data[2].first_name;
        this.lastName = data.data[2].last_name;
        this.originAccess = data.data[2].originaccessId;
        this.userId = data.data[2].userId;
        this.userName = data.data[2].userName;
        this.token = data.data[1].token;
        this.password = '';
        this.confirmPassword = '';
    }
}
