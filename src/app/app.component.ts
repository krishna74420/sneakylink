import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})
export class AppComponent {
  
  constructor(private platform: Platform,
    private splashScreen: SplashScreen,
    private iab: InAppBrowser,
    private loadingController: LoadingController,
    private statusBar: StatusBar) {
    this.initializeApp();
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#ff8567");
      this.splashScreen.hide();
    });
  }
  // private win: any = window;

  loadUrl(url: string) {
    // let urlWithCache = url;
    // if (this.platform.is('cordova')) {
    //   urlWithCache =  this.webView.convertFileSrc(url);
    // } else {
    //   urlWithCache =  url;
    // }
    // // const urlWithCache = this.win.Ionic.WebView.convertFileSrc(url);
    // window.open(urlWithCache, '_self');
    this.present();
    const options: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      toolbarcolor: '#ff8567',
      hideurlbar: 'yes',
      location: 'no',
      hardwareback: 'no',
      usewkwebview: 'yes',
      allowInlineMediaPlayback: 'yes',
      mediaPlaybackRequiresUserAction: 'no',
    }
    const browser = this.iab.create(url, '_self', options);
  }

  public loader: any
  async present() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await this.loader.present();
  }
}
