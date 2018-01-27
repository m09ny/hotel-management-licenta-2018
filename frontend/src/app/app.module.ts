// CORE
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI
import { SuiModule } from 'ng2-semantic-ui';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';

// Services
import { ApiService } from './service';
import { AppRoutingModule } from './app-routing.module';

// used to create fake backend
import { fakeBackendProvider } from './service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ContextMenuModule } from 'primeng/components/contextmenu/contextmenu';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components';
import { UserComponent } from './components/pages/user/user.component';
import { EmployeesComponent } from './components/pages/employees/employees.component';
import { DepartmentsComponent } from './components/pages/departments/departments.component';
import { BillsComponent } from './components/pages/bills/bills.component';
import { AccomodationsComponent } from './components/pages/accomodations/accomodations.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import { ClientsComponent } from './components/pages/clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    EmployeesComponent,
    DepartmentsComponent,
    BillsComponent,
    AccomodationsComponent,
    RoomsComponent,
    ClientsComponent
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
    ButtonModule,
    InputTextModule,
    ContextMenuModule,
    DialogModule
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
