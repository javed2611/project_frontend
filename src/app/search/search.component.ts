import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private route:Router){}
  ngOnInit(): void {
      
  }
  doSearch(value:string)
  {
    this.route.navigateByUrl(`/search/${value}`);
  }
}
