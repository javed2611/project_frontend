import { Address } from "./address";
import { CustomerResponse } from "./customer-response";

export class OrderResponse {
    orderTrackingNum: string = '';
    email: string = '';
    id: number = 0;
    createDate: string = '';
    orderStatus: string = '';
    totalPrice: number = 0;
    quantity: number = 0;
    razorPayPaymentId: string = '';
    updateDate: string = '';
    address!: Address;
    customer!: CustomerResponse;
}
