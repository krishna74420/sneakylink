import { Component } from '@angular/core';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // constructor(private platform: Platform,
  //   private splashScreen: SplashScreen,
  //   private statusBar: StatusBar) {
  //   this.initializeApp();
  // }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.backgroundColorByHexString("#ff8567");
  //     this.splashScreen.hide();
  //   });
  // }
  private win: any = window;

  constructor(private platform: Platform, private webView: WebView) {this.loadUrl('https://mobile.sneakylink.net/mobile/');}

  loadUrl(url: string) {
    let urlWithCache = url;
    if (this.platform.is('cordova')) {
      urlWithCache =  this.webView.convertFileSrc(url);
    } else {
      urlWithCache =  url;
    }
    // const urlWithCache = this.win.Ionic.WebView.convertFileSrc(url);
    window.open(urlWithCache, '_self');
  }
}
