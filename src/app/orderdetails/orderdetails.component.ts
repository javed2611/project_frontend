import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderdetailsService } from '../services/orderdetails.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Orderdetails } from '../common/orderdetails';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent implements OnInit{
constructor(private orderService:OrderdetailsService,private route:ActivatedRoute)
{}
orderDetails:Orderdetails[] = [];
  ngOnInit(): void {
      const email :string = this.route.snapshot.paramMap.get('email')!;
      this.fetchOrderDetails(email);
  }

  fetchOrderDetails(email:string)
  {
    this.orderService.findOrdersByEmail(email).subscribe((data:Orderdetails[]) =>{
      this.orderDetails = data;
    });
  }
}
