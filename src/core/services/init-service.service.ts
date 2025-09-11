import { inject, Injectable } from '@angular/core';
import { AccountServiceService } from './account-service.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitServiceService {
  private accountService = inject(AccountServiceService);

  init(){
    const userString = localStorage.getItem('user');
    if(!userString) return of(null);
    const user = JSON.parse(userString);// parse the JSON string to an object
    this.accountService.currentUser.set(user); // set the signal value to the user object

    return of(null);
  }
  

  constructor() { }
}
