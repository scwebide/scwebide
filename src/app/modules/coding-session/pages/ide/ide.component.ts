import { Component, OnInit, OnDestroy } from '@angular/core';
import {SclangBridgeService} from '@app/core/services/sclang-bridge.service'
import {UserService} from '@app/core/services/user.service'
import {Observable, ReplaySubject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit, OnDestroy {

  sclangReplies$: Observable<string>
  sclangStatus$: Observable<boolean>
  users$: Observable<string[]>
  destroyed$ = new ReplaySubject<boolean>(1);

  ready = false;
  showingUsers = false;

  constructor(
    private sclang:SclangBridgeService,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
    this.sclangStatus$ = this.sclang.status$

    this.userService.name$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(name=>{
        if(!name) return this.selectUserName()
        this.ready = true
    })

    this.users$ = this.userService.users$

  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  interpret(code:string){
    this.sclang.interpret(code)
  }

  selectUserName(){
    const name = window.prompt("Please select an username");
    this.userService.name = name
  }
}
