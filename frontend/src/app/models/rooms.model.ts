interface IRooms {
    id: number;
    roomType: string;
    nrAdults: number;
    nrChildrens: number;
    priceNight: number;
  }
  
export class Rooms implements IRooms {
    id: number;
    roomType: string;
    nrAdults: number;
    nrChildrens: number;
    priceNight: number;
  }
  