import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.less']
})
export class EmployeesComponent implements OnInit {
  title = 'Employees';

  employees: Employees[];
  selectedEmployee: Employees;
  isNew: boolean;

  displayDialog: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNew = false;
    this.apiService.get('employees/').subscribe(res => {
      this.employees = res;
    });
  }

  viewEmployee(select: Employees) {
    console.log(JSON.stringify(select));
  }

  showDialogToAdd() {
    this.selectedEmployee = new Employees();
    this.isNew = true;
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.isNew = false;
    this.selectedEmployee = this.cloneEmployee(event.data);
    this.displayDialog = true;
  }

  addOrUpdate(res) {
    let employees = [...this.employees];
    if (this.isNew) {
      employees.push(res);
    } else {
      employees[this.findEmployeeIndex()] = this.selectedEmployee;
    }
    this.employees = employees;
    this.selectedEmployee = null;
    this.displayDialog = false;
  }

  updateEmployee(select: Employees) {
    if (this.isNew)
      this.apiService.post('employees/', this.selectedEmployee).subscribe(res => this.addOrUpdate(res));
    else
      this.apiService.put('employees/', this.selectedEmployee).subscribe(res => this.addOrUpdate(res));
  }

  deleteEmployee(select: Employees) {
    this.apiService.delete('employees/' + this.selectedEmployee.id).subscribe(res => {
      let index = this.findEmployeeIndex();
      this.employees = this.employees.filter((val, i) => i !== index);
      this.selectedEmployee = null;
      this.displayDialog = false;
      console.log(res);
    });
  }

  findEmployeeIndex(): number {
    return this.employees.findIndex((element) => element.id === this.selectedEmployee.id);
  }

  cloneEmployee(e: Employees): Employees {
    let employee = new Employees();
    for(let prop in e) {
      employee[prop] = e[prop];
    }
    return employee;
  }
}

interface IEmployees {
  id: number;
  id_department: number;
  firstName: string;
  lastName: string;
  cnp: string;
  address: string;
  phone: string;
  employment_date: string;
  role: string;
  salary: number;
}

class Employees implements IEmployees {
  id: number;
  id_department: number;
  firstName: string;
  lastName: string;
  cnp: string;
  address: string;
  phone: string;
  employment_date: string;
  role: string;
  salary: number;
}