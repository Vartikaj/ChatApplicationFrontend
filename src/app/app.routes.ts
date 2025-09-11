import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { MemberListComponent } from '../features/members/member-list/member-list.component';
import { MemberDetailsComponent } from '../features/members/member-details/member-details.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessageComponent } from '../features/message/message.component';
import { authGuardGuard } from '../core/guards/auth-guard.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuardGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:id', component: MemberDetailsComponent},
            {path: 'list', component:ListsComponent},
            {path:'messages', component:MessageComponent},
        ]
    },
    
    {path: '**', component: HomeComponent} // wildcard route to catch all undefined routes
];
