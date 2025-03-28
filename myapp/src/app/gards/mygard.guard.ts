import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

export const mygardGuard: CanActivateFn = (route, state) => {
const router=inject(Router);

  if(localStorage.getItem("userId")!=null)
  {
    return true;
  }
  else
  {
  router.navigate(['/login'])
  return false;

  }
  
};
