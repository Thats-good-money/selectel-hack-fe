import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiErrorModule,
  TuiTextfieldControllerModule, TuiButtonModule, TuiLinkModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '@pages/login/login.component';
import { HomeComponent } from '@pages/home/home.component';
import { RegisterComponent } from '@pages/register/register.component';
import { PointsPlotComponent } from '@shared/components/points-plot/points-plot.component';
import { PointsTableComponent } from '@shared/components/points-table/points-table.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiCarouselModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule, TuiIslandModule, TuiPaginationModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {
  TuiAppearanceModule,
  TuiCardModule,
  TuiIconModule,
  tuiIconResolverProvider,
  TuiSurfaceModule
} from '@taiga-ui/experimental';
import { AddressNeedsComponent } from './pages/address-needs/address-needs.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PointsPlotComponent,
    PointsTableComponent,
    NavbarComponent,
    AddressNeedsComponent,
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
    TuiErrorModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiLinkModule,
    TuiAppearanceModule,
    TuiInputPasswordModule,
    TuiIconModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiCarouselModule,
    TuiPaginationModule,
    TuiIslandModule
  ],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    tuiIconResolverProvider(icon =>
      icon.includes('/') ? icon : `/assets/icons/${icon}.svg`,
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
