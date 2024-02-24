import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { UserDonation } from "@core/models/donation.model";
import { DonationsService } from "@core/services/donations.service";

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.scss']
})
export class MyDonationsComponent implements OnInit {

  public userDonations$: Observable<UserDonation[]> = of([]);

  constructor(
    private _donationsService: DonationsService,
  ) { }

  public ngOnInit(): void {
    this.userDonations$ = this._donationsService.getUserDonationsList();
  }

}
