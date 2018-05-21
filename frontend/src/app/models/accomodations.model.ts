interface IAccomodations {
    id: number;
    id_employee: number;
    id_bill: number;
    id_room: number;
    arrivelDate: string;
    nrNights: number;
    nrAdults: number;
    nrChildrens: number;
  }
  
  export class Accomodations implements IAccomodations {
    id: number;
    id_employee: number;
    id_bill: number;
    id_room: number;
    arrivelDate: string;
    nrNights: number;
    nrAdults: number;
    nrChildrens: number;
  }
  