import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResenhaRegisterPage } from './resenha-register';

@NgModule({
  declarations: [
    ResenhaRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ResenhaRegisterPage),
  ],
})
export class ResenhaRegisterPageModule {}
