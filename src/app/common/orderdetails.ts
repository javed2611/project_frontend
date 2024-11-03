export class Orderdetails {
    constructor(
        public orderTrackingNum:string,
        public orderStatus:string,
        public totalPrice:number,
        public quantity:number,
        public createDate:Date,
        public deilveryDate:Date
    ){}
}


// private String orderTrackingNum;
// 	private String orderStatus;
// 	private double totalPrice;
// 	private int quantity;