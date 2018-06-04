// CORE
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI
import { SuiModule } from 'ng2-semantic-ui';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DialogModule, CalendarModule, ScheduleModule, ButtonModule } from 'primeng/primeng';
import { InputTextModule, ContextMenuModule, DropdownModule } from 'primeng/primeng';

// Services
import { ApiService } from './service';
import { AppRoutingModule } from './app-routing.module';

// used to create fake backend
import { fakeBackendProvider } from './service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { UserComponent } from './components/pages/user/user.component';
import { EmployeesComponent } from './components/pages/employees/employees.component';
import { DepartmentsComponent } from './components/pages/departments/departments.component';
import { BillsComponent } from './components/pages/bills/bills.component';
import { AccomodationsComponent } from './components/pages/accomodations/accomodations.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { ReservationsComponent } from './components/pages/reservations/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    EmployeesComponent,
    DepartmentsComponent,
    BillsComponent,
    AccomodationsComponent,
    RoomsComponent,
    ClientsComponent,
    ReservationsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SuiModule,
    // Prime
    DataTableModule,
    SharedModule,
    FormsModule,
    CalendarModule,
    ScheduleModule,
    ButtonModule,
    InputTextModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule
  ],
  providers: [
    AppRoutingModule,
    ApiService,
    // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
