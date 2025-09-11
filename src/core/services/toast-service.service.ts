import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor() { }

  private createToastContainer(){
    if(!document.getElementById('toast-container')){
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  private createToastElement(message : string, alertClass : string, duration : 5000){
    this.createToastContainer();
    const toastContainer = document.getElementById('toast-container');
    if(!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">X</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.appendChild(toast);

    setTimeout(() => {
      if(toastContainer.contains(toast)){
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message : string, duration? : number){
    this.createToastElement(message, 'alert-success', 5000);
  }

  error(message: string, duration? : number){
    this.createToastElement(message, 'alert-error', 5000);
  }

  warning(message: string, duration? : number){
    this.createToastElement(message, 'alert-warning', 5000);
  } 

  info(message: string, duration? : number){
    this.createToastElement(message, 'alert-info', 5000);
  } 
}
