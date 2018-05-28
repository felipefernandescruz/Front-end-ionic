
export class FacebookModel {
      userId?: number; 
      firstName?: string;
      lastName?:string;
      email?: string;
      password: string;
      confirmPassword: string;
      facebookId?: number;
      originaccessId: number;
      picture?: string;
      userName?: string;
      token?: string;


    constructor() {
        this.userId = null,
        this.firstName = null;
        this.lastName= null;
        this.email = null;
        this.password = '-1';
        this.confirmPassword = '-1';
        this.facebookId = null;
        this.originaccessId = 2;
        this.picture = null;
        this.userName = null;
    }

    public setUserFace(data : any){
        this.firstName = data.first_name;
        this.lastName= data.last_name;
        this.email = data.email;
        this.facebookId = data.facebookId;
        this.picture = data.picture;
        this.userName = data.username;
    }

    public setUserFaceDataStorage(data:any){
        this.email = data.data[2].email;
        this.firstName = data.data[2].first_name;
        this.lastName = data.data[2].last_name;
        this.originaccessId = data.data[2].originaccessId;
        this.userId = data.data[2].userId;
        this.userName = data.data[2].userName;
        this.token = data.data[1].token;
        this.password = '';
        this.confirmPassword = '';
    }
}