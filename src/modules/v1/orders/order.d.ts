type orderType = {
    orderId: string;
    totalPrice: number;
    orderDate : Date | null;
    products?: {
        productId: string;
        quantity: number;
        price: number;
        totalPrice : number;
    }[]
    deletedAt : Date | null
}