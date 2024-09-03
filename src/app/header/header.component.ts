import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
  
    <header>
      <h1 class="mb-3">Our Products</h1>
      <h3>
        <em>
          Get -50% to all clothing with our promo code [DISC001]!
        </em>
      </h3>
      <small>Mini Angular Http project using the <a href="https://fakestoreapi.com/" target="_blank">Fake Store</a> products API.</small>
    </header>
  
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
