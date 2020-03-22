import { Injectable, OnDestroy } from '@angular/core';
import ReconnectingWebSocket  from  'reconnecting-websocket';
import {ReplaySubject} from 'rxjs'

const sclangBridgeAddr = "ws://localhost:57190"

@Injectable({
  providedIn: 'root'
})
export class SclangBridgeService implements OnDestroy {

  socket: ReconnectingWebSocket
  status$ = new ReplaySubject<boolean>(1);
  replies$ = new ReplaySubject<string>(1);

  constructor() {
    this.socket = new ReconnectingWebSocket(sclangBridgeAddr);
    this.socket.onopen = ()=>this.status$.next(true);
    this.socket.onclose = ()=>this.status$.next(false);
    this.socket.onerror = (e)=>{
      console.warn("sclang-bridge socket",e.message || e);
      this.status$.next(false)
    };

    this.socket.onmessage = (e)=>{
      /*console.log("from bridge",e.data);*/
      this.replies$.next(e.data)
    }
  }

  interpret(msg:string) {
    this.socket.send(msg)
  }

  ngOnDestroy(){
    this.socket.close(0)
  }
}
