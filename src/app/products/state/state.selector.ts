import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductState } from './state';

const getProductsState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(getProductsState, (state)=> {
  return state.products;
});

// export const getProductById = createSelector(getProductsState, (state:any, params_0:{id:any}) => {
//  state.products.find((product:any) => product.id === params_0.id)
// });

