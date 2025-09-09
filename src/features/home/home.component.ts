import { Component, Input, signal } from '@angular/core';
import { RegisterComponent } from "../account/register/register.component";
import { user } from '../../type/user';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // @Input is used to pass data from parent to child component
  // userFormData is an array of user type
  // required: true means that the parent component must pass the data to the child component
  @Input({required: true}) userFormData:user[] = []; 
  
  protected registerMode = signal(false);
  showRegister (value: boolean){
    this.registerMode.set(value);
  }
}
