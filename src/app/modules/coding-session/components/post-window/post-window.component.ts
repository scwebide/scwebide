import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {Observable, merge, Subject} from 'rxjs'
import {scan, tap} from 'rxjs/operators'

import {SclangBridgeService} from '@app/core/services/sclang-bridge.service'

@Component({
  selector: 'app-post-window',
  templateUrl: './post-window.component.html',
  styleUrls: ['./post-window.component.scss']
})
export class PostWindowComponent implements OnInit, AfterViewChecked {

  accumulated: Observable<string>
  reset$ = new Subject<string>()

  @ViewChild('pre',{static:false}) preElement: ElementRef;

  constructor(private sclang:SclangBridgeService) { }

  scrollToBottom(){
    if(this.preElement)
    this.preElement.nativeElement.scrollTop = this.preElement.nativeElement.scrollHeight

  }

  ngOnInit(): void {
    this.accumulated =  merge(this.reset$,this.sclang.replies$).pipe(
      scan((tot,val)=>val=='\x0C' ? '' : tot+val,''),
      tap(_=>this.scrollToBottom())
    )
  }

  ngAfterViewChecked(){
    this.scrollToBottom()
  }

  clear(){
    this.reset$.next('\x0C')
  }

}
