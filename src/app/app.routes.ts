import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { RegisterClientComponent } from './register-client/register-client.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterClientComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: EditComponent,
  }
];
