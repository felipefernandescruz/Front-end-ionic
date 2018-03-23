import { Component,Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../base';
import { UserRegisterPage } from '../user-register/user-register';
import { LoginModel } from '../../models/login.model';
import { FormGroup } from '@angular/forms/src/model';
import { MenuPage } from '../menu/menu';
import { FacebookModel } from '../../models/facebook.model';
import { FacebookUsersProvider } from '../../providers/facebook-users/facebook-users';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {

  loginModel:LoginModel;
  loginForm: FormGroup;

  public isSubmitted: boolean;

  constructor(protected injector: Injector,private facebookUsersProvider : FacebookUsersProvider) {
    super(injector);

    this.initFormValidators();

    this.loginModel = new LoginModel();
    
  }

  private initFormValidators(){
    this.loginForm= this.formBuilder.group({
      email: ['',this.validators.compose([this.validators.email,this.validators.required])],
      password: ['',this.validators.compose([this.validators.required])]
    })
  }

  public onSubmit(){
    console.log("teste");
    this.isSubmitted = true;
    if(this.loginForm.valid){     
      this.navCtrl.setRoot(MenuPage);      
    }
  }

  public onFacebookLogin(){
    let facebookModel : FacebookModel = new FacebookModel();
    facebookModel.type = this.enumHelper.UserType().Facebook.Id;
    this.facebookUsersProvider.onFaceLogin(res => console.log(res), err=> console.log(err));
  }

  newUser(){
    this.navCtrl.push(UserRegisterPage);
  }

}
