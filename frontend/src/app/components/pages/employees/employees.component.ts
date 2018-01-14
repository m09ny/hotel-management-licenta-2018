import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.less']
})
export class EmployeesComponent implements OnInit {

  title = 'Employees';

  employees: Employees[];
  selectedEmployee: Employees;
  items: MenuItem[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('employees/').subscribe(res => {
      this.employees = res;
    });
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewEmployee(this.selectedEmployee) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteEmployee(this.selectedEmployee) }
    ];
  }
  viewEmployee(select: Employees) {
    console.log(JSON.stringify(select));

  }
  deleteEmployee(select: Employees) {
    this.apiService.delete('employees/' + select.id).subscribe(res => {
      console.log(res);
    });
  }

}
interface Employees {
  id: number,
  id_department: number,
  firstName: string,
  lastName: string,
  cnp: string,
  address: string,
  phone: string,
  employment_date: string,
  role: string,
  salary: number
}