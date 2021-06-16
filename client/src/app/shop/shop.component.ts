import { Component, OnInit } from '@angular/core';
import { IBrand } from '../models/brand';
import { IPagination } from '../models/pagination';
import { IProduct } from '../models/product';
import { IType } from '../models/productType';
import { ShopParams } from '../models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  types: IType[] | undefined;
  shopParams = new ShopParams();
  totalCount!: number;
  sortOptions = [
    {name: 'Alphabetical', value:'name'},
    {name: 'Price: Low to High', value:'priceAsc'},
    {name: 'Price: High to Low', value:'priceDesc'},
  ]


  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {   
    this.shopService.getProducts(this.shopParams).subscribe(response=> {      
      this.products = response?.data;
      this.shopParams.pageNumber = response?.pageIndex;
      this.shopParams.pageSize = response?.pageSize;
      this.totalCount = 20;

    }, error => {
      console.log(error);
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe(response => {      
      this.brands = [{id:0, name:'All'}, ...response]; //... is spread operator
    }, error => {
      console.log(error);
    });
  }

  getTypes() : void{
    this.shopService.getBrands().subscribe(response => {
      this.types = [{id:0, name:'All'}, ...response]; //... is spread operator
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId:number){    
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }

}
