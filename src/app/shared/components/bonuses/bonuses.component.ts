import {Component, Inject, OnInit} from '@angular/core';
import {BonusesService} from "@core/services/bonuses.service";
import {environment} from "../../../../environments/environment";
import {BonusResponse, ExactBonusResponse} from "@core/models/bonus.model";
import {BonusItem} from "@core/models/bonusItem.model";
import {tuiAvatarOptionsProvider} from "@taiga-ui/kit";
import {TuiAlertService} from "@taiga-ui/core";
import {TuiSheetDialogOptions} from '@taiga-ui/addon-mobile';
import {gray} from "d3-color";
import {FormControl} from "@angular/forms";

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
  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private bonusService: BonusesService) {
  }



  bonuses: BonusItem[] = []

  newBonusItem: BonusItem = {
    id: 0,
    bonusImage: '',
    partnerImage: '',
    partnerName: '',
    bonusName: '',
    expiration: '',
    taken: false,
    description: '',
    promocode: null,
    hasFeedback: false
  };




  ngOnInit() {
    this.bonusService.getBonuses(`${environment.externalApiUrl}/bonuses`).subscribe((response: BonusResponse) => {
      this.bonuses = response.results.map(bonus => ({id: bonus.id, bonusImage: bonus.bonus_image, partnerImage: bonus.partner_image, partnerName: '',
        bonusName: bonus.bonus_name, expiration: this.formatData(bonus.date_validity), taken: bonus.is_taken, description: '', promocode: '', hasFeedback: false}))
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

  claimBonus(bonus: BonusItem, message: string, observer: any){
    let trueBonus = this.bonuses[this.bonuses.findIndex(item => item.id === bonus.id)]
    observer.complete()
    trueBonus.taken = true
    this.alerts.open(message).subscribe()
    this.bonuses.splice(this.bonuses.indexOf(trueBonus), 1)
    this.bonuses.push(trueBonus)
  }

  open = false

  readonly bonusDetails: Partial<TuiSheetDialogOptions> = {
    label: 'Подробности',
    closeable: true
  }

  findDetails(bonus: BonusItem){
    this.open = true
    this.bonusService.getDetails(`${environment.externalApiUrl}/bonuses/${bonus.id}`).subscribe((response: ExactBonusResponse) => {
      this.newBonusItem.id = response.id
      this.newBonusItem.partnerName = response.partner_name
      this.newBonusItem.bonusName = response.bonus_name
      this.newBonusItem.description = response.bonus_description
      this.newBonusItem.promocode = response.promocode
    })
  }

  promocode = this.newBonusItem.promocode === null ? 'А фиг вам' : this.newBonusItem.promocode

  copyText(text: string | null){
    if (typeof text === "string") {
      navigator.clipboard.writeText(text).then(() => {
        this.alerts.open('Промокод скопирован').subscribe()
      }).catch(err => {
        console.error('Все сломалось')
      })
    }
  }

  rateValue = 5

  postFeedback(){
    this.alerts.open(`Вы поставили ${this.rateValue} звезд. Спасибо за отзыв!`).subscribe()
  }


}
