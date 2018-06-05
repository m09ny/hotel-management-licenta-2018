import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let key:string = localStorage.getItem('currentUser'),
            userInfoEncrypted:string = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (userInfoEncrypted) {
            let userInfo = JSON.parse(atob(userInfoEncrypted));
            // logged in so return true
            return userInfo !== null;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}