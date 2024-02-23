import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { AddressNeedsComponent } from "@pages/address-needs/address-needs.component";
import {PlanDonationComponent} from "@pages/plan-donation/plan-donation.component";
import {DonationsComponent} from "@pages/donations/donations.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomeComponent,
    // canActivate: [authGuard],
  },

  {
    path: 'donations',
    component: DonationsComponent
  },

  {
    path: 'address-needs',
    component: AddressNeedsComponent,
  },

  {
    path: 'plan-donation',
    component: PlanDonationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
