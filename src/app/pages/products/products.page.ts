import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  activePage: 'import' | 'productsList';

  constructor() { 
    this.activePage = 'import';
    // this.activePage = 'productsList';
  }

  ngOnInit() {
  }

  changeSection(selectedSection: 'import' | 'productsList') {
    this.activePage = selectedSection;
  }

}
