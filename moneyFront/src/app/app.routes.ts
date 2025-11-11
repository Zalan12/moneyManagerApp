import { Routes } from '@angular/router';
import { Wallets } from './components/wallets/wallets';
import { Transactions } from './components/transactions/transactions';
import { Login } from './components/user/login/login';
import { Registration } from './components/user/registration/registration';
import { Logout } from './components/user/logout/logout';
import { NewTransact } from './components/new-transact/new-transact';
import { Profile } from './components/user/profile/profile';
import { Categories } from './components/categories/categories';
import { NewCategory } from './components/new-category/new-category';

export const routes: Routes = [
    {
        path:'wallets',
        component:Wallets
    },
        {
        path:'transactions',
        component:Transactions
    },
    {path: 'login', component:Login},
    {path: 'registration', component:Registration},
    {path: 'logout', component:Logout},
    {path: 'profile', component: Profile},
    {path: 'categories', component: Categories},
    {path: 'newCat', component:NewCategory},
    {path:'', redirectTo:'wallets', pathMatch:'full'},
    {path:'new-transact/:id', component:NewTransact},
    {path:'new-transact', component:NewTransact}
];
