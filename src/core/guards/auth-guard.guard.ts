import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastServiceService } from '../services/toast-service.service';
import { AccountServiceService } from '../services/account-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const toastService = inject(ToastServiceService);
  const accountService = inject(AccountServiceService);

  if(accountService.currentUser()){
    return true;
  } else {
    toastService.error("You shall not pass!!!");
    return false;
  }
};
