import { Component, OnInit } from '@angular/core';
import {SclangBridgeService} from '@app/core/services/sclang-bridge.service'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {

  sclangReplies$: Observable<string>
  sclangStatus$: Observable<boolean>

  constructor( private sclang:SclangBridgeService) { }

  ngOnInit(): void {
    this.sclangReplies$ = this.sclang.replies$
    this.sclangStatus$ = this.sclang.status$
  }

  interpret(code:string){
    this.sclang.interpret(code)
  }



}
