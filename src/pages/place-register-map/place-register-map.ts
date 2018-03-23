import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlaceRegisterMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-register-map',
  templateUrl: 'place-register-map.html',
})
export class PlaceRegisterMapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  //page
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceRegisterMapPage');
  }
  private initMap(){}

}
