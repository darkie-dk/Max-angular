import { Component, inject, signal, type OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ClientesService, type ClientesResponse, type Pagination } from '../services/clientes.service';
import { Cliente } from '../../@types/Cliente';
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent],
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
    this.clientesService.fetchClientesFromApi()
    .pipe(
      catchError((err) => {
        console.log(err)
        throw err
      })
    )
    .subscribe((response: ClientesResponse) => {
      this.clientes.set(response.itens)
      this.pagination.set(response.pagination)
      this.total.set(response.total)
    })
    this.clientes.set(this.clientesService.clientes)
  }
}
