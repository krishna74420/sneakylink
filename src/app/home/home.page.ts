import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private iab: InAppBrowser,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private loadingController: LoadingController,) {
    this.loginForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(1)]],
      user_email: ['', [Validators.required, Validators.minLength(1)]],
      user_description: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit() {

  }

  ionViewWillEnter() {

  }

  submitForm() {
    console.log(this.loginForm.value)
    if (this.loginForm.value['user_name'] == '' || this.loginForm.value['user_name'] == undefined || this.loginForm.value['user_name'] == null) {
      this.showToast('Please enter your name!');
      return;
    }
    if (this.loginForm.value['user_email'] == '' || this.loginForm.value['user_email'] == undefined || this.loginForm.value['user_email'] == null) {
      this.showToast('Please enter email!');
      return;
    }
    if (this.loginForm.value['user_description'] == '' || this.loginForm.value['user_description'] == undefined || this.loginForm.value['user_description'] == null) {
      this.showToast('Please enter description!');
      return;
    }
    this.presentAlert();
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

  public loader: any
  async present() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
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

  async presentAlert() {
    const alert = this.alertCtrl.create({
      message: 'Your request submited successfully!',
      buttons: ['Ok']
    });
    (await alert).present();
  }

}
