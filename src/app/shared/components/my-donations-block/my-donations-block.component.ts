import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {UserDonation} from "@core/models/donation.model";
import {DonationsService} from "@core/services/donations.service";
import {BonusResponse} from "@core/models/donationsCountByType";

@Component({
  selector: 'app-my-donations-block',
  templateUrl: './my-donations-block.component.html',
  styleUrls: ['./my-donations-block.component.scss']
})
export class MyDonationsBlockComponent {
  public userDonations$: Observable<UserDonation[]> = of([]);
  public isHonoraryDonor$: Observable<Boolean> = of(false);
  // @ts-ignore
  public countsByType$: Observable<BonusResponse> = of({});

  constructor(
    private _donationsService: DonationsService,
  ) {}

  public ngOnInit(): void {
    this.userDonations$ = this._donationsService.getUserDonationsList();
    this.isHonoraryDonor$ = this._donationsService.isHonoraryDonor();
    this.countsByType$ = this._donationsService.getUserDonationsCountByType();
  }
}
