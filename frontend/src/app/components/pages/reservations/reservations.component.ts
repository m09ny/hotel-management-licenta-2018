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
  reservationsInfo:{ [index:string]: Reservations[] } = {};
  reservations = [];
  today: string = moment(new Date()).format("YYYY-MM-DD");
  rooms = [];
  selectedRoom = null;
  
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
        this.rooms = [{ label:'All', value:null }];
        for (let ndx in rooms) {
          this.constructInformation(rooms[ndx], accomodations, bills, clients);
        }
        this.filterRooms();
      });
    }

    changeRoom(event) {
      this.filterRooms(event.value);
    }

    constructInformation (r:Rooms, accomodations:Accomodations[], bills:Bills[], clients:Clients[]) {
      this.rooms.push({ label: "Room " + r.id, value: r.id });
      this.reservationsInfo[r.id] = [];
      let filteredAccomodations = accomodations.filter(e => e.id_room === r.id),
        filteredBills = bills.filter(e => filteredAccomodations.findIndex(v => v.id_bill === e.id) >= 0),
        filteredClients = clients.filter(e => filteredBills.findIndex(v => v.id_client === e.id) >= 0);

      for (let i = 0, n = filteredAccomodations.length; i < n; i += 1) {
        let accomodation = filteredAccomodations[i],
          bill = filteredBills.find(e => e.id === accomodation.id_bill),
          client = filteredClients.find(e => e.id === bill.id_client),
          arrivalDate = new Date(accomodation.arrivelDate),
          departureDate = new Date(arrivalDate);
          departureDate.setDate(departureDate.getDate() + accomodation.nrNights);

        this.reservationsInfo[r.id].push({
          accomodationId: accomodation.id,
          clientId: client.id,
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
                "title": this.reservationsInfo[ndx][i].clientName,
                "start": moment(this.reservationsInfo[ndx][i].startDate).format("YYYY-MM-DD"),
                "end": moment(this.reservationsInfo[ndx][i].endDate).format("YYYY-MM-DD")
              });
            }
          }
        }
      }
    }
  }
