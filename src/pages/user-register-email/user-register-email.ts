import { Component,Injector } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { BasePage } from '../base';
import { FormGroup } from '@angular/forms/src/model';
import { RegisterModel } from '../../models/register.model';
import { UserProvider } from '../../providers/user/user';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the UserRegisterEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log(this.navParams.data);
    this.registerModel = this.navParams.data;
    console.log(this.registerModel);
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
            this.loadingHelper.showLoading();
            
            this.navCtrl.setRoot(MenuPage);

            this.userProvider.register(this.registerModel)
            .subscribe(success.bind(this), error.bind(this))
          }else{
            this.alertHelper.errorAlert('Emails Diferentes');
          }
          
        }
    
        function success(data){
          this.loadingHelper.hideLoading();
          this.alertHelper.okAlert("Registro Cadastrado com sucesso");
    
        }
        function error(data){
          this.loadingHelper.hideLoading();
          this.alertHelper.okAlert(data);
        }
      }

}
