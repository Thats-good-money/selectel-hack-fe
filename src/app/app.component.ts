import {Component, inject} from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public get isNavbarShown(): boolean {
    const urlsWithoutNavbar = ['', '/', '/login', '/register'];
    return !urlsWithoutNavbar.includes(this._location.path());
  }


  constructor(
    private _location: Location,
  ) {

  }

}
