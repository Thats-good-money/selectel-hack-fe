import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiGroupModule, TuiErrorModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { PointsPlotComponent } from './shared/components/points-plot/points-plot.component';
import { PointsTableComponent } from './shared/components/points-table/points-table.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiCheckboxBlockModule, TuiCheckboxModule, TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiTableModule} from "@taiga-ui/addon-table";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PointsPlotComponent,
    PointsTableComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiGroupModule,
    TuiCheckboxBlockModule,
    TuiInputModule,
    TuiCheckboxModule,
    TuiTableModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule
  ],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
