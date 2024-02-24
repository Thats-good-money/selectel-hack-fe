import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import { AuthService } from "@core/services/auth.service";
import { Router } from "@angular/router";
import { TuiAlertService } from "@taiga-ui/core";
import { HttpErrorResponse } from "@angular/common/http";
import { RegisterRequest } from "@core/models/user.model";

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
        email: 'Введите корректную почту',
        pattern: 'Имя должно содержать только буквы',
      },
    },
  ]
})
export class RegisterComponent {

  public readonly registerFormComponent = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ),
    firstName: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Zа-яА-Я]+$/),
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ]
    )
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alerts: TuiAlertService,
  ) { }

  public processRegistration(): void {
    const data: RegisterRequest = {
      email: this.registerFormComponent.controls.email.value ?? '',
      firstName: this.registerFormComponent.controls.firstName.value ?? '',
      password: this.registerFormComponent.controls.password.value ?? '',
      tag: undefined ?? 'user',
    }

    this._authService.register(data)
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
