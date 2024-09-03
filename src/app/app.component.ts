import { 
  Component, 
  inject, 
  OnInit 
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { 
  type Product, 
  type ShortButton 
} from './shared/interfaces';
import { ProductComponent } from './product/product.component';
import { TitleCasePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    TitleCasePipe,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.fetching = true;
    this.http
      .get<Product[]>(this.products_url)
      .subscribe(
        {
          next: ( products: Product[] ) => this.products = products,
          error: error => console.error('Error:', error),
          complete: () => this.fetching = false
        }
      );
  }

  private products_url: string = 'https://fakestoreapi.com/products';
  fetching: boolean = false;
  products: Product[] = [];
  selectedCategory: string = '';
 
  shortList( category: string ): Product[]
  {

    this.selectedCategory = category;

    if (!category)
      return this.products;

    return this.products.filter(
      product => product.category === category
    );
  }

  shortButtons: ShortButton[] = [
    {
      name: 'Show All',
      category: ''
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
