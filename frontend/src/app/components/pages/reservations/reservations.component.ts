import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../../service/';
import { Accomodations, Rooms } from '../../../models/';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.less']
})
export class ReservationsComponent implements OnInit {

  title = 'Reservations';

  reservations = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    Observable.forkJoin([
        this.apiService.get('accomodations/'),
        this.apiService.get('rooms/')  
      ])
      .subscribe((v: [Accomodations[], Rooms[]]) => {
        console.log(v);
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
