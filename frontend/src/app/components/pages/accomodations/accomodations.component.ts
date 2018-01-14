import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.less']
})
export class AccomodationsComponent implements OnInit {

  title = 'Accomodations';
  
    accomodations: Accomodations[];
    selectedAccomodation: Accomodations;
    items: MenuItem[];
    constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('accomodations/').subscribe(res => {
      this.accomodations = res;
    });
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewAccomodation(this.selectedAccomodation) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteAccomodation(this.selectedAccomodation) }
    ];
  }
  viewAccomodation(select: Accomodations) {
    console.log(JSON.stringify(select));

  }
  deleteAccomodation(select: Accomodations) {
    this.apiService.delete('accomodations/' + select.id).subscribe(res => {
      console.log(res);
    });
  }

}
interface Accomodations {
  id: number,
  id_employee: number,
  id_bill: number,
  id_room: number,
  arrivelDate: string,
  nrNights: number,
  nrAdults: number,
  nrChildrens: number
}
