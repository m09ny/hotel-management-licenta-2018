import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent, HomeComponent, UserComponent, EmployeesComponent, DepartmentsComponent, BillsComponent, AccomodationsComponent, RoomsComponent, ClientsComponent, ReservationsComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'user', component: UserComponent, canActivate: [ AuthGuard ] },
  { path: 'employees', component: EmployeesComponent, canActivate: [ AuthGuard ] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [ AuthGuard ] },
  { path: 'bills', component: BillsComponent, canActivate: [ AuthGuard ] },
  { path: 'accomodations', component: AccomodationsComponent, canActivate: [ AuthGuard ] },
  { path: 'reservations', component: ReservationsComponent, canActivate: [ AuthGuard ] },
  { path: 'rooms', component: RoomsComponent, canActivate: [ AuthGuard ] },
  { path: 'clients', component: ClientsComponent, canActivate: [ AuthGuard ] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
