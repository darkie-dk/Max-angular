import { Component, inject, signal, type OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ClientesService } from '../services/clientes.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cliente, TipoCadastro, type ClienteUpdateRequest } from '../../@types/Cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  providers: [ClientesService]
})
export class EditComponent implements OnInit {
  clientesService = inject(ClientesService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  clienteOriginal: Cliente | null = null

  dadosForm = new FormGroup({
    dt_ultima_alteracao: new FormControl<string>(new Date().toISOString()),
    ativo: new FormControl<boolean | null>(true),
    nome: new FormControl<string | null>(null),
    fantasia: new FormControl<string | null>(null),
    tipo_pessoa: new FormControl<"Fisica" | "Juridica" >('Fisica'),
    tipo_cadastro: new FormControl<TipoCadastro>(TipoCadastro.Cliente),
    cadastro_tipo_id: new FormControl<number>(2),
    cpf_cnpj: new FormControl<string | null>(null),
    rg_ie: new FormControl<string | null>(null),
    tipo_regime_apuracao: new FormControl<'Simples' | 'Normal'>('Simples'),
    tipo_preco_venda: new FormControl<string>('SomenteVenda'),
  })

  enderecoForm = new FormGroup({
    descricao: new FormControl<string>('PRINCIPAL'),
    endereco: new FormControl<string>('Quadra ARSE 121 Alameda 8'),
    endereco_numero: new FormControl<string>('34'),
    endereco_bairro: new FormControl<string>('Plano Diretor Sul'),
    endereco_cep: new FormControl<string>('77019514'),
    endereco_municipio_codigo_ibge: new FormControl<number>(1721000),
    principal: new FormControl<boolean>(false),
    cobranca: new FormControl<boolean>(false),
    ie_produtor_rural: new FormControl<string>('1111'),
  })

  contatoForm = new FormGroup({
    descricao: new FormControl<string>('string'),
    fone: new FormControl<string>('string'),
    email: new FormControl<string>('string'),
    enviar_orcamento: new FormControl<boolean>(true),
    enviar_nf: new FormControl<boolean>(true),
    enviar_boleto: new FormControl<boolean>(true),
  })
  
  tipoPessoa = signal<'Fisica' | 'Juridica'>('Fisica')
  tipoCadastroOptions = Object.values(TipoCadastro)

  constructor() {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const clienteId = params['id']
      const c = this.loadCliente(clienteId)
      console.log(c)
    })
  }

  loadCliente(clienteId: string) {
    const apiPath = `/api/v1/Cadastro/${clienteId}`
    this.clientesService.getClienteByIdFromApi(apiPath)
    .pipe(
          catchError((err) => {
            console.log(err)
            throw err
          })
        )
        .subscribe((response: any) => {
          this.clienteOriginal = response
          this.dadosForm.patchValue(response)
          console.log(response)
        })
    }

  onSubmit() {
    if (this.dadosForm.valid && this.clienteOriginal) {
      const updatedCliente = {
        ...this.clienteOriginal,
        ...this.dadosForm.value,
        cadastro_endereco_padrao: {
          ...this.enderecoForm.value
        },
        cadastro_contato_padrao: {
          ...this.contatoForm.value
        },
      } as ClienteUpdateRequest
      this.route.params.subscribe((params) => {
        const clienteId = params['id']
        const apiPath = `/api/v1/Cadastro/${clienteId}`

        this.clientesService.updateClienteByIdFromApi(apiPath, updatedCliente).subscribe({
          next: () => {
            this.router.navigate(['/home'])
          },
          error: (error) => {
            console.error('Erro ao atualizar cliente:', error)
          }
        })
      })
    }
  }

  getChangedFields(original: Cliente, updated: any): Partial<Cliente> {
    const changedFields: Partial<Cliente> = {};
  
    Object.keys(updated).forEach((key) => {
      const typedKey = key as keyof Cliente;
      if (updated[typedKey] !== original[typedKey]) {
        changedFields[typedKey] = updated[typedKey];
      }
    });
  
    return changedFields;
  }
}
