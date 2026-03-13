import { Routes } from '@angular/router';
import { Login } from './componets/login/login';
import { Register } from './componets/register/register';
import { GuestGuard } from './guards/Guest_guard';
import { AuthGuard } from './guards/Auth_guard';
import { UserModule } from './componets/user-module/user-module';
import { PublicUser } from './componets/public-user/public-user';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [GuestGuard] },
    { path: 'register', component: Register, canActivate: [GuestGuard] },
    { path: 'profile', component: UserModule, canActivate: [AuthGuard] },
    { path: 'users/:username', component: PublicUser, canActivate: [AuthGuard] },
];
