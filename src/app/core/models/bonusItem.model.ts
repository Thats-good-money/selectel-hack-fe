export interface BonusItem{
  id: number,
  bonusImage: string,
  partnerImage: string,
  partnerName: string,
  bonusName: string,
  expiration: string,
  taken: boolean,
  description: string,
  promocode: string | null,
  hasFeedback: boolean
}
