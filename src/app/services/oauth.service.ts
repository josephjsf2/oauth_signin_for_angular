import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  // clientId = '173445921847-vv5938ad0b4m5a6itlr23hpa6hie9oqd.apps.googleusercontent.com';
  // scope = 'https://www.googleapis.com/auth/userinfo.profile';
  // callbackUrl = 'http://localhost:4200/callback.html';
  // url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${this.callbackUrl}&response_type=token&client_id=${this.clientId}&scope=https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/userinfo.profile`;

  clientId = '735485010120762';
  scope = 'public_profile  email';
  callbackUrl = 'http://localhost:4200/callback.html';
  url = `https://www.facebook.com/v2.10/dialog/oauth?redirect_uri=${this.callbackUrl}&response_type=token&client_id=${this.clientId}&scope=${this.scope}`;

  // https://developer.twitter.com/en/docs/basics/authentication/api-reference/token
  // clientId = 'PAE49D2b3hH3NnLDMGBqvm7gV';
  // scope = 'public_profile  email';
  // callbackUrl = 'http://localhost:4200/callback.html';
  // url = `https://www.facebook.com/v2.10/dialog/oauth?oauth_token==${this.clientId}`;



  constructor() { }

  openWindows() {
    this.createWindow();

  }

  createWindow() {
    var options = `width=${500},height=${600},left=${0},top=${0}`;

    return window.open(this.url, 'Test', options);

  }
}
