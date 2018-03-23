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
    let params = new HttpParams()
    .set('email',userData.email)
    .set('password',userData.password);

    return this.httpPost('ApiUser/DoLogin',null, params)
  }

  public register(userData : RegisterModel){
    let params = new HttpParams();

    let aux = {
      "nomeUsuario": "Thiago",
      "Sobrenome" : "Mendes",
      "senha" : "84424643674783"
    
    };
    return this.httpPost('api/Authentica/Cadastro', aux, params);
  }

}
