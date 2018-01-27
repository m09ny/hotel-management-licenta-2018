import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.less']
})
export class ClientsComponent implements OnInit {

  title = 'Clients';
  
    clients: Clients[];
    selectedClient: Clients;
    isNew: boolean;

    displayDialog: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNew = false;
    this.apiService.get('clients/').subscribe(res => {
      this.clients = res;
    });
  }
  viewClient(select: Clients) {
    console.log(JSON.stringify(select));
  }
  
  showDialogToAdd() {
    this.selectedClient = new Clients();
    this.isNew = true;
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.isNew = false;
    this.selectedClient = this.cloneClient(event.data);
    this.displayDialog = true;
  }

  addOrUpdate(res) {
    let clients = [...this.clients];
    if (this.isNew) {
      clients.push(res);
    } else {
      clients[this.findClientIndex()] = this.selectedClient;
    }
    this.clients = clients;
    this.selectedClient = null;
    this.displayDialog = false;
  }

  updateClient(select: Clients) {
    if (this.isNew)
      this.apiService.post('clients/', this.selectedClient).subscribe(res => this.addOrUpdate(res));
    else
      this.apiService.put('clients/', this.selectedClient).subscribe(res => this.addOrUpdate(res));
  }
  deleteClient(select: Clients) {
    this.apiService.delete('clients/' + this.selectedClient.id).subscribe(res => {
      let index = this.findClientIndex();
      this.clients = this.clients.filter((val, i) => i !== index);
      this.selectedClient = null;
      this.displayDialog = false;
      console.log(res);
    });
  }

  findClientIndex(): number {
    return this.clients.findIndex((element) => element.id === this.selectedClient.id);
  }

  cloneClient(c: Clients): Clients {
    let client= new Clients();
    for(let prop in c) {
      client[prop] = c[prop];
    }
    return client;
  }

}
interface IClients {
  id: number;
  firstName: string;
  lastName: string;
  cnp: string;
  address: string;
  phone: string;
  email: string;
}

class Clients implements Clients {
  id: number;
  firstName: string;
  lastName: string;
  cnp: string;
  address: string;
  phone: string;
  email: string;
}