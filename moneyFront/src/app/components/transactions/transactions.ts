import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../interfaces/transaction';
import { ApiResponse } from '../../interfaces/apiresponse';


@Component({
  selector: 'app-transactions',
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions {
constructor (private api:Api){}
  transactions:Transaction[] = [];
    async ngOnInit() {
      
      this.getAllTransactions();

    }
    getAllTransactions(){
      this.api.selectAll('transactions').then((res:ApiResponse)=>{
        if(res.status==200)
          {
            this.transactions=res.data;
          }
        
      })
    }
    delete(id:number){
      if(window.confirm('biztos törlöd'))
      {
        this.api.delete('transactions',id).then((res:ApiResponse)=>{
          if(res.status==200){
            alert('Adat sikeresen törölve')
            this.getAllTransactions();

          }
          else{
            alert(res.message)
          }
        })
      }
    }
}
