import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthModule } from "../service/auth-module";

export const GuestGuard: CanActivateFn = () => {
  const authService = inject(AuthModule);
  const router = inject(Router);

  if (!authService.getToken()) {
    return true;
  }

  return router.navigate(['/profile']);

}
