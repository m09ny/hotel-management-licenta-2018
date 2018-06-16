import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { ApiService } from '../../../service/';
import { Accomodations, Rooms, Clients, Bills, Reservations } from '../../../models/';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Dropdown } from 'primeng/primeng';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.less']
})
export class ReservationsComponent implements OnInit {

  title = 'Reservations';

  header: any;
  today: string = moment(new Date()).format("YYYY-MM-DD");

  reservationsInfo:{ [index:string]: Reservations[] } = {};
  reservations:any[] = [];
  selectedReservation: any;
  
  roomsInfo = [];
  selectedRoom = null;

  displayDialog: boolean = false;

  rooms: Rooms[];
  accomodations: Accomodations[];
  bills: Bills[];
  clients: Clients[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.header = {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    };

    Observable.forkJoin([
        this.apiService.get('accomodations/'),
        this.apiService.get('rooms/'),
        this.apiService.get('clients/'),
        this.apiService.get('bills/')
      ])
      .subscribe((v: [Accomodations[], Rooms[], Clients[], Bills[]]) => {
        let accomodations = v[0], rooms = v[1], clients = v[2], bills = v[3];
        this.rooms = rooms.sort((r1:Rooms, r2: Rooms) => r1.id < r2.id ? -1 : (r1.id > r2.id ? 1 : 0));
        this.accomodations = accomodations;
        this.clients = clients;
        this.bills = bills;
        this.roomsInfo = [{ label:'All', value:null }];
        for (let ndx in rooms) {
          this.constructInformation(rooms[ndx], accomodations, bills, clients);
        }
        this.filterRooms();
      });
    }

  changeRoom(event) {
    this.filterRooms(event.value);
  }

  constructInformation (rooms: Rooms, accomodations: Accomodations[], bills: Bills[], clients: Clients[]) {
    this.roomsInfo.push({ label: "Room " + rooms.id, value: rooms.id });
    this.reservationsInfo[rooms.id] = [];
    let filteredAccomodations = accomodations.filter(e => e.id_room === rooms.id),
      filteredBills = bills.filter(e => filteredAccomodations.findIndex(v => v.id_bill === e.id) >= 0),
      filteredClients = clients.filter(e => filteredBills.findIndex(v => v.id_client === e.id) >= 0);

    for (let i = 0, n = filteredAccomodations.length; i < n; i += 1) {
      let accomodation = filteredAccomodations[i],
        bill = filteredBills.find(e => e.id === accomodation.id_bill),
        client = filteredClients.find(e => e.id === bill.id_client),
        arrivalDate = new Date(accomodation.arrivelDate),
        departureDate = new Date(arrivalDate);
        departureDate.setDate(departureDate.getDate() + accomodation.nrNights);
        
      this.reservationsInfo[rooms.id].push({
        accomodationId: accomodation.id,
        clientId: client.id,
        billId: bill.id,
        clientName: client.firstName + " " + client.lastName,
        startDate: arrivalDate,
        endDate: departureDate
      });
    }
  }

  filterRooms(roomId: number = 0) {
    this.reservations = [];
    for (let ndx in this.reservationsInfo) {
      if (this.reservationsInfo.hasOwnProperty(ndx)) {
        for (let i = 0, n = this.reservationsInfo[ndx].length; i < n; i += 1) {
          if (roomId <= 0 || parseInt(ndx, 10) === roomId) {
            this.reservations.push({
              "roomId": ndx,
              "id": i,
              "title": this.reservationsInfo[ndx][i].clientName,
              "start": moment(this.reservationsInfo[ndx][i].startDate).format("YYYY-MM-DD"),
              "end": moment(this.reservationsInfo[ndx][i].endDate).format("YYYY-MM-DD")
            });
          }
        }
      }
    }
  }

  eventClick(event) {
    this.displayDialog = !this.displayDialog;

    let reservation: Reservations = this.reservationsInfo[event.calEvent.roomId][event.calEvent.id]
    this.selectedReservation = Object.assign({}, reservation);
    this.selectedReservation = Object.assign(this.selectedReservation, 
      ReservationsComponent.findIndexFromId(this.clients, reservation.clientId));
    this.selectedReservation = Object.assign(this.selectedReservation, 
      ReservationsComponent.findIndexFromId(this.accomodations, reservation.accomodationId));
    this.selectedReservation = Object.assign(this.selectedReservation,
      ReservationsComponent.findIndexFromId(this.bills, reservation.billId));

    //console.log(reservation);
    //console.log(this.bills, this.selectedReservation);
  }

  deleteReservation(select: Reservations) {
    this.apiService.delete('reservations/' + this.selectedReservation.id).subscribe(res => {
      let index = this.findReservationIndex();
      this.reservations = this.reservations.filter((val, i) => i !== index);
      this.selectedReservation = null;
      this.displayDialog = false;
      console.log(res);
    });
  }


  saveReservation(select: Reservations) {
    this.displayDialog = false;
    this.apiService.put('reservations/' + this.selectedReservation.id, this.selectedReservation)
      .subscribe(res => this.update(res));
  }


  update(res) {
    let reservations = [...this.reservations];
    console.log(reservations[this.findReservationIndex()]);
    reservations[this.findReservationIndex()] = this.selectedReservation;
    this.reservations = reservations; 

    console.log(this.reservations);
    this.selectedReservation = null;
    this.displayDialog = false;  
   
  }

  findReservationIndex(): number {
    console.log(this.selectedReservation.id);
    return this.reservations.findIndex((element) => element.id === this.selectedReservation.id);
  }

  calculateDepartureDate() {
    let departureDate:Date = new Date(this.selectedReservation.startDate);
    return departureDate.setDate(departureDate.getDate() + parseInt(this.selectedReservation.nrNights, 10));
  }

  private static findIndexFromId<T extends { id: number }>(arr:T[], id:number): T {
    let billIndex:number = arr.findIndex(v => v.id === id);
    return arr[billIndex];
  }
}
