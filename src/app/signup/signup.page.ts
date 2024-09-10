import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private http: HttpClient,
    private loadingController: LoadingController,) {
    this.signupForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(1)]],
      user_email: ['', [Validators.required, Validators.minLength(1)]],
      user_password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit() {
  }


  submitForm() {
    console.log(this.signupForm.value)
    if (this.signupForm.value['user_name'] == '' || this.signupForm.value['user_name'] == undefined || this.signupForm.value['user_name'] == null) {
      this.showToast('Please enter your name!');
      return;
    }
    if (this.signupForm.value['user_email'] == '' || this.signupForm.value['user_email'] == undefined || this.signupForm.value['user_email'] == null) {
      this.showToast('Please enter email!');
      return;
    }
    if (this.signupForm.value['user_password'] == '' || this.signupForm.value['user_password'] == undefined || this.signupForm.value['user_password'] == null) {
      this.showToast('Please enter password!');
      return;
    }

    this.http.post('https://sneakylink.moogleinfotech.com/signup.php', {
      user_name: this.signupForm.value['user_name'],
      user_email: this.signupForm.value['user_email'],
      user_password: this.signupForm.value['user_password']
    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).subscribe((response: any) => {
      console.log(response)
      if (response['status'] == 1){
        this.signupForm.reset();
        this.presentAlert(response['message']);
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

  async presentAlert(message: any) {
    const alert = this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    });
    (await alert).present();
  }
}
