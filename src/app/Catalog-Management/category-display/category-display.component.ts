import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/Modals/Product/category.modal';
import { CatalogService } from 'src/app/Services/catalog.service';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {

  category : Category

  constructor(private router: Router,
    private route: ActivatedRoute, private catalogService: CatalogService) {
    
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.category = this.catalogService.getCategory(params['name'])
    })
  }

  onEditDetails(){
    this.router.navigate(['/category/' + this.category.name + '/edit'])
    // Brand Edit page must fetch brand object from a service based on brand 'name' in URL
  }

}
