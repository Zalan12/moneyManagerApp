import { Component } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiresponse';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categorie } from '../../interfaces/categories';

@Component({
  selector: 'app-new-category',
  imports: [CommonModule,FormsModule],
  templateUrl: './new-category.html',
  styleUrl: './new-category.scss',
})
export class NewCategory {
  id:number | undefined=undefined; //Údiós pályázat típus
  newCategory: Categorie = {
    id:0,
    walletId:0,
    type:""
  }
  allCategories: Categorie[] = []
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.api.select('categories',this.id).then((res:ApiResponse)=>{
        this.newCategory=res.data[0]
      })
    }
    this.getAllCategories();
  }

  constructor(private api: Api, private activatedRoute:ActivatedRoute, private router:Router) { }
  getAllCategories() {
    this.api.selectAll('categories').then((res: ApiResponse) => {
      this.allCategories = res.data;

    })
  }
  saveCat() {
    if (this.newCategory.type == " ") {
      alert('Add meg a típúsát!!!');
      return;
    }
  
    if(!this.id){
      this.api.insert('categories', this.newCategory).then((res: ApiResponse) => {
        if (res.status == 200) {
          alert(res.message);
          this.newCategory = {
              id:0,
              walletId:0,
              type:""
          };
          this.getAllCategories();
        }
        else {
          alert(res.message)
        }
      })
    }
    else{
      console.log(this.newCategory)
      this.api.update('categories',this.id,this.newCategory).then((res:ApiResponse)=>{
        if(res.status==200){
          alert('Sikeres adatmódosítás');
          this.router.navigate(['/categories']);
        }
        else{alert(res.message)}
      })
    }
    
  }
}
