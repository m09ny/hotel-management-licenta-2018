import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';


@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.less']
})
export class AccomodationsComponent implements OnInit {

  title = 'Accomodations';
  
    accomodations: Accomodations[];
    selectedAccomodation: Accomodations;
    isNew: boolean;

    displayDialog: boolean;

    constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNew = false;
    this.apiService.get('accomodations/').subscribe(res => {
      this.accomodations = res;
    });
  }
  viewAccomodation(select: Accomodations) {
    console.log(JSON.stringify(select));
  }

  showDialogToAdd() {
    this.selectedAccomodation = new Accomodations();
    this.isNew = true;
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.isNew = false;
    this.selectedAccomodation = this.cloneAccomodation(event.data);
    this.displayDialog = true;
  }

  addOrUpdate(res) {
    let accomodations = [...this.accomodations];
    if (this.isNew) {
      accomodations.push(res);
    } else {
      accomodations[this.findAccomodationIndex()] = this.selectedAccomodation;
    }
    this.accomodations = accomodations;
    this.selectedAccomodation = null;
    this.displayDialog = false;
  }

  updateAccomodation(select: Accomodations) {
    if (this.isNew)
      this.apiService.post('accomodations/', this.selectedAccomodation).subscribe(res => this.addOrUpdate(res));
    else
      this.apiService.put('accomodations/', this.selectedAccomodation).subscribe(res => this.addOrUpdate(res));
  }
  deleteAccomodation(select: Accomodations) {
    this.apiService.delete('accomodations/' + this.selectedAccomodation.id).subscribe(res => {
      let index = this.findAccomodationIndex();
      this.accomodations = this.accomodations.filter((val, i) => i !== index);
      this.selectedAccomodation = null;
      this.displayDialog = false;
      console.log(res);
    });
  }

  findAccomodationIndex(): number {
    return this.accomodations.findIndex((element) => element.id === this.selectedAccomodation.id);
  }

  cloneAccomodation(a: Accomodations): Accomodations {
    let accomodation = new Accomodations();
    for(let prop in a) {
      accomodation[prop] = a[prop];
    }
    return accomodation;
  }

}
interface IAccomodations {
  id: number;
  id_employee: number;
  id_bill: number;
  id_room: number;
  arrivelDate: string;
  nrNights: number;
  nrAdults: number;
  nrChildrens: number;
}

class Accomodations implements IAccomodations {
  id: number;
  id_employee: number;
  id_bill: number;
  id_room: number;
  arrivelDate: string;
  nrNights: number;
  nrAdults: number;
  nrChildrens: number;
}
