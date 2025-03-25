import { Injectable } from '@angular/core'
import { Cliente, ClienteRequest } from '../../@types/Cliente'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../enviroment/env'
import { AuthService } from './auth.service'

export interface Pagination {
  total_registros: number
  total_vlr: number | null
  limit: number
  offset: number
  sort: string
}

export interface FetchClientesResponse {
  success: boolean
  itens: Cliente[]
  pagination: Pagination
  total: number
}


@Injectable({
  providedIn:'root'
})
export class ClientesService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  fetchClientesFromApi(apiPath: string) {
    const url = `${environment.apiBaseUrl}${apiPath}`  
    const sessionToken = this.auth.getTokenFromSession()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionToken}`
    })
    return this.http.get<FetchClientesResponse>(url, { headers })
  }

  
  getClienteByIdFromApi(apiPath: string) {
    const url = `${environment.apiBaseUrl}${apiPath}`
    const sessionToken = this.auth.getTokenFromSession()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionToken}`
    })
    return this.http.get<Cliente>(url, { headers })
  }

  updateClienteByIdFromApi(apiPath: string, clientData: ClienteRequest) {
    const url = `${environment.apiBaseUrl}${apiPath}`
    const sessionToken = this.auth.getTokenFromSession()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionToken}`
    })
    console.log(clientData)
    console.log(url)
    return this.http.put(url, clientData, { headers })
  }

  registerClienteFromApi(apiPath: string, clientData: ClienteRequest) {
    const url = `${environment.apiBaseUrl}${apiPath}`
    const sessionToken = this.auth.getTokenFromSession()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionToken}`
    })
    console.log(clientData)
    return this.http.post(url, clientData, { headers })
  }
}

