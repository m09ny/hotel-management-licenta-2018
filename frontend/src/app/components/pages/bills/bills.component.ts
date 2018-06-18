import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ApiService } from '../../../service/';
import { Bills } from '../../../models/bills.model';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.less']
})
export class BillsComponent implements OnInit {

  title = 'Bills';

  bills: Bills[];
  selectedBill: Bills;
  isNew: boolean;
  
  displayDialog: boolean;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNew = false;
    this.apiService.get('bills/').subscribe(res => {
      this.bills = res;
    });
  }

  viewBill(select: Bills) {
    console.log(JSON.stringify(select));

  }

  showDialogToAdd() {
    this.selectedBill = new Bills();
    this.isNew = true;
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.isNew = false;
    this.selectedBill = this.cloneBill(event.data);
    this.displayDialog = true;
  }

  addOrUpdate(res) {
    let bills = [...this.bills];
    if (this.isNew) {
      bills.push(res);
    } else {
      bills[this.findBillIndex()] = this.selectedBill;
    }
    this.bills = bills;
    this.selectedBill = null;
    this.displayDialog = false;
  }

  updateBill(select: Bills) {
    if (this.isNew)
      this.apiService.post('bills/', this.selectedBill)
        .subscribe(res => this.addOrUpdate(res));
    else
      this.apiService.put('bills/' + this.selectedBill.id, this.selectedBill)
        .subscribe(res => this.addOrUpdate(res));
  }

  deleteBill(select: Bills) {
    this.apiService.delete('bills/' + this.selectedBill.id).subscribe(res => {
      let index = this.findBillIndex();
      this.bills = this.bills.filter((val, i) => i !== index);
      this.selectedBill = null;
      this.displayDialog = false;
      console.log(res);
    });
  }

  findBillIndex(): number {
    return this.bills.findIndex((element) => element.id === this.selectedBill.id);
  }

  cloneBill(b: Bills): Bills {
    let bill = new Bills();
    for(let prop in b) {
      let propVal = new Date(b[prop]);
      if (propVal instanceof Date && !isNaN(propVal.getTime()) && isNaN(b[prop])) {
        bill[prop] = moment(propVal).format("YYYY-MM-DD");
      } else {
        bill[prop] = b[prop];
      }
    }
    return bill;
  }
}
