import { Injectable } from '@angular/core'

import { HttpClient,  } from '@angular/common/http'
import { catchError } from 'rxjs'
import { environment } from '../../enviroment/env'

export interface LoginRequest {
  email: string | null
  senha: string | null
  empresa_id: number | null
  loja_id: number | null
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
}

@Injectable({
  providedIn:'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  loginFromApi(apiPath: string, credentials: LoginRequest) {
    const url = `${environment.apiBaseUrl}${apiPath}`

    return this.http.post<LoginResponse>(url, credentials)
    .pipe(
      catchError((err) => {
          throw err
      }))
  }

  getTokenFromSession(): string | null {
    return sessionStorage.getItem('token')
  }
}
