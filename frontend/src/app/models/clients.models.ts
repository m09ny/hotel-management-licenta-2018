interface IClients {
  id: number;
  firstName: string;
  lastName: string;
  cnp: string;
  address: string;
  phone: string;
  email: string;
}
  
export class Clients implements Clients {
  id: number;
  firstName: string;
  lastName: string;
  cnp: string;
  address: string;
  phone: string;
  email: string;
}