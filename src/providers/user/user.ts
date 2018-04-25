import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseProvider } from '../base/base';
import { LoginModel } from '../../models/login.model';
import { RegisterModel } from '../../models/register.model';


@Injectable()
export class UserProvider extends BaseProvider {

  constructor(public injector: Injector) {
    super(injector);
  }

  public create(userData: any){
    let params = new HttpParams();
    return this.httpPost('User',userData,params);
  }

  public list() {
    let params = new HttpParams();
    return this.httpGet('User', params);
  }

  public update(userData: any) {
    let params = new HttpParams();
    return this.httpPut('User', userData, params);
  }

  public login(userData: LoginModel){
    let aux = {
      "email": userData.email,
      "password" : userData.password,
      "originaccessId": 3
    }
    let params = new HttpParams();

    return this.httpPost('api/Authentication/Login',aux, params)
  }

  public register(userData : RegisterModel){
    let params = new HttpParams();
    let aux = {
      "first_name": userData.firstName,
       "last_name": userData.lastName , 
       "email" : userData.email, 
       "password":userData.password,
       "confirmPassword": userData.confirmPassword,
       "originaccessId": userData.originAccess,
       "picture": "./assets/imgs/profile-picture.png"

    };
    return this.httpPost('api/Authentication/Register/', aux, params);
  }

}
