import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '@core/models/user.model';
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
      headers = headers.set('Authorization', user?.token);

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
    const url = `${environment.apiUrl}/login`;

    const loginObservable = this._http.post<LoginResponse>(
      url,
      credentials,
    );

    return loginObservable.pipe(
      tap(res => {
        this.currentUser = {
          username: credentials.email,
          points: [],
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
          username: credentials.email,
          points: [],
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

    const url = `${environment.apiUrl}/auth/logout`;

    return this._http.post(
      url,
      null,
      {
        headers: this.getAuthHeaders(this.currentUser)
      },
    );
  }

  public authViaToken(): Observable<boolean> {
    const user = this._restoreUser();

    if (user == undefined || user.token == undefined) {
      return of(false);
    }

    const url = `${environment.apiUrl}/auth/checkToken`;
    const checkTokenObservable = this._http.post(
      url,
      null,
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
