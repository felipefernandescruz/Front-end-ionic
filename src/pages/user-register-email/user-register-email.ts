import { Component,Injector } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { BasePage } from '../base';
import { FormGroup } from '@angular/forms/src/model';
import { RegisterModel } from '../../models/register.model';
import { UserProvider } from '../../providers/user/user';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-user-register-email',
  templateUrl: 'user-register-email.html',
})
export class UserRegisterEmailPage extends BasePage {

  public confirmEmail: string;

  public registerModel : RegisterModel;
  public registerForm:FormGroup;

  public isSubmitted:boolean;
  constructor(protected injector: Injector, private userProvider: UserProvider) {
    super(injector);
    this.registerModel = this.navParams.data;
    this.initFormValidators();

  }

  ionViewDidLoad() {}
  private initFormValidators(){
    this.registerForm = this.formBuilder.group({
      confirmEmail: ['', this.validators.compose([this.validators.email,this.validators.required])]
    });
  }

 

  public onSubmit(){
    
        this.isSubmitted = true;
        console.log(this.isSubmitted);
        console.log(this.registerForm.valid);
        if(this.registerForm.valid){
          if(this.confirmEmail == this.registerModel.email){
            this.registerModel.originAccess = 3;
            this.loadingHelper.showLoading();
            this.userProvider.register(this.registerModel)
            .subscribe(success.bind(this), error.bind(this))
          }else{
            this.alertHelper.errorAlert('Emails Diferentes');
          }
          
        }
    
        function success(data){
          if(data.statusCode == 200){
            this.registerModel.setUser(data);
            this.storageHelper.setUser(this.registerModel);  
            this.navCtrl.setRoot(MenuPage);
            this.loadingHelper.hideLoading();
            this.toastHelper.toastPresent(data.data[0]);
          }else{
            this.alertHelper.okAlert(data.data);
            this.loadingHelper.hideLoading();
          }
          
          
    
        }
        function error(data){
          this.loadingHelper.hideLoading();
          this.alertHelper.okAlert(data);
        }
      }

}
