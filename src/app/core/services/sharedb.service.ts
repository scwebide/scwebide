import { Injectable } from '@angular/core';
import ReconnectingWebSocket  from  'reconnecting-websocket';
import * as ShareDb from 'sharedb/lib/client'
import {ReplaySubject, bindCallback} from 'rxjs'
import {map} from 'rxjs/operators'
import  SharedbAceBinding from 'sharedb-ace/distribution/sharedb-ace-binding'
import SharedbAceMultipleCursors from '@app/../../sharedb-ace-multiple-cursors/distribution/client';

const shareDbAddr = `ws://${window.location.host}`

SharedbAceBinding.prototype.setInitialValue = function(){
    this.suppress = true;
    this.session.setValue(this.doc.data);
    this.suppress = false;
}

@Injectable({
  providedIn: 'root'
})
export class SharedbService {

  socket:any;
  connection:ShareDb.Connection;
  status$ = new ReplaySubject<boolean>(1);
  path: any;

  constructor() {
  }

  connect(editor, path=[]){
    const status$ = new ReplaySubject<boolean>(1);
    this.path = path; // unused, it's for multiple docs
    this.socket = new ReconnectingWebSocket(shareDbAddr);
    this.connection = new ShareDb.Connection(this.socket);

    this.socket.onopen(()=>status$.next(true));
    this.socket.onclose(()=>status$.next(false));
    this.socket.onerror((e)=>{console.warn("socket error",e);status$.next(false)});

    //console.log("CONNECTION",this.connection)
    const doc = this.connection.get('examples','textarea');
    const thisService = this;
    return bindCallback(doc.subscribe.bind(doc))().pipe(
      map(err=>{
        if(err) throw err;
        const pluginSocket = new ReconnectingWebSocket(shareDbAddr + '/cursor');
        const binding = thisService.getBinding(editor,doc,[],pluginSocket);
        return {binding,status$}
      })
    )
  }

  getBinding(editor, doc, path:string[]=[], socket: any){
    console.log(doc.data);
    return new SharedbAceBinding({
      ace:editor,
      doc: doc,
      path,
      plugins: [SharedbAceMultipleCursors],
      pluginWS: socket,
      //id: this.id,
    });
    //this.connections[path.join('-')] = binding;
  }

}
