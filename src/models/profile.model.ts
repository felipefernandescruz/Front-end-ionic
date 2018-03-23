export class ProfileModel {

    name: string;
    lastName:string;
    picture: any;
    description: string;
    facebook: number;
    instagram: number;

    constructor() {
        this.name = '';
        this.lastName='';
        this.picture = "./assets/imgs/dp.jpg";
        this.description = '';
        this.facebook = 0;
        this.instagram = 0;
    }
}
