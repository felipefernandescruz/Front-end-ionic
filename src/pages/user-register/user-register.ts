import { Component,Injector } from '@angular/core';
import { BasePage } from '../base';
import { RegisterModel } from '../../models/register.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserRegisterEmailPage } from '../user-register-email/user-register-email';


@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage extends BasePage{

  public registerModel: RegisterModel;
  public registerForm: FormGroup;

  public isSubmitted: boolean;

  constructor(protected injector: Injector) {
    super(injector);

    this.initFormValidators();

    this.registerModel = new RegisterModel();
    this.registerModel.type = this.enumHelper.UserType().Customer.Id
  }
  ionViewDidLoad() {}

  private initFormValidators(){
    this.registerForm = this.formBuilder.group({
      userName: ['', this.validators.compose([this.validators.required])],
      lastName: ['', this.validators.compose([this.validators.required])],
      email: ['', this.validators.compose([this.validators.email, this.validators.required])],
      password: ['', this.validators.compose([this.validators.required])],
      confirmPassword: ['', this.validators.compose([this.validators.required]), this.validateMatchPassword]
    });
  }

  private validateMatchPassword(control: FormControl) {
    let password = control.parent.value.password;
    let confirmPassword = control.value;
    return Observable.of(password == confirmPassword)
      .map(isMatch => isMatch ? null : { passwordNotMatch: true });
  }

  public onSubmit(){
    this.isSubmitted = true;
    if(this.registerForm.valid){     
      this.navCtrl.push(UserRegisterEmailPage,this.registerModel);      
    }
  }

}
