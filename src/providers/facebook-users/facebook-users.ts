import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseProvider } from '../base/base';
import { FacebookModel } from '../../models/facebook.model';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
/*
  Generated class for the FacebookLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookUsersProvider extends BaseProvider{

  constructor(public injector : Injector, private facebook : Facebook) {
    super(injector);
  }

   public onFacebookLogin(facebookModel : FacebookModel){
     this.facebook.login(['public_profile', 'user_friends', 'email'])
     .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
     .catch(e => console.log('Error logging into Facebook', e));
  
   }

   public onFaceLogin(successCallback, errorCallback){
    
    this.facebook.login(['public_profile', 'user_friends', 'email', 'user_events'])
    .then((res: FacebookLoginResponse) => {
        this.facebook.api('me?fields=id,name,email,events,first_name,last_name,picture.width(720).height(720).as(picture_large)',[])
        .then(profile => {
            let userData = {email: profile.email,first_name: profile.first_name,last_name: profile.last_name, facebookId:profile.id,
            picture: profile['picture_large']['data']['url'], username: profile['name']};

            successCallback(userData);
        });
        console.log('Logged into Facebook!', res)
        
    },
    err =>{
        console.log('Error logging into Facebook', err);
        errorCallback(err);
    });

}

}
