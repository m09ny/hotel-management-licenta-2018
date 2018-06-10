import { Injectable } from "@angular/core";
import { Login } from "../models/login.model";
import { ApiService } from "./api.service";

@Injectable()
export class LoginService {
    constructor(private apiService: ApiService) {}

    /**
     * login
     */
    public login(userInfo: Login):Promise<boolean> {
        let key: string = btoa(userInfo.userName),
            storage: Storage = userInfo.remember 
                ? localStorage 
                : sessionStorage,
            currentUser: Login;

        let promise:Promise<boolean> = new Promise<boolean>((resolve, reject) => {
            localStorage.setItem('currentUser', key);
            let allUsers = (localStorage.getItem('users') || "").split("|");
            if (allUsers.indexOf(key) < 0) {
                let usersValue = allUsers.join("|");
                localStorage.setItem('users', usersValue + (usersValue.length > 0 ? "|" : "") + key);
            }

            if (currentUser) {
                resolve(userInfo.userName === currentUser.userName 
                    && userInfo.password === currentUser.password);
            } else {
                this.apiService.post('admins/login', userInfo)
                    .subscribe((user) => {
                        if (user && user.userName === userInfo.userName && user.password === userInfo.password) {
                            storage.setItem(key, btoa(JSON.stringify(userInfo)));
                            resolve(true);
                        }
                    }, (error) => alert(error.message));
            }
        });

        return promise;
    }
    
    logout():void {
        let key: string = localStorage.getItem('currentUser'),
            allUsers = (localStorage.getItem('users') || "").split("|");
        for (let i = 0, n = allUsers.length; i < n; i++) {
            localStorage.removeItem(allUsers[i]);
            sessionStorage.removeItem(allUsers[i]);
        }
        localStorage.removeItem('currentUser');
        localStorage.removeItem('users');
    }

    static isUserLoggedIn(): boolean {
        let key:string = localStorage.getItem('currentUser'),
            userInfoEncrypted:string = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (userInfoEncrypted) {
            let userInfo = JSON.parse(atob(userInfoEncrypted));
            // logged in so return true
            return userInfo !== null;
        }
        return false;
    }

    static currentUser(): Login {
        let key: string = localStorage.getItem("currentUser"),
            encoded: string = localStorage.getItem(key) || sessionStorage.getItem(key);
        return ((encoded || "").length > 0) 
             ? JSON.parse(atob(encoded))
             : null;
    }
}