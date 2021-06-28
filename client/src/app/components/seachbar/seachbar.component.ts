import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-seachbar',
  templateUrl: './seachbar.component.html',
  styleUrls: ['./seachbar.component.scss']
})

export class SeachbarComponent implements OnInit {

  searchText:string = '';
 
  @Input() placeText:string;
  
  @Output() onSearchName: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(){
    this.onSearchName.emit(this.searchText);
  }
}
