import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

interface ShortButton {
  name:string;
  category?:string;
}

interface Product {
  id:number;
  title:string;
  image:string;
  price:number;
  description:string;
  category:string;
  rating:Rating;
}

interface Rating {
  rate:number;
  count:number;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DecimalPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit():void {
    this.fetching = true;
    this.http
      .get<Product[]>(this.products_url)
      .subscribe({
        next: (products:any[]) => this.products = products,
        error: error => console.error('Error:', error),
        complete: () => this.fetching = false
      });
  }

  products_url:string = 'https://fakestoreapi.com/products';
  fetching:boolean = false;
  products:Product[] = [];
  selectedCategory: string = '';
 
  shortList(category: string): Product[] {
    this.selectedCategory = category;
    if (!category)
      return this.products;
    return this.products.filter(product => product.category === category);
  }

  shortButtons:ShortButton[] = [
    {
      name: 'Show All',
    },
    {
      name: 'Men Clothing',
      category: `men's clothing`
    },
    {
      name: 'Jewelery',
      category: 'jewelery'
    },
    {
      name: 'Electronics',
      category: 'electronics'
    },
    {
      name: 'Women Clothing',
      category: `women's clothing`
    }
  ];

}
