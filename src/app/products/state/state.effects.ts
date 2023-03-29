import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
// import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/service/products.service";
import {  addProductSuccess, createProductAction, getProductsAction, loadProductsSuccess } from "./state.actions";

@Injectable()

export class ProductEffects {
    constructor(private actions$:Actions,private productService: ProductService,
        // private store: Store<AppState>
        ) {}

    loadProducts$:any = createEffect(
      ()=>{
      return this.actions$.pipe(ofType(getProductsAction),mergeMap(()=>{
          return this.productService.getProductsService().pipe(map((products:Product[])=>{
            return loadProductsSuccess({products})
          }))
      }
      
      ))
    })

    addPost$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(createProductAction),
        mergeMap((action) => {
          console.log(action)
          return this.productService.addProduct(action.product).pipe(
            map((data) => {
              console.log(data," add post effects data from service")
              const product = { ...data.product };
              return addProductSuccess({ product });
            })
          );
        })
      );
    });
  
}