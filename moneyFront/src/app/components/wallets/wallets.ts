import { Component } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiresponse';
import { Api } from '../../services/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Wallet } from '../../interfaces/wallet';


@Component({
  selector: 'app-wallets',
  imports: [CommonModule,RouterModule],
  templateUrl: './wallets.html',
  styleUrl: './wallets.scss',
})
export class Wallets {
  constructor (private api:Api){}
  wallets:Wallet[] = [];
    async ngOnInit() {
      
      this.getAllWallets();

    }
    getAllWallets(){
      this.api.selectAll('wallets').then((res:ApiResponse)=>{
        if(res.status==200)
          {
            this.wallets=res.data;
          }
        
      })
    }
    delete(id:number){
      if(window.confirm('biztos törlöd'))
      {
        this.api.delete('wallets',id).then((res:ApiResponse)=>{
          if(res.status==200){
            alert('Adat sikeresen törölve')
            this.getAllWallets();

          }
          else{
            alert(res.message)
          }
        })
      }
    }
}
