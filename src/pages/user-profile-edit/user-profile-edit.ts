import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { ProfileModel } from '../../models/profile.model';
import { BasePage } from '../base';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-user-profile-edit',
  templateUrl: 'user-profile-edit.html',
})
export class UserProfileEditPage extends BasePage{
  public profileModel: ProfileModel;
  public profileForm: FormGroup;

  public isSubmitted: boolean;

  public base64Image:any = "./assets/imgs/dp.jpg";
  
  constructor(protected injector: Injector, private camera : Camera ) {
    super(injector);

    this.initFormValidators();

    this.profileModel = new ProfileModel();
  }

  ionViewDidLoad() {}

  private initFormValidators(){
    this.profileForm = this.formBuilder.group({
      userName: ['', this.validators.compose([this.validators.required])],
      lastName: ['', this.validators.compose([this.validators.required])],
      description: ['', this.validators.compose([this.validators.required])],
    });
  }

  public accessGallery(){
    
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.profileModel.picture = 'data:image/jpeg;base64,'+imageData;
  //    this.alertHelper.okAlert("atualizou");
    }, (err)=> {
      console.log(err);
    });
  }
  public onSubmit(){}
}
