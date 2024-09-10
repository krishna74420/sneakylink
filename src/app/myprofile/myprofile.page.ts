import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  users: any;
  user_id: any;
  name: any;
  email: any;

  constructor(private http: HttpClient, public router: Router,
    public alertController: AlertController,
     public navCtrl: NavController) { }

  ngOnInit() {
    const userId = new BehaviorSubject(JSON.parse(localStorage.getItem('user_id')!));
    this.users = userId.value
    this.user_id = this.users['result']['user_id'];
    this.getProfile();
  }

  getProfile(){
    this.http.post('https://sneakylink.moogleinfotech.com/myprofile.php', {
      user_id: this.user_id }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((response: any) => {
      console.log(response)
      if(response['status'] == 1){
        this.name = response['result']['name'];
        this.email = response['result']['email'];
      }
    }, err => {

    });
  }

  async deleteAccount() {
    const alert = this.alertController.create({
      header: 'Delete Account!',
      message: 'Are you sure, you want to delete account?',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.showAlert();
          }
        }
      ]
    }).then(a => {
      a.present();
    });
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Your request is summited!',
      buttons: ['OK']
    });
    await alert.present();
  }


  logout() {
      const alert = this.alertController.create({
        header: 'Confirm Logout!',
        message: 'Are you sure, you want to Logout?',
        backdropDismiss: false,
        mode: 'ios',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: () => {
              const token = localStorage.removeItem('user_id');
              {
                this.navCtrl.navigateRoot('login');
              };
            }
          }
        ]
      }).then(a => {
        a.present();
      });
    }

}
