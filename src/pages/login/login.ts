import { Component,Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../base';
import { UserRegisterPage } from '../user-register/user-register';
import { LoginModel } from '../../models/login.model';
import { FormGroup } from '@angular/forms/src/model';
import { MenuPage } from '../menu/menu';
import { FacebookModel } from '../../models/facebook.model';
import { FacebookUsersProvider } from '../../providers/facebook-users/facebook-users';
import { UserProvider } from '../../providers/user/user';
import { RegisterModel } from '../../models/register.model';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {

  public loginModel:LoginModel;
  public loginForm: FormGroup;
  public registerModel : RegisterModel;

  public isSubmitted: boolean;

  constructor(protected injector: Injector,private facebookUsersProvider : FacebookUsersProvider, private userProvider: UserProvider) {
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
    this.isSubmitted = true;
    this.loadingHelper.showLoading();
    if(this.loginForm.valid){ 
      console.log(this.loginModel)
      this.userProvider.login(this.loginModel)
      .subscribe(success.bind(this), error.bind(this));    
          
    }

    function success(data){
      if(data.statusCode == 200){
        this.registerModel = new RegisterModel();
        this.registerModel.setUser(data);
        this.storageHelper.setUser(this.registerModel);  
        console.log(this.storageHelper.getUser());
        this.navCtrl.setRoot(MenuPage);
        this.loadingHelper.hideLoading();
        
      }else{
        this.loadingHelper.hideLoading();
        this.alertHelper.okAlert(data.data);   
      }

    }
    function error(data){
      this.loadingHelper.hideLoading();
      console.log(data);
    }
  }

  public onFacebookLogin(){
    let facebookModel : FacebookModel = new FacebookModel();
    this.facebookUsersProvider.onFaceLogin(res => {
      facebookModel.setUserFace(res);
      console.log(res);
      this.facebookUsersProvider.onFacebookLogin(facebookModel)
      .subscribe(success.bind(this), error.bind(this));

      function success(data){
        if(data.statusCode == 200){
          console.log(data);
          facebookModel.setUserFaceDataStorage(data);
          this.storageHelper.setUser(facebookModel);
          console.log(this.storageHelper.getUser());
          this.navCtrl.setRoot(MenuPage);
          this.loadingHelper.hideLoading();
        }else{
          this.loadingHelper.hideLoading();
          this.alertHelper.okAlert(data.data); 
        }
      }

      function error(data){
        this.loadingHelper.hideLoading();
        console.log(data);
      }




      
    },
       err=>
        {
          console.log(err);
        });
  }


  public newUser(){
    this.navCtrl.push(UserRegisterPage);
  }

  public designDev(){
    this.navCtrl.push(MenuPage);
  }

}
