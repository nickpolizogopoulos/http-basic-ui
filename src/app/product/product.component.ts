import { 
    Component,
    input,
    Input
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ShortenPipe } from './shorten.pipe';
import { type Product } from '../shared/interfaces';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        DecimalPipe,
        ShortenPipe
    ],
    template: `


        <section class="card">
            
            <div class="mb-5">
                <h5>{{product.title}}</h5>
                <hr>
                @if (!isExpanded) {
                    <small>{{ product.description | shorten: descriptionLength }}

                        <!-- Some descriptions are smaller than the desctiptionLength.
                             In this case a "read more" button will be useless 
                             since there's no more text that has to get expanded -->
                        @if (product.description.length > descriptionLength) { 
                            <button (click)="onExpand()" [class.bg-grey]="isExpanded" class="btn-expand">read more</button>
                        }

                    </small>
                }
                @else {
                    <small>{{ product.description }}
                        <button (click)="onExpand()" [class.bg-grey]="isExpanded" class="btn-expand">read less</button>
                    </small>
                }
            </div>

            <div class="row">
                <div class="col">
                    <img src="{{product.image}}">
                </div>
                <div class="col">
                    <div class="mb-4">
                        <span class="category">Category: {{product.category}}</span>
                        <p class="id">Product code: {{product.id}}</p>
                    </div>
                    @if (product.category === menClothing || product.category ===  womenClothing) {
                        <h4>-50% discount!</h4>
                    }
                    <p>
                        @if (product.category === menClothing || product.category ===  womenClothing) {
                            <span class="text-success">Only: </span>
                        }
                        <span 
                            [class.green-underline]="product.category === menClothing || product.category ===  womenClothing"
                        >
                            {{ product.price / 2 | number:'1.2-2' }}</span> €

                        @if (product.category === menClothing || product.category ===  womenClothing) {
                            from <span class="text-danger" style="text-decoration: line-through;">{{ product.price }} €</span>
                        }
                    </p>
                    <div class="mt-3">
                        <button class="btn btn-sm btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-dash" viewBox="0 1 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                            </svg>
                        </button>
                        <button class="btn btn-sm btn-warning">Add to cart</button>
                        <button class="btn btn-sm btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus" viewBox="0 1 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </section>

    `,
    styleUrl: './product.component.scss',
})
export class ProductComponent {

    @Input({required: true}) product!: Product;

    menClothing: string = `men's clothing`;
    womenClothing: string = `women's clothing`;

    descriptionLength: number = 170;
    isExpanded: boolean = false;

    onExpand(): void {
        this.isExpanded = !this.isExpanded;
    }

}
