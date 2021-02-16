import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
	
  opened: boolean;
  

  constructor(public commService: CommonService) { }

  ngOnInit(): void {

    console.log("current_page", this.commService.current_page);
  }

  click_menu() {
  	this.opened = !this.opened;
  }

  // change_current_page(page) {
  //   this.current_page = page;
  // }

  

}
