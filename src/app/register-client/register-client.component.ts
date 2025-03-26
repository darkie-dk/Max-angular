import { Component, inject, signal, type OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';
import { TipoCadastro, type ClienteRequest } from '../../@types/Cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-client',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss'
})
export class RegisterClientComponent implements OnInit {
  clientesService = inject(ClientesService);
  router = inject(Router);

  dadosForm = new FormGroup({
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
    descricao: new FormControl<string>(''),
    fone: new FormControl<string>(''),
    email: new FormControl<string>(''),
    enviar_orcamento: new FormControl<boolean>(true),
    enviar_nf: new FormControl<boolean>(true),
    enviar_boleto: new FormControl<boolean>(true),
  })
  
  tipoPessoa = signal<'Fisica' | 'Juridica'>('Fisica')
  tipoCadastroOptions = Object.values(TipoCadastro)

  ngOnInit(): void {}

  onSubmit() {
      const clienteData = {
        ...this.dadosForm.value,
        cadastro_endereco_padrao:{
            ...this.enderecoForm.value
          },
        cadastro_contato_padrao: {
          ...this.contatoForm.value
        },
      } as ClienteRequest

      this.clientesService.registerClienteFromApi('/api/v1/Cadastro', clienteData).subscribe({
        next: () => {
          this.router.navigate(['/app'])
        },
        error: (err: Error) => {
          console.error('Erro ao cadastrar cliente:', err)
        },
      })
  }
}
