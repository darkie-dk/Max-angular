import { Component, inject, type OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';
import { TipoCadastro } from '../../@types/Cliente';

@Component({
  selector: 'app-register-client',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss'
})
export class RegisterClientComponent implements OnInit {
  clientesService = inject(ClientesService);
  router = inject(Router);

  clienteForm = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    fantasia: new FormControl<string | null>(null),
    tipo_pessoa: new FormControl<'Fisica' | 'Juridica' | null>('Fisica'),
    tipo_cadastro: new FormControl<TipoCadastro | null>(null),
    cpf_cnpj: new FormControl<string | null>(null),
    rg_ie: new FormControl<string | null>(null),
    dt_nascimento: new FormControl<string | null>(null),
    fone: new FormControl<string | null>(null),
    celular: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    naturalidade_uf: new FormControl<string | null>(null),
    naturalidade_cidade: new FormControl<string | null>(null),
    ativo: new FormControl<boolean>(true),
  });

  tipoCadastroOptions = Object.values(TipoCadastro);

  ngOnInit(): void {}

  onSubmit() {
  //   if (this.clienteForm.valid) {
  //     const clienteData = this.clienteForm.value;

  //     this.clientesService.createCliente(clienteData).subscribe({
  //       next: () => {
  //         this.router.navigate(['/home']);
  //       },
  //       error: (err: Error) => {
  //         console.error('Erro ao cadastrar cliente:', err);
  //       },
  //     });
  //   }
  }
}
