import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-post-window',
  templateUrl: './post-window.component.html',
  styleUrls: ['./post-window.component.scss']
})
export class PostWindowComponent implements OnInit, AfterViewChecked {

  @Input() text: string;

  @ViewChild('pre',{static:false}) preElement: ElementRef;

  constructor() { }

  ngAfterViewChecked() {
        this.scrollToBottom();
  }

  scrollToBottom(){
    if(this.preElement)
    this.preElement.nativeElement.scrollTop = this.preElement.nativeElement.scrollHeight

  }

  ngOnInit(): void {
  }

}
