import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceRegisterMapPage } from './place-register-map';

@NgModule({
  declarations: [
    PlaceRegisterMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceRegisterMapPage),
  ]
})
export class PlaceRegisterMapPageModule {}
