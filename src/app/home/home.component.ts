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
  paginacao = signal<Pagination>({
      total_registros: 0,
      total_vlr: null,
      limit: 20,
      offset: 0,
      sort:"id" 
    })

  currentPage = signal<number>(Math.ceil(this.paginacao().offset / this.paginacao().limit) + 1)

  totalPages(): number {
    return Math.ceil(this.paginacao().total_registros / this.paginacao().limit);
  }
  

  ngOnInit(): void {
    this.loadFetching()
  }

  loadFetching() {
    this.clientesService.fetchClientesFromApi('/api/v1/Cadastro', this.paginacao())
    .pipe(
      catchError((err) => {
        console.log(err)
        throw err
      })
    )
    .subscribe((response: FetchClientesResponse) => {
      this.clientes.set(response.itens)
      this.paginacao.set(response.paginacao)
    })
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return
    const newOffset = ((page - 1) * this.paginacao().limit) - 1
    this.paginacao.set({ ...this.paginacao(), offset: newOffset })
    this.currentPage.set(page)
    this.loadFetching()
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1)
    }
    this.loadFetching()
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1)
    }
    this.loadFetching()
  }
}
