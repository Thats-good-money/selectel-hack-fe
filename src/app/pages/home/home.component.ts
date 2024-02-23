import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coordinates, Point, PointEdit } from '@core/models/point.model';
import { AuthService } from '@core/services/auth.service';
import { PointsService } from '@core/services/points.service';
import { rAxis, validateValue, xAxis, yAxis } from '@shared/lib/coords-info';
import { Subscription } from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {



  testForm = new FormGroup({
    testValue1: new FormControl(false),
    testValue2: new FormControl(false),
    testValue3: new FormControl(false),
    testValue4: new FormControl(false),
    testValue5: new FormControl(false),
    testValue6: new FormControl(false),
    testValue7: new FormControl(false),
  });

  rForm = new FormGroup({
    rValue1: new FormControl(false),
    rValue2: new FormControl(false),
    rValue3: new FormControl(false),
    rValue4: new FormControl(false),
    rValue5: new FormControl(false),
    rValue6: new FormControl(false),
    rValue7: new FormControl(false),
    rValue8: new FormControl(false),
    rValue9: new FormControl(false),
  })

  readonly inputForm = new FormGroup({
    testValue: new FormControl('')
  })



  onBlur(event: any){
    console.log(event.target.value)
  }

  logValue(){
    console.log(this.inputForm.get('testValue')?.value)
    console.log(this.testForm?.value)
    console.log(this.rForm?.value)
  }

  goToDonations(){
    this._router.navigate(['/donations'])
  }


  /**
   * Точки.
   */
  public points: Point[] = [];

  /**
   * Текущая редактируемая точка.
   */
  public currentPoint: PointEdit = {};

  /**
   * Объект подписки на `Observable` списка точек.
   */
  private _pointsSubscription?: Subscription;

  /**
   * Значения X.
   */
  public get xValues(): number[] {
    return xAxis.availableValues;
  }

  /**
   * Значения R.
   */
  public get rValues(): number[] {
    return rAxis.availableValues;
  }

  /**
   * Валидные ли данные в форме.
   */
  public get isFormValid(): boolean {
    const { x, y, r } = this.currentPoint;

    let numY: number | undefined = Number(y);
    if (isNaN(numY))
      numY = undefined;

    return (
      validateValue(xAxis, x) &&
      validateValue(yAxis, numY) &&
      validateValue(rAxis, r) &&
      (r != undefined && r > 0)
    );
  }

  constructor(
    private _pointsService: PointsService,
    private _authService: AuthService,
    private _router: Router,

  ) {

  }

  ngOnInit(): void {
    this._getPoints();
  }

  ngOnDestroy(): void {
    if (this._pointsSubscription)
      this._pointsSubscription.unsubscribe();
  }

  /**
   * Обработать выбор чекбокса.
   *
   * В этой лабе, к сожалению, чекбоксы - это радиокнопки.
   *
   * @param event событие клика по чекбоксу
   */
  public onCheckboxSelected(event: Event, checkboxType: 'x' | 'r') {
    const checkboxSelected = event.target as HTMLElement;

    const value = Number(checkboxSelected.getAttribute('value'));
    const wasChecked = this.currentPoint[checkboxType] == value;

    if (wasChecked) {
      this.currentPoint[checkboxType] = undefined;
    } else {
      this.currentPoint[checkboxType] = value;
    }
  }

  /**
   * Получить точки.
   */
  private _getPoints(): void {
    this._pointsSubscription = (
      this._pointsService.getPoints()
        .subscribe(points => {
          this.points = points;
        })
    );
  }

  /**
   * Установить текущие координаты точки с тех, что пришли в событии от графика.
   *
   * @param coords координаты с графика (например, при клике)
   */
  public setCoordsFromPlot(coords: Coordinates): void {
    this.currentPoint.x = coords.x;
    this.currentPoint.y = coords.y;
  }

  /**
   * Сохранить текущую точку.
   */
  public onPointFormSubmit(event: Event): void {
    event.preventDefault();
    this._pointsService.savePoint(this.currentPoint).subscribe({
      complete: () => {
        // Заново получаем точки
        this._getPoints();
      }
    });
  }

  public onLogout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  protected readonly Number = Number;
}
