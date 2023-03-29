import { createProductAction } from './../state/state.actions';
import { Store } from '@ngrx/store';
import { ProductState } from './../state/state';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  form :FormGroup;

  constructor(private store:Store<ProductState>,){
    this.form=new FormGroup({
      name:new FormControl('',Validators.required),
      desc:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required)
    })
  }
  
  onAddProduct(){
    const product={name:this.form.value.name,
    desc:this.form.value.desc,
    price:this.form.value.price}
    this.store.dispatch(createProductAction({product}))
  }

  onReset(){
  this.form.reset()
}
}
