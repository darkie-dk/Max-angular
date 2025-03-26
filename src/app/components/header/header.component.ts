import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router)
  logout() {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
    this.router.navigate(['/'])
  }
}
