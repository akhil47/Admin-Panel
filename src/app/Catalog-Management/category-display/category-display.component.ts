import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {

  category = {
    'name': 'Clothing',
    'status': "Active",
    'sub-categories': [
      'Casual Shirts',
      'T-Shirts',
      'Jeans',
      'Causal Trousers'
    ]
  }

  constructor(private router: Router) {
    
  }

  ngOnInit() {}

  onEditDetails(){
    this.router.navigate(['/category/' + this.category.name + '/edit'])
    // Brand Edit page must fetch brand object from a service based on brand 'name' in URL
  }

}
