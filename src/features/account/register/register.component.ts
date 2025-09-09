import { Component, inject, input, output } from '@angular/core';
import { registerCreds, user } from '../../../type/user';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../../core/services/account-service.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // registerCreds : is a data type. which stores in the type.ts file
  // membersFromHome = input.required<user[]>(); // it is an array of user type
  // input is used to pass data from parent to child component
  // required: true means that the parent component must pass the data to the child component
  //membersFromHome is the name of the variable which is used to store the data passed from the parent component
  // userFormData is the name of the variable which is used to store the data passed from the parent component

  // output property
  cancelRegistration = output<boolean>(); // Here we specify that "cancelRegistration" is a 
  protected accountService = inject(AccountServiceService);
  protected cred = {} as registerCreds;
  register(){
    this.accountService.register(this.cred).subscribe({
      next : result => {
        this.cred = {} as registerCreds; // clear the form after successful registration
        this.cancel(); // close the register form after successful registration
      },
      error : error => console.log(error.message)
    });
  }
  cancel(){
    // Emit the value to the parent component
    // false is because we want to close the register form
    this.cancelRegistration.emit(false); // emit false value to the parent component
  }

}
