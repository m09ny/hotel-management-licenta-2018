import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.less']
})
export class ClientsComponent implements OnInit {

  title = 'Clients';
  
    clients: Clients[];
    selectedClient: Clients;
    items: MenuItem[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('clients/').subscribe(res => {
      this.clients = res;
    });
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewClient(this.selectedClient) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteClient(this.selectedClient) }
    ];
  }
  viewClient(select: Clients) {
    console.log(JSON.stringify(select));

  }
  deleteClient(select: Clients) {
    this.apiService.delete('clients/' + select.id).subscribe(res => {
      console.log(res);
    });
  }

}
interface Clients {
  id: number,
  firstName: string,
  lastName: string,
  cnp: string,
  address: string,
  phone: string,
  email: string
}