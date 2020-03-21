import { Injectable } from '@angular/core';
import ReconnectingWebSocket  from  'reconnecting-websocket';
import * as ShareDb from 'sharedb/lib/client'
import {ReplaySubject, bindCallback} from 'rxjs'
import {map} from 'rxjs/operators'
import  SharedbAceBinding from 'sharedb-ace/distribution/sharedb-ace-binding'
//import {SharedbAceMultipleCursorsClient} from '@elgiano/sharedb-ace-multiple-cursors/dist/client';
import {SharedbAceMultipleCursorsClient} from '@app/../../../sharedb-ace-multiple-cursors/src/client';

const shareDbAddr = location.origin.replace(/^http/, 'ws').replace(/:\d+$/,'')

SharedbAceBinding.prototype.setInitialValue = function(){
    this.suppress = true;
    this.session.setValue(this.doc.data);
    this.suppress = false;
}
SharedbAceBinding.prototype.unlisten = function(){
    this.session.removeListener('change', this.$onLocalChange);
    this.doc.on('op', this.$onRemoteChange);
    this.sharedbBinding.pluginWS.close();
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

  connect(editor, path=[], userName=""){
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
        const binding = thisService.getBinding(editor,doc,[],pluginSocket,userName);
        return {binding,status$}
      })
    )
  }

  getBinding(editor, doc, path:string[]=[], socket: any, userName:string){
    return new SharedbAceBinding({
      ace:editor,
      doc: doc,
      path,
      plugins: [(s,e)=> new SharedbAceMultipleCursorsClient(s,e,userName)],
      pluginWS: socket,
      //id: this.id,
    });
    //this.connections[path.join('-')] = binding;
  }

}
