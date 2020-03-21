import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {Observable} from 'rxjs'
import {scan, tap} from 'rxjs/operators'

import {SclangBridgeService} from '@app/core/services/sclang-bridge.service'

@Component({
  selector: 'app-post-window',
  templateUrl: './post-window.component.html',
  styleUrls: ['./post-window.component.scss']
})
export class PostWindowComponent implements OnInit, AfterViewChecked {

  accumulated: Observable<string>

  @ViewChild('pre',{static:false}) preElement: ElementRef;

  constructor(private sclang:SclangBridgeService) { }

  scrollToBottom(){
    if(this.preElement)
    this.preElement.nativeElement.scrollTop = this.preElement.nativeElement.scrollHeight

  }

  ngOnInit(): void {
    this.accumulated =  this.sclang.replies$.pipe(
      scan((tot,val)=>tot+val,''),
      tap(_=>this.scrollToBottom())
    )
  }

  ngAfterViewChecked(){
    this.scrollToBottom()
  }

}
