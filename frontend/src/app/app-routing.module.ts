import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent, HomeComponent, UserComponent, EmployeesComponent, DepartmentsComponent, BillsComponent, AccomodationsComponent, RoomsComponent, ClientsComponent, ReservationsComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [ AuthGuard ]
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
    path: 'reservations', component: ReservationsComponent
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
