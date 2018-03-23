import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FriendsPage } from '../friends/friends';
import { MapPage } from '../map/map';
import { FavoritePage } from '../favorite/favorite';
import { ResenhaPage } from '../resenha/resenha';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ResenhaPage;
  tab2Root = FavoritePage;
  tab3Root = FriendsPage;
  tab4Root = MapPage;
  myIndex :number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
