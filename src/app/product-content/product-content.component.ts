import { Component, OnInit, AfterViewInit, HostListener  } from '@angular/core';

export interface PeriodicElement {
  side_header: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {side_header: 'Header1', value: 'Text goes here...'},
  {side_header: "Header2", value: "Text goes here..."},
  {side_header: "Header3", value: "Text goes here..."},
  {side_header: "Header4", value: "Text goes here..."},
  {side_header: "Header5", value: "Text goes here..."},
  {side_header: "Header6", value: "Text goes here..."},
  {side_header: "Header7", value: "Text goes here..."},
];

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css']
})
export class ProductContentComponent implements OnInit {
  
  displayedColumns: string[] = ['side_header', 'value'];
  dataSource = ELEMENT_DATA;	
  public img;
  public lens;
  public result;
  public cx;
  public cy;
  public zoom_img = (<HTMLInputElement>document.getElementById("myresult"));
  public hover = "hover";
  constructor() { }

  ngOnInit(): void {
  	// this.imageZoom("myimage", "myresult");


  	  this.img = (<HTMLInputElement>document.getElementById("myimage"));
	  this.result = (<HTMLInputElement>document.getElementById("myresult"));
	  /*create lens:*/
	  this.lens = document.createElement("DIV");
	  this.lens.setAttribute("class", "img-zoom-lens");
	  /*insert lens:*/
	  this.img.parentElement.insertBefore(this.lens, this.img);
	  /*calculate the ratio between result DIV and lens:*/
	  this.cx = this.result.offsetWidth / this.lens.offsetWidth;
	  this.cy = this.result.offsetHeight / this.lens.offsetHeight;
	  /*set background properties for the result DIV:*/
	  this.result.style.backgroundImage = "url('" + this.img.src + "')";
	  this.result.style.backgroundSize = (this.img.width * this.cx) + "px " + (this.img.height * this.cy) + "px";
	  /*execute a function when someone moves the cursor over the image, or the lens:*/
	  this.lens.addEventListener("mousemove", this.moveLens( '$event', this.lens, this.img));
	  this.img.addEventListener("mousemove", this.moveLens( '$event', this.lens, this.img));
	  /*and also for touch screens:*/
	  this.lens.addEventListener("touchmove", this.moveLens( '$event', this.lens, this.img));
	  this.img.addEventListener("touchmove", this.moveLens( '$event', this.lens, this.img));

  }

  ngAfterViewInit() {
  	(<HTMLInputElement>document.getElementById("myimage")).addEventListener('mousemove', this.moveLens.bind(this));
  }


  imageZoom(imgID, resultID) {
	  
	  this.img = (<HTMLInputElement>document.getElementById(imgID));
	  this.result = (<HTMLInputElement>document.getElementById(resultID));
	  /*create lens:*/
	  this.lens = document.createElement("DIV");
	  this.lens.setAttribute("class", "img-zoom-lens");
	  /*insert lens:*/
	  this.img.parentElement.insertBefore(this.lens, this.img);
	  /*calculate the ratio between result DIV and lens:*/
	  this.cx = this.result.offsetWidth / this.lens.offsetWidth;
	  this.cy = this.result.offsetHeight / this.lens.offsetHeight;
	  /*set background properties for the result DIV:*/
	  this.result.style.backgroundImage = "url('" + this.img.src + "')";
	  this.result.style.backgroundSize = (this.img.width * this.cx) + "px" + (this.img.height * this.cy) + "px";
	  /*execute a function when someone moves the cursor over the image, or the lens:*/
	  this.lens.addEventListener("mousemove", this.moveLens);
	  this.img.addEventListener("mousemove", this.moveLens);
	  /*and also for touch screens:*/
	  this.lens.addEventListener("touchmove", this.moveLens);
	  this.img.addEventListener("touchmove", this.moveLens);
  } 

  getCursorPos(e): any {
  	console.log("In", e);
    var a;
    var x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = this.img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }

  moveLens(e, lens, img ) {
  	console.log("event", e);
  	console.log("this.lens", this.lens);
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    // e.preventDefault();
    /*get the cursor's x and y positions:*/
    
    pos = this.getCursorPos(e);


    console.log("pos", pos);
    /*calculate the position of the lens:*/
    x = pos.x - (this.lens.offsetWidth / 2);
    y = pos.y - (this.lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    // if (x > this.img.width - this.lens.offsetWidth) {x = this.img.width - this.lens.offsetWidth;}
    // if (x < 0) {x = 0;}
    // if (y > this.img.height - this.lens.offsetHeight) {y = this.img.height - this.lens.offsetHeight;}
    // if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    this.lens.style.left = x + "px";
    this.lens.style.top = y + "px";
    /*display what the lens "sees":*/
    // this.result.style.backgroundPosition = "-" + (x * this.cx) + "px -" + (y * this.cy) + "px";
    this.result.style.backgroundPosition = "-" + (x * this.cx) + "px -" + (y * this.cy) + "px";
    console.log("this.lens.style.left", this.lens.style.left);
    console.log("this.lens.style.top", this.lens.style.top);
    console.log("this.result.style.backgroundPosition", this.result.style.backgroundPosition);
  }

  
  

}
