import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public readonly titles: Record<string, string> = {
    '/address-needs': 'Центры крови',
    '/donations': 'Добавление донации',
    '/my-donations': 'Мои донации',
  };

  public get title(): string {
    const path = this._location.path();
    return this.titles[path] ?? '';
  }

  constructor(
    private _location: Location,
  ) {
  }

  public goBack(): void {
    this._location.back();
  }

}
