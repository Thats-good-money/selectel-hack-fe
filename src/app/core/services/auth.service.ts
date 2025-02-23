import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User, UserDTO } from '@core/models/user.model';
import { environment } from 'environments/environment';
import { Observable, map, of, tap, throwError } from 'rxjs';


/**
 * Сервис для аутентификации пользователя.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Ключ в local storage для данных пользователя.
   */
  private readonly USER_STORAGE_KEY = 'user';

  private _currentUser: User | null = null;

  public get currentUser(): User | null {
    return this._currentUser;
  }

  private set currentUser(value: User) {
    this._currentUser = value;
    this._storeUser();
  }

  public getAuthHeaders(user?: User | null): HttpHeaders {
    if (user == undefined)
      user = this.currentUser;

    let headers = new HttpHeaders();
    if (user?.token != undefined)
      headers = headers.set('Authorization', `Bearer ${user?.token}`);

    return headers;
  }

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Совершить вход.
   *
   * @param credentials данные пользователя для входа
   * @returns `Observable` с объектов ответа
   */
  public login(credentials: LoginRequest): Observable<Object> {
    const url = `${environment.apiUrl}/auth/login`;

    const loginObservable = this._http.post<LoginResponse>(
      url,
      credentials,
    );

    return loginObservable.pipe(
      tap(res => {
        this.currentUser = {
          ...res.userDto,
          token: res.token,
        };
      }),
    );
  }

  /**
   * Зарегистрировать нового пользователя
   *
   * @param credentials данные пользователя для регистрации
   * @returns `Observable` с объектов ответа
   */
  public register(credentials: RegisterRequest): Observable<Object> {
    const url = `${environment.apiUrl}/auth/registration`;
    const registerObservable = this._http.post<RegisterResponse>(url, credentials);

    return registerObservable.pipe(
      tap(res => {
        this.currentUser = {
          ...res.userDto,
          token: res.token,
        };
      }),
    );
  }

  /**
   * Выйти из аккаунта.
   *
   * @returns `Observable` с объектов ответа
   */
  public logout(): Observable<Object> {
    localStorage.removeItem(this.USER_STORAGE_KEY);

    return of({});
  }

  public authViaToken(): Observable<boolean> {
    const user = this._restoreUser();

    if (user == undefined || user.token == undefined) {
      return of(false);
    }

    const url = `${environment.apiUrl}/users/${user.userId}`;
    const checkTokenObservable = this._http.patch(
      url,
      {},
      {
        headers: this.getAuthHeaders(user),
      }
    );

    return checkTokenObservable.pipe(
      map(res => {
        this.currentUser = user;
        return true;
      })
    )
  }

  public updateUser(newUserData: Partial<UserDTO>): Observable<boolean> {
    const url = `${environment.apiUrl}/users/${this.currentUser?.userId}`;

    const newUser: User = {
      ...this._currentUser,
      ...newUserData,
    } as User;

    const userUpdateObservable = this._http.patch(
      url,
      newUser,
      {
        headers: this.getAuthHeaders(this._currentUser),
      }
    );

    return userUpdateObservable.pipe(
      map(res => {
        this.currentUser = newUser;
        return true;
      })
    )
  }

  /**
   * Восстановить сохранённые данные пользователя.
   *
   * @returns данные пользователя или `null`, если они не были сохранены
   */
  private _restoreUser(): User | null {
    const storedUserCredentials = localStorage.getItem(this.USER_STORAGE_KEY);

    return storedUserCredentials ? JSON.parse(storedUserCredentials) : null;
  }

  /**
   * Сохранить данные пользователя.
   */
  private _storeUser(): void {
    const userJSON = JSON.stringify(this._currentUser);

    localStorage.setItem(this.USER_STORAGE_KEY, userJSON);
  }
}
