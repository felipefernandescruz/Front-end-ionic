import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceRegisterPage } from './place-register';

@NgModule({
  declarations: [
    PlaceRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceRegisterPage),
  ],
})
export class PlaceRegisterPageModule {}
