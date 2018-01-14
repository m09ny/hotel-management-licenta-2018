
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, UserComponent, EmployeesComponent, DepartmentsComponent, BillsComponent, AccomodationsComponent, RoomsComponent, ClientsComponent } from './components';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'user', component: UserComponent
  },
  {
    path: 'employees', component: EmployeesComponent
  },
  {
    path: 'departments', component: DepartmentsComponent
  },
  {
    path: 'bills', component: BillsComponent
  },
  {
    path: 'accomodations', component: AccomodationsComponent
  },
  {
    path: 'rooms', component: RoomsComponent
  },
  {
    path: 'clients', component: ClientsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
