import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  isToasting = false;

  constructor(private toast: ToastController) { }

  successToast(message: string) {
    this.isToasting = true;
    this.toast.create({
      message,
      position: 'top',
      duration: 2500,
      color: 'success'
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  errorToast(message: string) {
    this.isToasting = true;
    this.toast.create({
      message,
      position: 'top',
      duration: 2500,
      color: 'danger'
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
}
