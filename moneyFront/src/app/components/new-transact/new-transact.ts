import { Component } from '@angular/core';
import { Transaction } from '../../interfaces/transaction';
import { ApiResponse } from '../../interfaces/apiresponse';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Wallet } from '../../interfaces/wallet';

@Component({
  selector: 'app-new-transact',
  imports: [FormsModule,CommonModule],
  templateUrl: './new-transact.html',
  styleUrl: './new-transact.scss',
})
export class NewTransact {
 id:number | undefined=undefined; //Údiós pályázat típus
    newTransact: Transaction = {
         id:0,
      walletId:0,
      amount:0,
      categoryId:0,
      type:""
    }
    allTransActs: Transaction[] = []
    wallets:Wallet[] = [];
    ngOnInit(): void {
      this.id=this.activatedRoute.snapshot.params['id'];
      if(this.id){
        this.api.select('transactions',this.id).then((res:ApiResponse)=>{
          this.newTransact=res.data[0]
        })
      }
      this.getAllTransacts();
      this.getAllWallets();
    }
    getAllWallets(){
      this.api.selectAll('wallets').then((res:ApiResponse)=>{
        if(res.status==200)
          {
            this.wallets=res.data;
            console.log(this.wallets)
          }
        
      })
    }
  
    constructor(private api: Api, private activatedRoute:ActivatedRoute, private router:Router) { }
    getAllTransacts() {
      this.api.selectAll('transactions').then((res: ApiResponse) => {
        this.allTransActs = res.data;
  
      })
    }
    save() {
      if (this.newTransact.amount == 0) {
        alert('Add meg az összeget!!!');
        return;
      }
    
      if(!this.id){
        this.api.insert('transactions', this.newTransact).then((res: ApiResponse) => {
          if (res.status == 200) {
            alert(res.message);
            this.newTransact = {
                id:0,
                walletId:0,
               amount:0,
                categoryId:0,
                   type:""
            };
            this.getAllTransacts();
          }
          else {
            alert(res.message)
          }
        })
      }
      else{
        console.log(this.newTransact)
        this.api.update('transactions',this.id,this.newTransact).then((res:ApiResponse)=>{
          if(res.status==200){
            alert('Sikeres adatmódosítás');
            this.router.navigate(['/customers']);
          }
          else{alert(res.message)}
        })
      }
      
    }
}
