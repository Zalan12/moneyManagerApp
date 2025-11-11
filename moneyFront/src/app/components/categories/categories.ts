import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../interfaces/transaction';
import { ApiResponse } from '../../interfaces/apiresponse';
import { Categorie } from '../../interfaces/categories';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  constructor (private api:Api){}
  categories:Categorie[] = [];

    async ngOnInit() {
      this.getAllCategories();
    }

    getAllCategories(){
      this.api.selectAll('categories').then((res:ApiResponse)=>{
        if(res.status==200)
          {
            this.categories=res.data;
          }
        
      })
    }
    delete(id:number){
      if(window.confirm('biztos törlöd'))
      {
        this.api.delete('categories',id).then((res:ApiResponse)=>{
          if(res.status==200){
            alert('Adat sikeresen törölve')
            this.getAllCategories();

          }
          else{
            alert(res.message)
          }
        })
      }
    }
}
