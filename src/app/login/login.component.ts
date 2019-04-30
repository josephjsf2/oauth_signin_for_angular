import { Component, OnInit } from '@angular/core';
import { OauthService } from '../services/oauth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concat } from 'rxjs/internal/observable/concat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cWindow: any;
  constructor(private oauthService: OauthService, private http: HttpClient) {
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
    }

  }

  ngOnInit() {
  }

  login() {
    this.cWindow = this.oauthService.createWindow();
    this.cWindow.postMessage('message', 'http://localhost:4200/callback.html');
  }

  receiveMessage(event) {
    console.log('xxxxxxx', event);
    if (this.cWindow) {
      console.log(this.cWindow.location.hash);
      const map = this.getUrlParameter(this.cWindow.location.hash);
      const token = map.get('access_token');
      console.log(token)
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      // this.http.get('https://www.googleapis.com/oauth2/v1/userinfo', httpOptions)
      //   .subscribe(data => console.log(data), err => console.log(err));
      // this.http.get('https://www.googleapis.com/oauth2/v1/userinfo.email', httpOptions)
      //   .subscribe(data => console.log(data), err => console.log(err));

      // https://developers.facebook.com/docs/facebook-login/permissions#reference-default
      // https://developers.facebook.com/docs/graph-api/reference/user
      this.http.get(`https://graph.facebook.com/v2.10/me?fields=name,last_name,middle_name,name_format,picture,short_name,email&access_token=${token}`, httpOptions).subscribe(data => console.log(data));
    }
  }

  getUrlParameter(param) {
    if (param) {
      param = param.substr(1);
      const pairs: string[] = param.split('&');
      const keyValMap: Map<string, string> = new Map<string, string>();
      if (pairs.length > 0) {
        for (let pair of pairs) {
          const p = pair.split('=');
          keyValMap.set(p[0], p[1]);
        }
        return keyValMap;
      }
    }
    return new Map<string, string>();
  }
}
