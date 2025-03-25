import { Component, inject, signal, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ClientesService, FetchClientesResponse, Pagination } from '../services/clientes.service';
import { Cliente } from '../../@types/Cliente';
import { catchError } from 'rxjs/operators'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ClientesService]
})
export class HomeComponent implements OnInit {
  clientesService = inject(ClientesService)
  clientes = signal<Array<Cliente>>([])
  pagination = signal<Pagination | null>(null)
  total = signal(0)
  

  ngOnInit(): void {
    this.clientesService.fetchClientesFromApi('/api/v1/Cadastro')
    .pipe(
      catchError((err) => {
        console.log(err)
        throw err
      })
    )
    .subscribe((response: FetchClientesResponse) => {
      this.clientes.set(response.itens)
      this.pagination.set(response.pagination)
      this.total.set(response.total)
    })
  }
}
