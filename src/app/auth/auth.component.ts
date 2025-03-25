import { Component, inject, signal, type OnInit } from '@angular/core'
import { CardComponent } from '../components/card/card.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService, type LoginRequest, type LoginResponse } from '../services/auth.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-auth',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  currentYear = new Date().getFullYear()
  authService = inject(AuthService)
  router = inject(Router)
  invalidCredentials = signal(false)

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', Validators.required),
    empresa_id: new FormControl(219, [Validators.required]),
    loja_id: new FormControl(1, [Validators.required]),
  })

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value as LoginRequest
      this.authService.loginFromApi('/api/v1/Auth/login', loginRequest)
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.access_token)
          sessionStorage.setItem('refresh_token', response.refresh_token)
          console.log(sessionStorage.getItem('token'))
          this.router.navigate(['/home'])
        },
        error: (error) => {
          console.error('Erro no login:', error)
        }
      })
    } else {
      console.log('Formulário inválido')
    }
  }
}
