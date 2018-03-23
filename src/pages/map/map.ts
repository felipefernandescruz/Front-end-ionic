import { Component, Injector } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { BasePage } from '../base';
import { PlaceRegisterPage } from '../place-register/place-register';


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage extends BasePage {

  constructor(protected injector: Injector) {
    super(injector);
  }

  ionViewDidLoad() {}

  public onPlaceRegister(){
    this.navCtrl.push(PlaceRegisterPage);
  }

}
