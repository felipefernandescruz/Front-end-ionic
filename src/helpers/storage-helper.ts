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
        return "600fa732-3105-411d-b167-d9cf0d8cd014";
    }

    public getUserToken() {
        return this.getUser().Token;
    }
}
