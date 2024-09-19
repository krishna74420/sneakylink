import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userList: any = [];
  users: any;
  user_id: any;

  constructor(private iab: InAppBrowser,
    public router: Router,
    private loadingController: LoadingController, private http: HttpClient) {
  }

  ngOnInit() {
    const userId = new BehaviorSubject(JSON.parse(localStorage.getItem('user_id')!));
    this.users = userId.value
    this.user_id = this.users['result']['user_id'];
    this.getUserLists();
  }

  ionViewWillEnter() {

  }

  gotoMyprofile() {
    this.router.navigateByUrl('/myprofile');
  }

  enquiry() {
    this.router.navigateByUrl('/enquiry');
  }

  openWebpage() {
    this.present();
    const options: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      toolbarcolor: '#ff8567',
      hideurlbar: 'yes'
    }
    const browser = this.iab.create('https://mobile.sneakylink.net/', '_self', options);
  }

  async getUserLists() {
    this.http.post('https://sneakylink.moogleinfotech.com/userslists.php', {}, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((response: any) => {
      console.log(response)
      if (response['status'] == 1) {
        this.userList = response['result'];
      } else {
        this.userList = [];
      }
    }, err => {

    });
  }

  public loader: any
  async present() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 500
    });
    await this.loader.present();
  }

}
