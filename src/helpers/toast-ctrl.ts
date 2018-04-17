import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ToastCtrl {

    private message: string;
    private position: string;
    private duration: number;
    private userCreated: string;
    private userFail: string;
   

    constructor(private toastCtrl: ToastController, private translateService: TranslateService) {
        this.setTranslateFields();
    }

    private setTranslateFields() {

        this.translateService.get('USER_CREATED')
            .subscribe(value => { this.userCreated = value; });
        this.translateService.get('USER_FAIL')
            .subscribe(value => { this.userFail = value })
        
    }

    public toastPresent(message: string) {
        let toast = this.toastCtrl.create({
            message: message ,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

  
}