import { StorageHelper } from './../../helpers/storage-helper';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
/*
  Generated class for the BaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseProvider {

  private serverUrl = 'http://localhost:2848/';
  
      private storageHelper: StorageHelper;
      private http: HttpClient;
  
      constructor(protected injector: Injector) {
          this.http = this.injector.get(HttpClient);
          this.storageHelper = this.injector.get(StorageHelper);
      }
  
      protected httpGet(api: string, params: HttpParams) {
  
          let url = this.serverUrl + api;
  
          let headers = new HttpHeaders();
          headers.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
              //.set('Authorization', this.storageHelper.getUserToken())
           //   .set('UserId', this.storageHelper.getUserId());
  
          let options = { headers: headers, params: params };
  
          return this.http.get(url, options)
              .map(res => this.handleSuccess(res))
              .catch(error => this.handleError(error));
      }
  
      protected httpPost(api: string, data: any, params: HttpParams) {
  
          let url = this.serverUrl + api;
  
          let headers = new HttpHeaders();
          headers.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
              //.set('Authorization', this.storageHelper.getUserToken())
              //.set('UserId', this.storageHelper.getUserId());
  
          let options = { headers: headers, params: params };
  
          return this.http.post(url, data, options)
              .map(res => this.handleSuccess(res))
              .catch(error => this.handleError(error))
      }
  
      protected httpPut(api: string, data: any, params: HttpParams) {
  
          let url = this.serverUrl + api;
  
          let headers = new HttpHeaders();
          headers.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
              //.set('Authorization', this.storageHelper.getUserToken())
              //.set('UserId', this.storageHelper.getUserId());
  
          let options = { headers: headers, params: params };
  
          return this.http.put(url, data, options)
              .map(res => this.handleSuccess(res))
              .catch(error => this.handleError(error))
      }
  
      private handleSuccess(res) {
          return res.Data;
      }
  
      private handleError(res) {
  
          var message = 'Erro no sistema. Tente novamente.';
  
          if (res && res.Error) {
              message = res.Error.Message;
          }
  
          return Observable.throw(message);
      }

}
