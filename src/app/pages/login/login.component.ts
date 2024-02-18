import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@core/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";

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
  @Input() isRegistering: boolean = false;

  public validationError?: string;

  public loginCredentialsForm = new FormGroup({
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

  public username: string = '';

  public password: string = '';

  public get sumbitText(): string {
    return this.isRegistering ? 'Зарегистрироваться' : 'Войти';
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  public processAuth(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    let authObservable: Observable<Object>;

    if (this.isRegistering) {
      authObservable = this._authService.register(credentials);
    } else {
      authObservable = this._authService.login(credentials);
    }

    authObservable.subscribe({
      complete: () => this._router.navigate(['/']),
      error: (err: HttpErrorResponse) => {
        if (err.status === 401)
          this.validationError = 'Неверный логин или пароль';
        else if (err.status === 500)
          this.validationError = 'Длина не менее 3-х символов';
      },
    })
  }
}
