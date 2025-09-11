import { Component, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { ToastServiceService } from '../../core/services/toast-service.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected cred : any = {};
  // protected loginSignal = signal(false);
  // protected means to call the varible in the same class and in the html file
  protected accountService = inject(AccountServiceService); 
  private toastService = inject(ToastServiceService);
  private router = inject(Router);
  
  login(){
    this.accountService.login(this.cred).subscribe({
      next : result => {
        // this.loginSignal.set(true);
        this.cred = {};
        this.router.navigateByUrl('/members'); // navigate to members page on successful login
        this.toastService.success("login successful");
      },
      error : error => {
        console.log("Error :", error);
        this.toastService.error(error.error)
      }
    });
  }

  logout(){
    console.log("false");
    this.accountService.logout(); // call the logout method from the service to clear the user
    this.router.navigateByUrl('/'); // navigate to home page on logout
    // this.loginSignal.set(false);
    // console.log(this.loginSignal());
  }
}
