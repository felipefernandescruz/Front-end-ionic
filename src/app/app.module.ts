import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DatePipe} from '@angular/common';

import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

import { Facebook } from '@ionic-native/facebook';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomFormsModule } from 'ng2-validation';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { BaseProvider } from '../providers/base/base';
import { UserProvider } from '../providers/user/user';
import { FacebookUsersProvider } from '../providers/facebook-users/facebook-users';
import { StorageProvider } from '../providers/storage/storage';

import { AlertHelper } from '../helpers/alert-helper';
import { EnumHelper } from '../helpers/enum-helper';
import { LoadingHelper } from '../helpers/loading-helper';
import { ToastCtrl } from '../helpers/toast-ctrl';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UserRegisterPage } from '../pages/user-register/user-register';import { StorageHelper } from '../helpers/storage-helper';
import { UserRegisterEmailPage } from '../pages/user-register-email/user-register-email';
import { MenuPage } from '../pages/menu/menu';
import { ResenhaPage } from '../pages/resenha/resenha';
import { FavoritePage } from '../pages/favorite/favorite';
import { FriendsPage } from '../pages/friends/friends';
import { MapPage } from '../pages/map/map';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserProfileEditPage } from '../pages/user-profile-edit/user-profile-edit';
import { PlaceRegisterPage } from '../pages/place-register/place-register';
import { PlaceRegisterMapPage } from '../pages/place-register-map/place-register-map';
import { PlaceProvider } from '../providers/place/place';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    
    MenuPage,

    ResenhaPage,

    FavoritePage,

    FriendsPage,
    
    UserRegisterPage,
    UserRegisterEmailPage,
    UserProfilePage,
    UserProfileEditPage,

    MapPage,
    PlaceRegisterPage,
    PlaceRegisterMapPage,
  ],
  imports: [
    BrMaskerModule,
    BrowserModule,
    ComponentsModule,
    CustomFormsModule,
    DirectivesModule,
    PipesModule,
    HttpClientModule,
    
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    
    MenuPage,

    ResenhaPage,

    FavoritePage,

    FriendsPage,
    
    UserRegisterPage,
    UserRegisterEmailPage,
    UserProfilePage,
    UserProfileEditPage,

    MapPage,
    PlaceRegisterPage,
    PlaceRegisterMapPage,
    
  ],
  providers: [
    Facebook,
    Camera,
    Geolocation,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: "pt-BR" },
    StatusBar,
    SplashScreen,

    AlertHelper,
    EnumHelper,
    LoadingHelper,
    StorageHelper,
    ToastCtrl,
   
    BaseProvider,
    UserProvider,
    FacebookUsersProvider,
    StorageProvider,
    DatePipe,
    PlaceProvider,

  ]
})
export class AppModule {}
