import { createReducer, on } from '@ngrx/store';
import { addProductSuccess, deleteProduct, loadProductsSuccess } from './state.actions';
import { initialState } from './state';

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  }),on(addProductSuccess,(state,action)=>{
    let product={...action.product}
    product.id=(state.products.length+1).toString()
    return {
        ...state,
        products:[...state.products,product]
    }
  }),on(deleteProduct,(state,action)=>{
    let updProducts=state.products.filter((product)=>product.id!==action.id)
    return {
        ...state,
        products:[...updProducts]
    }
  })
);

export function ProductReducer(state:any, action:any) {
  return _productReducer(state, action);
}