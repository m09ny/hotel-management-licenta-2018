import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import { Login } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit, DoCheck {
  currentUser: Login;

  constructor(
      private loginService: LoginService,
      private router: Router
    ) { }  

  ngOnInit(): void {
    this.currentUser = LoginService.currentUser() || { id: 0, "userName": "", "password":"" };
  }

  ngDoCheck(): void {
    this.currentUser = LoginService.currentUser() || { id: 0, "userName": "", "password":"" };
  }

  hideMenu(): boolean {
    return location.pathname.indexOf("login") < 0;
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
