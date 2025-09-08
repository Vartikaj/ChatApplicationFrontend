import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { user } from '../../type/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private http = inject(HttpClient);
  currentUser = signal<user | null>(null);

  baseUrl = "https://localhost:7129/api";

  login(data : any){
    return this.http.post<user>(this.baseUrl + '/account/login', data).pipe(
      tap((user) => {
        this.currentUser.set(user); // this will update the signal value
        localStorage.setItem('user', JSON.stringify(user)); // store user in local storage
      })
    );
  }

  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user'); // remove user from local storage
  }

  constructor() { }
}
