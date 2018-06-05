import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, LoginService } from '../../../service/';
import { Login } from '../../../models/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    model:Login = new Login();
    returnUrl: string;

    constructor (
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    checkLogin() {
        this.loginService.login(this.model)
            .then((verify: boolean) => {
                if (verify) {
                    this.router.navigate([this.returnUrl]);
                }
            })
            .catch((reason) => alert(reason));
    }
}