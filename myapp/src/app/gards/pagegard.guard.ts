import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const pagegardGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  if(localStorage.getItem("userDataTaken")!=null)
  {
    return true;
  }
  else
  {
router.navigate(['/add_data']);
    return false;
  }
};
