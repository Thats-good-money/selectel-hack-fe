import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";

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
        Validators.minLength(6),
        Validators.pattern(/[a-zA-Zа-яА-Я]*/),
      ]
    ),
    lastName: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(6),
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

}
