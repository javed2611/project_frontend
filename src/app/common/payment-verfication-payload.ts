export class PaymentVerficationPayload {
    constructor(
        public razorpayOrderId:string,
        public razorpayPaymentId:string,
        public razorpaySignature:string
    ){}
}


// private String razorpayOrderId;
// 	private String razorpayPaymentId;
// 	private String razorpaySignature;