import { Component, type OnInit } from '@angular/core'
import { CardComponent } from '../components/card/card.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'


@Component({
  selector: 'app-auth',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  currentYear = new Date().getFullYear()

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
    empresa_id: new FormControl(),
    loja_id: new FormControl(),
  })

  onSubmit() {
    console.log(this.loginForm.value)
  }
}
