import { Component } from '@angular/core';
import { Wallet } from '../../interfaces/wallet';
import { ApiResponse } from '../../interfaces/apiresponse';
import { Api } from '../../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-wallet',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-wallet.html',
  styleUrl: './new-wallet.scss',
})
export class NewWallet {
  id:number | undefined=undefined; //Údiós pályázat típus
    newWallet: Wallet = {
      id:0,
      userID:0,
      name:'',
      balance:''
    }
    allWallets: Wallet[] = []
    ngOnInit(): void {
      this.id=this.activatedRoute.snapshot.params['id'];
      if(this.id){
        this.api.select('wallets',this.id).then((res:ApiResponse)=>{
          this.newWallet=res.data[0]
        })
      }
      this.getAllWallets();
    }
  
    constructor(private api: Api, private activatedRoute:ActivatedRoute, private router:Router) { }
    getAllWallets() {
      this.api.selectAll('wallets').then((res: ApiResponse) => {
        this.allWallets = res.data;
  
      })
    }
    save() {
      if (this.newWallet.name == "") {
        alert('Add meg a nevét!!!');
        return;
      }
    
      if(!this.id){
        this.api.insert('wallets', this.newWallet).then((res: ApiResponse) => {
          if (res.status == 200) {
            alert(res.message);
            this.newWallet = {
              id: 0,
              userID: 0,
              name: '',
              balance: ''
            };
            this.getAllWallets();
          }
          else {
            alert(res.message)
          }
        })
      }
      else{
        console.log(this.newWallet)
        this.api.update('wallets',this.id,this.newWallet).then((res:ApiResponse)=>{
          if(res.status==200){
            alert('Sikeres adatmódosítás');
            this.router.navigate(['/wallets']);
          }
          else{alert(res.message)}
        })
      }
      
    }
}
