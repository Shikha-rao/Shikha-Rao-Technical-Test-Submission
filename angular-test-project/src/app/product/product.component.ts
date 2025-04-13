import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';

export interface PeriodicElement {
  name: string;
  id: number;
  price: number;
  category:string;
  createdAt:string;
  updatedAt:string;
  CategoryId:number;
  UserId:number;
  Category:number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'iPhone 15', price: 999.99,category:'Electronics',createdAt:"2025-04-13T08:52:45.462Z",updatedAt:"2025-04-13T08:52:45.462Z",CategoryId:1,UserId:1,Category:1},
  {id: 2, name: 'MacBook Pro', price: 1999.99,category:'Electronics tablet',createdAt:"2025-04-13T08:52:45.462Z",updatedAt:"2025-04-13T08:52:45.462Z",CategoryId:2,UserId:2,Category:2},

];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  displayedColumns: string[] = ['id', 'name', 'price','category','createdAt','updatedAt','CategoryId','UserId','Category'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  products: any;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products loaded:', this.products);
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
