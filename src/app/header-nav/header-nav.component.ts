import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';


import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonService } from '../common.service';



@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(public sidenav: SideNavComponent, private router: Router, public commService: CommonService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  // Created by Mari 13-02-2021 to toggle hamburger menu
  menu_click() {
  	this.sidenav.click_menu();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  redirect(item){
    console.log("item", item);
    this.router.navigate(['./'+item]);
    this.commService.current_page = item;

  }

}
