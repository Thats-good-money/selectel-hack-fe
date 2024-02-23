import {Component, OnInit} from '@angular/core';
import {BonusesService} from "@core/services/bonuses.service";
import {environment} from "../../../../environments/environment";
import {BonusResponse} from "@core/models/bonus.model";
import {BonusItem} from "@core/models/bonusItem.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {tuiAvatarOptionsProvider} from "@taiga-ui/kit";

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.less'],
  providers: [
    tuiAvatarOptionsProvider({
      size: "s",
      autoColor: true,
      rounded: true
    })
  ]
})
export class BonusesComponent  implements OnInit{
  constructor(private bonusService: BonusesService) {
  }

  bonuses: BonusItem[] = []

  ngOnInit() {
    this.bonusService.getBonuses(`${environment.externalApiUrl}/bonuses`).subscribe((response: BonusResponse) => {
      this.bonuses = response.results.map(bonus => ({bonusImage: bonus.bonus_image, partnerImage: bonus.partner_image,
        bonusName: bonus.bonus_name, expiration: this.formatData(bonus.date_validity), taken: bonus.is_taken}))
    })

  }

  formatData(stringDate: string): string{
    const date = new Date(stringDate)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

}
