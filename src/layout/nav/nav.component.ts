import { Component, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected cred : any = {};
  // protected loginSignal = signal(false);
  // protected means to call the varible in the same class and in the html file
  protected accountService = inject(AccountServiceService); 
  
  login(){
    this.accountService.login(this.cred).subscribe({
      next : result => {
        // this.loginSignal.set(true);
        this.cred = {};
      },
      error : error => console.log(error.message)
    });
  }

  logout(){
    console.log("false");
    this.accountService.logout(); // call the logout method from the service to clear the user
    // this.loginSignal.set(false);
    // console.log(this.loginSignal());
  }


}
