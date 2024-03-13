import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (state.url === '/') {
      const token = localStorage.getItem('ada_usr_tkn');
      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }
      this.router.navigate(['/home']);
    }
    return true;
  }
}
