import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  enquiryForm: FormGroup;
  isSubmitted = false;
  selectSegments: any = '1';
  enquiryList: any = [];
  users: any;
  user_id: any;

  constructor(private iab: InAppBrowser,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    private loadingController: LoadingController, private http: HttpClient) {
    this.enquiryForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(1)]],
      user_email: ['', [Validators.required, Validators.minLength(1)]],
      user_description: ['', [Validators.required, Validators.minLength(1)]]
    })
  }


  ngOnInit() {
    const userId = new BehaviorSubject(JSON.parse(localStorage.getItem('user_id')!));
    this.users = userId.value
    this.user_id = this.users['result']['user_id'];
    this.getEnquiryLists();
  }

  ionViewWillEnter() {

  }

  segmentChanged() {
    if (this.selectSegments == '2') {
      this.getEnquiryLists();
    }
  }

  gotoMyprofile() {
    this.router.navigateByUrl('/myprofile');
  }


  submitForm() {
    console.log(this.enquiryForm.value)
    if (this.enquiryForm.value['user_name'] == '' || this.enquiryForm.value['user_name'] == undefined || this.enquiryForm.value['user_name'] == null) {
      this.showToast('Please enter your name!');
      return;
    }
    if (this.enquiryForm.value['user_email'] == '' || this.enquiryForm.value['user_email'] == undefined || this.enquiryForm.value['user_email'] == null) {
      this.showToast('Please enter email!');
      return;
    }
    if (this.enquiryForm.value['user_description'] == '' || this.enquiryForm.value['user_description'] == undefined || this.enquiryForm.value['user_description'] == null) {
      this.showToast('Please enter description!');
      return;
    }
    this.present();
    this.http.post('https://sneakylink.moogleinfotech.com/create_enquiry.php', {
      user_id: this.user_id,
      user_name: this.enquiryForm.value['user_name'],
      user_email: this.enquiryForm.value['user_email'],
      user_description: this.enquiryForm.value['user_description']
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((response: any) => {
      console.log(response)
      if (response['status'] == 1) {
        this.enquiryForm.reset();
        this.presentAlert(response['message']);
      }else{
        this.presentAlert(response['message']);
      }
    }, err => {

    });
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

  async getEnquiryLists() {
    this.http.post('https://sneakylink.moogleinfotech.com/enquiry_list.php', {
      user_id: this.user_id
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((response: any) => {
      console.log(response)
      if (response['status'] == 1) {
        this.enquiryList = response['result'];
      } else {
        this.enquiryList = [];
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

  async showToast(message: any) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'bottom',
      mode: 'ios',
    });
    toast.present();
  }

  async presentAlert(message :any) {
    const alert = this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    });
    (await alert).present();
  }

}
