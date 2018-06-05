import { Injectable } from "@angular/core";
import { Login } from "../models/login.model";

@Injectable()
export class LoginService {
    /**
     * login
     */
    public login(userInfo: Login):Promise<boolean> {
        let key: string = btoa(userInfo.userName),
            storage: Storage = userInfo.remember 
                ? localStorage 
                : sessionStorage,
            encoded: string = localStorage.getItem(key) || sessionStorage.getItem(key);

        let promise:Promise<boolean> = new Promise<boolean>((resolve, reject) => {
            localStorage.setItem('currentUser', key);
            if ((encoded || "").length > 0) {
                let decoded: Login = JSON.parse(atob(encoded));
                resolve(userInfo.userName === decoded.userName 
                    && userInfo.password === decoded.password);
            } else {
                storage.setItem(key, btoa(JSON.stringify(userInfo)));
                resolve(true);
            }
        });

        return promise;
    }
    
    logout():void {
        let key: string = localStorage.getItem('currentUser');
        localStorage.removeItem('currentUser');
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    }
}