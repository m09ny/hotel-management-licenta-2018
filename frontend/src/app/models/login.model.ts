interface ILogin {
    userName: string;
    id: number;
    password: string;
    remember?: boolean;
}
    
export class Login implements ILogin {
    id: number;
    userName: string;
    password: string;
    remember?: boolean = true;
}