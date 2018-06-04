import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';
import { ButtonModule } from 'primeng/components/button/button';

import { Accomodations, Rooms, Clients, Bills, Reservations } from '../../../models/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  rangeDates: Date[];
  bills: Bills[];

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

    this.apiService.get('bills/').subscribe(res => {
      this.bills = res;
    });
  }

  viewBill(select: Bills) {
    console.log(JSON.stringify(select));
  }
}

