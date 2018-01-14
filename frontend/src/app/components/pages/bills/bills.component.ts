import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.less']
})
export class BillsComponent implements OnInit {

  title = 'Bills';

  bills: Bills[];
  selectedBill: Bills;
  items: MenuItem[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('bills/').subscribe(res => {
      this.bills = res;
    });
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewBill(this.selectedBill) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteBill(this.selectedBill) }
    ];
  }
  viewBill(select: Bills) {
    console.log(JSON.stringify(select));

  }
  deleteBill(select: Bills) {
    this.apiService.delete('bills/' + select.id).subscribe(res => {
      console.log(res);
    });
  }

}
interface Bills {
  id: number,
  id_employee: number,
  id_client: number,
  date: Date,
  amout: number
}