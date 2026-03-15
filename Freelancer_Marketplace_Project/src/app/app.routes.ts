import { Routes } from '@angular/router';
import { Login } from './componets/login/login';
import { Register } from './componets/register/register';
import { GuestGuard } from './core/guards/Guest_guard';
import { AuthGuard } from './core/guards/Auth_guard';
import { UserModule } from './componets/user-module/user-module';
import { PublicUser } from './componets/public-user/public-user';
import { JobsList } from './componets/jobs-module/jobs-list/jobs-list';
import { JobsForm } from './componets/jobs-module/jobs-form/jobs-form';
import { JobsDetailedView } from './componets/jobs-module/jobs-detailed-view/jobs-detailed-view';
import { JobsEdit } from './componets/jobs-module/jobs-edit/jobs-edit';
import { JobsProposal } from './componets/jobs-module/jobs-proposal/jobs-proposal';
import { JobsProposalList } from './componets/jobs-module/jobs-proposal-list/jobs-proposal-list';
import { MyBids } from './componets/proposal-module/my-bids/my-bids';
import { JobsReview } from './componets/review-module/jobs-review/jobs-review';
import { MyReviews } from './componets/review-module/my-reviews/my-reviews';
import { PlatformStats } from './componets/platform-module/platform-stats/platform-stats';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [GuestGuard] },
    { path: 'register', component: Register, canActivate: [GuestGuard] },
    { path: 'profile', component: UserModule, canActivate: [AuthGuard] },
    { path: 'users/:username', component: PublicUser, canActivate: [AuthGuard] },
    { path: 'jobs', component: JobsList, canActivate: [AuthGuard] },
    { path: 'jobs/new', component: JobsForm, canActivate: [AuthGuard] },
    { path: 'jobs/:id', component: JobsDetailedView, canActivate: [AuthGuard] },
    { path: 'jobs/:id/edit', component: JobsEdit, canActivate: [AuthGuard] },
    { path: 'jobs/:id/proposal', component: JobsProposal, canActivate: [AuthGuard] },
    { path: 'jobs/:id/proposals', component: JobsProposalList, canActivate: [AuthGuard] },
    { path: 'jobs/:id/review', component: JobsReview, canActivate: [AuthGuard] },
    { path: 'my-bids', component: MyBids, canActivate: [AuthGuard] },
    { path: 'my-reviews', component: MyReviews, canActivate: [AuthGuard] },
    { path: 'stats', component: PlatformStats },
];
