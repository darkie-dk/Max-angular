import { inject, Injectable } from '@angular/core'
import { TipoCadastro, type Cliente } from '../../@types/Cliente'
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface Pagination {
  total_registros: number
  total_vlr: number | null
  limit: number
  offset: number
  sort: string
}

export interface ClientesResponse {
  success: boolean
  itens: Cliente[]
  pagination: Pagination
  total: number
}

@Injectable()
export class ClientesService {
  http = inject(HttpClient)

  clientes: Array<Cliente> = []

  fetchClientesFromApi() {
    const url = `https://desenvolvimento.maxdata.com.br/api/v1/Cadastro`

    const token = this.getTokenFromLocalStorage()
    const headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXBvVXN1YXJpb01heGRhdGEiOiJDbGllbnRlIiwiZW1haWwiOiJpbnRlZ3JhY2FvQG1heGRhdGEuY29tLmJyIiwidXN1YXJpb19hZG1faWQiOjIyLCJ1c3VhcmlvX2lkIjoyMCwiZW1wcmVzYV9pZCI6MjE5LCJsb2phX2lkIjoxLCJjbnBqIjoiMzY5MTk2MjQwMDAxNTQiLCJzeXN0ZW0iOiJvOUR2bzVDcjdGWFN4Z1RodTFBTjF0M0owR1VIUHlMRjYzanJJS25xZ3Rhanh3SVFTZmNuTEFKeS90RDIwL1ZoIiwiYWRtaW4iOiJGYWxzZSIsIm1lbnVfY29tcGxldG8iOiJUcnVlIiwiZGVwYXJ0YW1lbnRvcyI6IkRpcmV0b3JpYSxGaW5hbmNlaXJvLEdlcmVuY2lhLENhaXhhLFZlbmRhcyxBc3Npc3RlbnRlVGVjbmljbyxBdGVuZGVudGVUZWNuaWNvLEVudHJlZ2Fkb3IiLCJuYmYiOjE3NDI4NTI5NjEsImV4cCI6MTc0Mjg2MDE2MSwiaWF0IjoxNzQyODUyOTYxLCJpc3MiOiJNYXhkYXRhIFNpc3RlbWFzIC0gTWF4LU1hbmFnZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0In0.rMIaXRJ2QmEB8FGWWiZEv8j_QK9lIFotIrvqtSK46KQ`
    })

    return this.http.get<ClientesResponse>(url, { headers })
  }

  // private getTokenFromCookie(): string | null {
  //   const match = document.cookie.match(/(?:^|;\s*)token\s*=\s*([^;]*)/);
  //   return match ? match[1] : null;
  // }

  private getTokenFromLocalStorage(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  constructor() { }
}

