import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../../service/';
import { Accomodations, Rooms, Clients, Bills, Reservations } from '../../../models/';

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
  today: string = new Date().toISOString();

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
        let accomodations = v[0],
          rooms = v[1],
          clients = v[2],
          bills = v[3];
        rooms.forEach(r => {
          let filteredAccomodations = accomodations.filter(e => e.id_room === r.id);
          let filteredBills = bills.filter(e => filteredAccomodations.findIndex(v => v.id_bill === e.id) >= 0);
          let filteredClients = clients.filter(e => filteredBills.findIndex(v => v.id_client === e.id) >= 0);

          for (let i = 0, n = accomodations.length; i < n; i += 1) {
            let accomodation = accomodations[i],
              bill = filteredBills.find(e => e.id === accomodation.id_bill),
              client = filteredClients.find(e => e.id === bill.id_client),
              arrivalDate = new Date(accomodation.arrivelDate),
              departureDate = new Date(arrivalDate);
              departureDate.setDate(departureDate.getDate() + 1);

              this.reservationsInfo[r.id] = [{
                accomodationId: accomodation.id,
                clientId: client.id,
                clientName: client.firstName + " " + client.lastName,
                startDate: arrivalDate,
                endDate: departureDate
              }];
          }
        });

        this.reservations = [{
          "title": "test 1",
          "start": "2018-05-15"
        }, {
          "title": "test 2",
          "start": "2018-05-17",
          "end": "2018-05-21"
        }];
      });
    }
  }
