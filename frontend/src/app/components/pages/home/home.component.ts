import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';
import { ButtonModule } from 'primeng/components/button/button';

import { Accomodations, Rooms, Clients, Bills, Reservations } from '../../../models/';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  rangeDates: Date[];
  bills: Bills[];
  filteredBills: Bills[];
  visibleBills:boolean = false;

  accomodations: Accomodations[];
  filteredAccomodations: Accomodations[];
  visibleAccomodations: boolean = false;

  clients: Clients[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);

    Observable.forkJoin([
      this.apiService.get('bills/'),
      this.apiService.get('accomodations/'),
      this.apiService.get('clients/')
    ]).subscribe((v: [Bills[], Accomodations[], Clients[]]) => {
      this.bills = v[0];
      this.accomodations = v[1];
      this.clients = v[2];
    });
  }

  isDisabled() {
    return (this.rangeDates || []).length <= 1;
  }

  showBills() {
    this.filteredBills = this.bills.filter(v => new Date(v.date) >= this.rangeDates[0] 
      && new Date(v.date) <= this.rangeDates[1]);
    this.visibleBills = true;
    this.visibleAccomodations = false;
  }

  showAccomodations() {
    this.filteredAccomodations = this.accomodations.filter(v => {
        let arrivalDate:Date = new Date(v.arrivelDate),
          departureDate:Date = new Date(v.arrivelDate);
          departureDate.setDate(departureDate.getDate() + v.nrNights);
        return arrivalDate >= this.rangeDates[0] && departureDate <= this.rangeDates[1]
      });
    this.visibleBills = false;
    this.visibleAccomodations = true;
  }
}