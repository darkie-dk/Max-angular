import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
    
  },
  {
    path: 'app',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [authGuard] 
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterClientComponent,
    canActivate: [authGuard] 
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [authGuard] 
  }
];
