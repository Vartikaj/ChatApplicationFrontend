import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { loginCreds, registerCreds, user } from '../../type/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private http = inject(HttpClient);
  currentUser = signal<user | null>(null); // it is a trype of User or null

  baseUrl = "https://localhost:7129/api";

  // Register user
  register(creds : registerCreds){
    return this.http.post<user>(this.baseUrl + '/account/register', creds).pipe(
      tap((user) => {
        //this.setCurrentUser(user);
      })
    );
  }

  login(cred : loginCreds){
    return this.http.post<user>(this.baseUrl + '/account/login', cred).pipe(
      tap((user) => {
        this.setCurrentUser(user);
      })
    );
  }

  setCurrentUser(user: user){
    this.currentUser.set(user); // this will update the signal value
    localStorage.setItem('user', JSON.stringify(user)); // store user in local storage
  }

  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user'); // remove user from local storage
  }
  constructor() { }
}
