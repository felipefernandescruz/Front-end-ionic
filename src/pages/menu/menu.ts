import { Component,Injector,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { BasePage } from '../base';
import { TabsPage } from '../tabs/tabs';
import { ResenhaPage } from '../resenha/resenha';
import { FavoritePage } from '../favorite/favorite';
import { FriendsPage } from '../friends/friends';
import { MapPage } from '../map/map';
import { UserProfilePage } from '../user-profile/user-profile';
import { LoginPage } from '../login/login';
import { UserProfileEditPage } from '../user-profile-edit/user-profile-edit';

export interface PageInterface{
  title:string,
  pageName: any,
  tabsComponents?: any,
  index?: number,
  icon:string
}


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage extends BasePage {


  constructor(protected injector : Injector) {
    super(injector);
  }

  rootPage = TabsPage;

  @ViewChild(Nav) nav:Nav;
  private pages: PageInterface[]=[
    {title: 'Perfil',pageName: UserProfilePage, icon: 'cog'},
    {title: 'Resenhas', pageName: TabsPage, tabsComponents: ResenhaPage, index:0, icon: 'book'},
    {title: 'Favoritos',pageName: TabsPage, tabsComponents: FavoritePage, index:1, icon: 'star-half'},
    {title: 'Amigos',pageName: TabsPage, tabsComponents: FriendsPage, index:2, icon: 'contacts'},
    {title: 'Mapas',pageName: TabsPage, tabsComponents: MapPage, index:3, icon: 'map'},
  ];

  private openPage(page: PageInterface){
    let params = {};

    if(page.index){
      params = {tabIndex: page.index}
    }

    if(this.nav.getActiveChildNav() && page.index != undefined){
      this.nav.getActiveChildNav().select(page.index); 
      this.nav.setRoot(page.pageName, params);
    }else{
      this.nav.setRoot(page.pageName, params);
    }
  }

  private isActive(page : PageInterface){
    let childNav = this.nav.getActiveChildNav();
    
       if (childNav) {
         if (childNav.getSelected() && childNav.getSelected().root == page.tabsComponents) {
          
          return 'resenha';
         }
         return;
       }
    
       // Fallback needed when there is no active childnav (tabs not active)
       if (this.nav.getActive() && this.nav.getActive().name === page.title +'Page') {
         return 'resenha';
       }
       return;
  }
  private onExit(){
        this.navCtrl.setRoot(LoginPage);
  }
  
  private onProfileEdit(){
    this.navCtrl.push(UserProfileEditPage);
  }
}
