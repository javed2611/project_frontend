import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductResponse } from '../common/product-response';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css'
})
export class ViewproductComponent implements OnInit {
orderId:number = 0;
oId :string='';
products:ProductResponse[] =[];
constructor(
  private route : ActivatedRoute,
  public dashboardService:DashboardServiceService,
  private router :Router
){}
ngOnInit(): void {
   this.oId = this.route.snapshot.paramMap.get('orderId')!;
   this.fetchProducts(this.oId);
}
fetchProducts(oId:string)
{
  const id = Number(oId);
  this.dashboardService.fetchProductData(id)
  .subscribe((data:ProductResponse[])=>{
    this.products=data;
});
}
backDashboard(){
  this.router.navigateByUrl('/filterOrders');
}

}
