import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.less']
})
export class DepartmentsComponent implements OnInit {

  title = 'Departments';

  departments: Departments[];
  selectedDepartment: Departments;
  items: MenuItem[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('departments/').subscribe(res => {
      this.departments = res;
    });
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewDepartment(this.selectedDepartment) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteDepartment(this.selectedDepartment) }
    ];
  }
  viewDepartment(select: Departments) {
    console.log(JSON.stringify(select));

  }
  deleteDepartment(select: Departments) {
    this.apiService.delete('departments/' + select.id).subscribe(res => {
      console.log(res);
    });
  }

  onCellEditorKeydown($event, col, rowData, rowIndex){
    console.log(rowData);
    
  }

}
interface Departments {
  id: number,
  name: string
}