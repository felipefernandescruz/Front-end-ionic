import { Injectable } from '@angular/core';

@Injectable()
export class StorageHelper {

    constructor() {
    }

    //Public Methods
    public getUser(): any {
        return JSON.parse(localStorage.getItem('lng_user'));
    }

    public setUser(value: any) {
        localStorage.setItem('lng_user', JSON.stringify(value));
    }

    public getUserId() {
        return JSON.parse(localStorage.getItem('userId'));
    }

    public getUserToken() {
        return this.getUser().token;
    }

    public clearStorage(){
        localStorage.clear();
    }

    
}
