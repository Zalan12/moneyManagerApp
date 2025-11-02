import { Routes } from '@angular/router';
import { Wallets } from './components/wallets/wallets';
import { Transactions } from './components/transactions/transactions';

export const routes: Routes = [
    {
        path:'wallets',
        component:Wallets
    },
        {
        path:'transactions',
        component:Transactions
    }
];
