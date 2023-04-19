export interface signup{
    name : string;
    email : string;
    phone : number;
    password : string,
    Cpassword : string
}

export interface login{
    email : string;
    password : string
}


export interface product{
    title : string;
    description : string;
    price : number;
    discountPercentage : number;
    rating : number;
    stock : number;
    brand : string;
    category : string;
    thumbnail : string
}