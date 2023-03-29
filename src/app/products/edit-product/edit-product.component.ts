import { getProducts } from './../state/state.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { find, Observable, Subscription } from 'rxjs';
import { ProductState } from '../state/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { updateProduct } from '../state/state.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit{
  updateForm!:FormGroup;
  product!:any
  postSubscription!: Subscription;

  constructor(private store: Store<ProductState>, private route: ActivatedRoute,private router:Router) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      const id = params.get('id');
      const products :Observable<Product[]>= this.store.select(getProducts)
      this.product=products.pipe(find((each:any)=>each.id===id))
      console.log(this.product,"edit component product")
      // this.postSubscription = this.store
      //   .select(getProductById, { id })
      //   .subscribe((data) => {
      //     this.product = data;
      //     this.createForm();
      //   });
    });
  }

  createForm() {
    this.updateForm = new FormGroup({
      name: new FormControl(this.product.name, [
        Validators.required,
      ]),
      desc: new FormControl(this.product.desc, [
        Validators.required,
      ]),
      price: new FormControl(this.product.price, [
        Validators.required,
      ]),
    });
  }


  
  onUpdateProduct() {
    if (!this.updateForm.valid) {
      return;
    }

    const name = this.updateForm.value.name;
    const desc = this.updateForm.value.desc;
    const price = this.updateForm.value.price;


    const product: Product = {
      id: this.product.id,
      name,
      desc,
      price
    };

    //dispatch the action
    this.store.dispatch(updateProduct({ product }));
    this.router.navigate(['products']);
  }

  onReset(){
    this.updateForm.reset()
  }

}


