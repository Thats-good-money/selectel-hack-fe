import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@core/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import { TuiAlertService } from "@taiga-ui/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent {

  public readonly loginCredentialsForm = new FormGroup({
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(8),
      ]
    ),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alerts: TuiAlertService,
  ) { }

  public processAuth(): void {
    const credentials = {
      login: this.loginCredentialsForm.controls.username.value ?? '',
      password: this.loginCredentialsForm.controls.password.value ?? '',
    };

    this._authService.login(credentials)
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
      case 403:
      case 404:
        return 'Неверный логин или пароль';
      default:
        return 'Неизвестная ошибка'
    }
  }
}
