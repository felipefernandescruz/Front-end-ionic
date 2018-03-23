import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegisterEmailPage } from './user-register-email';

@NgModule({
  declarations: [
    UserRegisterEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRegisterEmailPage),
  ],
})
export class UserRegisterEmailPageModule {}
