import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.less']
})
export class DepartmentsComponent implements OnInit {

  title = 'Departments';

  departments: Departments[];
  selectedDepartment: Departments;
  isNew: boolean;
  
  displayDialog: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNew = false;
    this.apiService.get('departments/').subscribe(res => {
      this.departments = res;
    });
  }
  viewDepartment(select: Departments) {
    console.log(JSON.stringify(select));

  }
 
  showDialogToAdd() {
    this.selectedDepartment = new Departments();
    this.isNew = true;
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.isNew = false;
    this.selectedDepartment = this.cloneDepartment(event.data);
    this.displayDialog = true;
  }

  addOrUpdate(res) {
    let departments = [...this.departments];
    if (this.isNew) {
      departments.push(res);
    } else {
      departments[this.findDepartmentIndex()] = this.selectedDepartment;
    }
    this.departments = departments;
    this.selectedDepartment = null;
    this.displayDialog = false;
  }

  updateDepartment(select: Departments) {
    if (this.isNew)
      this.apiService.post('departments/', this.selectedDepartment).subscribe(res => this.addOrUpdate(res));
    else
      this.apiService.put('departments/', this.selectedDepartment).subscribe(res => this.addOrUpdate(res));
  }
  deleteDepartment(select: Departments) {
    this.apiService.delete('departments/' + this.selectedDepartment.id).subscribe(res => {
      let index = this.findDepartmentIndex();
      this.departments = this.departments.filter((val, i) => i !== index);
      this.selectedDepartment = null;
      this.displayDialog = false;
      console.log(res);
    });
  }

  findDepartmentIndex(): number {
    return this.departments.findIndex((element) => element.id === this.selectedDepartment.id);
  }

  cloneDepartment(d: Departments): Departments {
    let department= new Departments();
    for(let prop in d) {
      department[prop] = d[prop];
    }
    return department;
  }

  onCellEditorKeydown($event, col, rowData, rowIndex){
    console.log(rowData);
    
  }

}
interface IDepartments {
  id: number;
  name: string;
}

class Departments implements IDepartments {
  id: number;
  name: string;
}