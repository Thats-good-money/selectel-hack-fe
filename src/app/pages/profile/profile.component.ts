import { Component, OnInit } from '@angular/core';
import { BloodType, User } from "@core/models/user.model";
import { map, Observable, of } from 'rxjs';
import { GeographyService } from "@core/services/geography.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TUI_VALIDATION_ERRORS } from "@taiga-ui/kit";
import { AuthService } from "@core/services/auth.service";
import { TuiAlertService } from "@taiga-ui/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения',
        minlength: ({requiredLength}: {requiredLength: string}) => `Значение должно быть не менее ${requiredLength} символов`,
      },
    },
  ]
})
export class ProfileComponent implements OnInit {
  public readonly bloodTypes: BloodType[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  public cities: string[] = [];

  public isChangingPassword = false;

  public readonly profileForm = new FormGroup({
    firstName: new FormControl<string>(
      '',
      [
        Validators.required,
      ],
    ),
    bloodType: new FormControl<BloodType | null>(
      null,
    ),
    city: new FormControl<string | null>(
      '',
    )
  });

  public readonly newPasswordControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(8),
    ]
  )

  constructor(
    private _geographyService: GeographyService,
    private _authService: AuthService,
    private _alerts: TuiAlertService,
  ) {}

  public ngOnInit(): void {
    this._geographyService.getCitiesList()
      .pipe(
        map(cities => cities.map(city => city.title)),
      )
      .subscribe(cities => {
        this.cities = cities;
        this._fillFieldsWithUserData();
      });
  }

  public updateProfile(): void {
    this._authService.updateUser(this.profileForm.value)
      .subscribe({
        complete: () => {
          this._alerts.open('Данные обновлены').subscribe();
          this._fillFieldsWithUserData();
        },
        error: () => {
          this._alerts.open('Произошла ошибка', { status: 'error' }).subscribe();
        }
      });
  }

  public updatePassword(): void {
     // TODO
  }

  private _fillFieldsWithUserData(): void {
    const user = this._authService.currentUser;
    if (!user) {
      return;
    }

    this.profileForm.patchValue({
      firstName: user.firstName,
      bloodType: user.bloodType,
    });

    if (user.city && this.cities.includes(user.city)) {
      this.profileForm.controls.city.setValue(user.city);
    }
  }

}
