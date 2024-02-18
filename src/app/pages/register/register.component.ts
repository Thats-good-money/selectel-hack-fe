import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import { AuthService } from "@core/services/auth.service";
import { Router } from "@angular/router";
import { TuiAlertService } from "@taiga-ui/core";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss'],
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
export class RegisterComponent {

  public readonly registerFormComponent = new FormGroup({
    firstName: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/[a-zA-Zа-яА-Я]*/),
      ]
    ),
    lastName: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/[a-zA-Zа-яА-Я]*/),
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(8),
      ]
    )
  });

  private get _username(): string {
    const firstName = this.registerFormComponent.controls.firstName.value ?? '';
    const lastName = this.registerFormComponent.controls.lastName.value ?? '';
    return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alerts: TuiAlertService,
  ) { }

  public processRegistration(): void {
    const credentials = {
      login: this._username,
      password: this.registerFormComponent.controls.password.value ?? '',
    };

    this._authService.register(credentials)
      .subscribe({
        complete: () => this._router.navigate(['/']),
        error: (err: HttpErrorResponse) => {
          this._alerts
            .open(
              this._getErrorMessageByResponseCode(err.status),
              {
                status: 'error',
              }
            )
            .subscribe();
        },
      });
  }

  private _getErrorMessageByResponseCode(code: number): string {
    switch (code) {
      case 409:
        return 'Такой пользователь уже есть';
      default:
        return 'Неизвестная ошибка'
    }
  }

}
