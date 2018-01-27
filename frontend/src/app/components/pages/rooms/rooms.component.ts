import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.less']
})
export class RoomsComponent implements OnInit {

  title = 'Rooms';
  
    rooms: Rooms[];
    selectedRoom: Rooms;
    stacked: boolean;
    isNew: boolean;

    displayDialog: boolean;
    constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNew = false;
    this.apiService.get('rooms/').subscribe(res => {
      this.rooms = res;
    });
  }
  viewRoom(select: Rooms) {
    console.log(JSON.stringify(select));

  }
  showDialogToAdd() {
    this.selectedRoom = new Rooms();
    this.isNew = true;
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.isNew = false;
    this.selectedRoom = this.cloneRoom(event.data);
    this.displayDialog = true;
  }

  addOrUpdate(res) {
    let rooms = [...this.rooms];
    if (this.isNew) {
      rooms.push(res);
    } else {
      rooms[this.findRoomIndex()] = this.selectedRoom;
    }
    this.rooms = rooms;
    this.selectedRoom = null;
    this.displayDialog = false;
  }

  updateRoom(select: Rooms) {
    if (this.isNew)
      this.apiService.post('rooms/', this.selectedRoom).subscribe(res => this.addOrUpdate(res));
    else
      this.apiService.put('rooms/', this.selectedRoom).subscribe(res => this.addOrUpdate(res));
  }
  deleteRoom(select: Rooms) {
    this.apiService.delete('rooms/' + this.selectedRoom.id).subscribe(res => {
      let index = this.findRoomIndex();
      this.rooms = this.rooms.filter((val, i) => i !== index);
      this.selectedRoom = null;
      this.displayDialog = false;
      console.log(res);
    });
  }

  findRoomIndex(): number {
    return this.rooms.findIndex((element) => element.id === this.selectedRoom.id);
  }

  cloneRoom(r: Rooms): Rooms {
    let room= new Rooms();
    for(let prop in r) {
      room[prop] = r[prop];
    }
    return room;
  }
  
  toggle() {
    this.stacked = !this.stacked;
}
}
interface IRooms {
  id: number;
  roomType: string;
  nrAdults: number;
  nrChildrens: number;
  priceNight: number;
}

class Rooms implements IRooms {
  id: number;
  roomType: string;
  nrAdults: number;
  nrChildrens: number;
  priceNight: number;
}
