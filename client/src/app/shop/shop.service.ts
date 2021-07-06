import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../models/brand';
import { IPagination } from '../models/pagination';
import { IType } from '../models/productType';
import {map,delay} from 'rxjs/operators';
import { ShopParams } from '../models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api";

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    
    let params = new HttpParams();

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    if(shopParams.brandId != 0){  
      console.log(shopParams.brandId)    ;
      params = params.append('brandId', shopParams.brandId.toString());
    }
    

    if(shopParams.typeId !=0){      
      params = params.append('typeId', shopParams.typeId.toString());
    }
    
    params = params.append('sort', shopParams.sort);

    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

   
       
    console.log('Param list is ' + params.keys());

    //return this.http.get<IPagination>(this.baseUrl  + 'products', {'headers': headers}) 
    //return this.http.get<IPagination>(this.baseUrl  + 'products', {observe: 'response', params}) 
    return this.http.get<IPagination>(this.baseUrl + '/products', {observe: 'response', params}) 
    .pipe(     
      map(response => {
        return response.body;
      })
    );    
  }

  getBrands(){
    //return this.http.get<IBrand[]>(this.baseUrl  + 'products/brands');    
    return this.http.get<IBrand[]>(this.baseUrl +'/products/brands');  
  }

  getTypes(){
    //return this.http.get<IType[]>(this.baseUrl  + 'products/types');    
    return this.http.get<IType[]>(this.baseUrl +'/products/types');    
  }
}
