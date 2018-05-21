interface IBills {
    id: number;
    id_employee: number;
    id_client: number;
    date: Date;
    amout: number;
  }
  
  export class Bills implements IBills {
    id: number;
    id_employee: number;
    id_client: number;
    date: Date;
    amout: number;
  }