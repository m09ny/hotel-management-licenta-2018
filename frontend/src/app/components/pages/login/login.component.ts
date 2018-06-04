import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { Login } from '../../../models/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    model:Login = new Login();

    constructor(private apiService: ApiService) { }

    ngOnInit() {

    }

    checkLogin() {
        console.log(this.model);
    }
}