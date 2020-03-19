import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedbService } from '@app/core/services/sharedb.service'
import { Subject, ReplaySubject, Observable} from 'rxjs'
import {takeUntil, bufferTime, filter, map, debounceTime } from 'rxjs/operators'

/*import Quill from 'quill'
import { Delta } from 'quill-delta'
const Delta = Quill.import('delta');
import supercollider from '../../../assets/highlightjs-supercollider';

declare const hljs: any;
hljs.registerLanguage('supercollider', supercollider);*/

import 'brace';

import 'brace/mode/text';
import 'brace/theme/github';

import 'brace/theme/tomorrow_night';
import 'brace/mode/javascript';
import '@app/../assets/ace-mode-sc';

import { AfterViewInit, ViewChild } from '@angular/core';

import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';


@Component({
  selector: 'app-coding-session',
  templateUrl: './coding-session.component.html',
  styleUrls: ['./coding-session.component.scss']
})
export class CodingSessionComponent implements OnInit, AfterViewInit {

  latestState: any;

  sessionId:string;
  userId: string;

  destroyed$ = new ReplaySubject<boolean>(1)
  //localUpdates$ = new Subject<Delta>();

  editor: any;
  initialized = false;

  remoteConfig = {
    DOMAIN_URL: 'http://localhost:8080/convergence/default',
    ANONYMOUS_LOGIN: true,
    DEBUG: true
  };

  /*quillModules = {
    toolbar: false,
    syntax: true,
  };*/
  config: AceConfigInterface = {
    mode: 'supercollider',
    theme: 'tomorrow_night',
    readOnly : false,
    fontSize: "1em"
  };

  doc = ''
  ace:any;
  sharedbBinding: any;
  sharedbStatus$: Observable<boolean>;

  @ViewChild(AceComponent,{static:false}) componentRef?: AceComponent;

  ngAfterViewInit(): void {
   // To get the Ace instance:

   this.ace = this.componentRef.directiveRef.ace();
   this.sharedbService.connect(this.ace).pipe(
     takeUntil(this.destroyed$),
   ).subscribe(({binding,status$})=>{
     this.sharedbBinding = binding;
     this.sharedbStatus$ = status$;
   })
  }


  constructor(
    private sharedbService:SharedbService
  ) { }

  ngOnInit(){

  }

  ngOnDestroy(){
    if(this.sharedbBinding){
      this.sharedbBinding.unlisten()
    }
  }

  changed([change,editor]){/*console.log(change)*/}

  /*ngOnInit() {
    this.sessionId = 'default';
    this.userId = Math.random().toString(36);
    this.codingSessionService.load(this.sessionId).subscribe(deltas=>{
      deltas.forEach((delta:Delta)=>this.updateContents(delta));
      this.initialized = true;
      this.watchAll();
      this.watch();
      this.startUpdating();
    });
  }

  watch(){
    this.codingSessionService.watch(this.sessionId).pipe(
      takeUntil(this.destroyed$),
    )
    .subscribe(([delta]:Delta[])=>{
      console.log("got delta", delta)
      if(delta.user != this.userId) this.updateContents(delta)
    })
  }

  watchAll(){

    const latestStateWatcher$ = this.codingSessionService.watchAll(this.sessionId)
      .pipe( takeUntil(this.destroyed$) )

    latestStateWatcher$.subscribe((delta:Delta)=>{
        console.log("got combined delta", delta)
        this.latestState = delta;
    })

    combineLatest([this.localUpdates$,latestStateWatcher$]).pipe(
      takeUntil(this.destroyed$),
      debounceTime(1000)
    ).subscribe(_=>this.checkLatestState());
  }

  checkLatestState(){
    if(!this.latestState) return

    console.log(this.latestState)
    const state = this.latestState;
    state.ops = [
      {insert: ' '},
      {attributes:{'code-block':true}, insert:""},
      ...state.ops
    ]
    console.log("SETTING CONTENT")
    //this.editor.setContents(state)
  }

  startUpdating(){
    this.localUpdates$.pipe(
      takeUntil(this.destroyed$),
      bufferTime(1000),
      filter(v=>v.length>0),
      // compose deltas
      map(([first, ...deltas]:Delta[])=>deltas.reduce((final,current)=>final.compose(current),first)),
    )
    .subscribe(delta=>{
      // add userid
      delta = Object.assign(delta,{user:this.userId})
      this.codingSessionService.update(this.sessionId,delta)
    })
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  contentChanged($event){
    if(!this.initialized || $event.source != 'user') return
    this.localUpdates$.next($event.delta)
    console.log(" CONTENT CH")

  }

  updateContents(newDelta){
    console.log("updating editor",this.editor.getContents())

    this.editor.updateContents(newDelta)
  }


  saveEditor(editor){
    this.editor = editor
  }

  ensurePre($event){
    console.log("ensure pre ", this.doc)
    const startI = this.doc.indexOf("<pre");
    if(startI != 0){
      this.doc = "<pre>" + this.doc ;
    }
    const endI = this.doc.lastIndexOf("</pre>");
    if(endI != this.doc.length - 6){
      this.doc =  this.doc + "</pre>"  ;

    }
  }*/

}
