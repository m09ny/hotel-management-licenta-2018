interface ILogin {
    userName: string;
    password: string;
    remember: boolean;
}
    
export class Login implements ILogin {
    userName: string;
    password: string;
    remember: boolean = true;
}