import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public router: Router,
    private http: HttpClient,
    public alertCtrl: AlertController,
    private loadingController: LoadingController,) {
    this.loginForm = this.formBuilder.group({
      user_email: ['', [Validators.required, Validators.minLength(1)]],
      user_password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit() {
  }

  submitForm() {
    console.log(this.loginForm.value)
    if (this.loginForm.value['user_email'] == '' || this.loginForm.value['user_email'] == undefined || this.loginForm.value['user_email'] == null) {
      this.showToast('Please enter email!');
      return;
    }
    if (this.loginForm.value['user_password'] == '' || this.loginForm.value['user_password'] == undefined || this.loginForm.value['user_password'] == null) {
      this.showToast('Please enter password!');
      return;
    }

    this.http.post('https://sneakylink.moogleinfotech.com/login.php', {
      user_email: this.loginForm.value['user_email'],
      user_password: this.loginForm.value['user_password']
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((response: any) => {
      console.log(response)
      if (response['status'] == 1){
        localStorage.setItem('user_id', JSON.stringify(response));
        this.router.navigateByUrl('/home');
        this.showToast('Login successfully!');
      }else{
        this.showToast(response['message']);
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

}

