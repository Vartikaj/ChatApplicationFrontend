import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountServiceService } from '../core/services/account-service.service';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent]
})
export class AppComponent implements OnInit{
  public http = inject(HttpClient);
  protected title = 'ChatApplication';
  protected members = signal<any>([]);
  protected accountService = inject(AccountServiceService);

  ngOnInit(): void {
      this.http.get("https://localhost:7129/api/member").subscribe({
        next: response => this.members.set(response),
        error: error => console.log(error),
        complete: () => console.log('complete the http request') 
      })

      this.setCurrentUser(); // set the current user on app initialization
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user'); // get user from local storage
    if(userString){
      const user = JSON.parse(userString); // parse the JSON string to an object
      this.accountService.currentUser.set(user); // set the signal value to the user object
    } 
  }
}
