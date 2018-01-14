import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';

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
    items: MenuItem[];
    constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('rooms/').subscribe(res => {
      this.rooms = res;
    });
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewRoom(this.selectedRoom) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteRoom(this.selectedRoom) }
    ];
  }
  viewRoom(select: Rooms) {
    console.log(JSON.stringify(select));

  }
  deleteRoom(select: Rooms) {
    this.apiService.delete('rooms/' + select.id).subscribe(res => {
      console.log(res);
    });
  }
  toggle() {
    this.stacked = !this.stacked;
}
}
interface Rooms {
  id: number,
  roomType: string,
  nrAdults: number,
  nrChildrens: number,
  priceNight: number
}
