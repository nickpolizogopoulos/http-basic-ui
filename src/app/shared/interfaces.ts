
export interface ShortButton {
    name:string;
    category?:string;
}

export interface Product {
    id:number;
    title:string;
    image:string;
    price:number;
    description:string;
    category:string;
    rating:Rating;
}

export interface Rating {
    rate:number;
    count:number;
}