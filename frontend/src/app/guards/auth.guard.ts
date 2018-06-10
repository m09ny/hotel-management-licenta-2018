import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let active:boolean = LoginService.isUserLoggedIn();

        // not logged in so redirect to login page with the return url
        if (!active) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
        return active;
    }
}