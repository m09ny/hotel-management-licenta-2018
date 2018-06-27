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
              "accomodationId": this.reservationsInfo[ndx][i].accomodationId,
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
      ReservationsComponent.findItemFromId(this.clients, reservation.clientId));
    this.selectedReservation = Object.assign(this.selectedReservation, 
      ReservationsComponent.findItemFromId(this.accomodations, reservation.accomodationId));
    this.selectedReservation = Object.assign(this.selectedReservation,
      ReservationsComponent.findItemFromId(this.bills, reservation.billId));

    //console.log(reservation);
    //console.log(this.bills, this.selectedReservation);
  }

  deleteReservation(select: Reservations) {
   this.apiService.delete('accomodations/' + this.selectedReservation.accomodationId).subscribe(res => {
      let ndx = this.reservations.findIndex((v) => v.accomodationId === this.selectedReservation.accomodationId);
      this.reservations.splice(ndx, 1);
      this.selectedReservation = null;
      this.displayDialog = false;
    });
  }

  saveReservation() {
    let accomodationNdx:number = this.accomodations.findIndex((e) => e.id === this.selectedReservation.accomodationId),
      clientNdx:number = this.clients.findIndex((e) => e.id === this.selectedReservation.clientId),
      billNdx:number = this.bills.findIndex((e) => e.id === this.selectedReservation.billId),
      reservationNdx:number = this.reservations.findIndex((e) => +e.roomId === +this.selectedReservation.id_room);

    this.accomodations[accomodationNdx].nrAdults = this.selectedReservation.nrAdults;
    this.accomodations[accomodationNdx].nrChildrens = this.selectedReservation.nrChildrens;
    this.accomodations[accomodationNdx].arrivelDate = this.selectedReservation.startDate;
    this.accomodations[accomodationNdx].nrNights = this.selectedReservation.nrNights;
    this.accomodations[accomodationNdx].id_room = this.selectedReservation.id_room;
    this.accomodations[accomodationNdx].id_employee = this.selectedReservation.id_employee;

    this.bills[billNdx].amout = this.selectedReservation.amout;
    
    let clientNames:string[] = this.selectedReservation.clientName.split(" ");
    this.clients[clientNdx].firstName = clientNames[0];
    this.clients[clientNdx].lastName = clientNames[1];

    this.reservationsInfo[this.selectedReservation.id_room][reservationNdx].clientName = this.selectedReservation.clientName;
    this.reservationsInfo[this.selectedReservation.id_room][reservationNdx].startDate = this.selectedReservation.startDate;
    this.reservationsInfo[this.selectedReservation.id_room][reservationNdx].endDate = this.selectedReservation.endDate;

    this.reservations[reservationNdx].title = this.selectedReservation.clientName;
    this.reservations[reservationNdx].start = moment(this.selectedReservation.startDate).format("YYYY-MM-DD");
    this.reservations[reservationNdx].end = moment(this.selectedReservation.endDate).format("YYYY-MM-DD");

    let reservations = this.reservations.slice(0);
    this.reservations = [];
    setTimeout(() => { this.reservations = reservations.slice(0); }, 0);

    type updateResponseType = { message: string };
    Observable.forkJoin([
      this.apiService.put("bills/" + this.bills[billNdx].id, this.bills[billNdx]),
      this.apiService.put("accomodations/" + this.accomodations[accomodationNdx].id, this.accomodations[accomodationNdx]),
      this.apiService.put("clients/" + this.clients[clientNdx].id, this.accomodations[clientNdx])
    ])
    .subscribe((v: [updateResponseType, updateResponseType, updateResponseType] ) => {
      this.displayDialog = false;
      this.selectedReservation = null;
      setTimeout(() => alert(v[0].message + "\n" + v[1].message + "\n" + v[2].message), 0);
    }, (error) => {
      alert(JSON.stringify(error));
    });  
  }

  private calculateDepartureDate() {
    let departureDate:Date = new Date(this.selectedReservation.startDate);
    departureDate.setDate(departureDate.getDate() + (parseInt(this.selectedReservation.nrNights, 10) || 0));
    this.selectedReservation.endDate = departureDate;
    return departureDate;
  }

  private static findItemFromId<T extends { id: number }>(arr:T[], id:number): T {
    let billIndex:number = arr.findIndex(v => v.id === id);
    return arr[billIndex];
  }
}