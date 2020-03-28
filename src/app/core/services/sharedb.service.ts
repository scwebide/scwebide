import { Injectable } from '@angular/core';
import {UserService} from './user.service'
import ReconnectingWebSocket  from  'reconnecting-websocket';
import * as ShareDb from 'sharedb/lib/client'
import {ReplaySubject, bindCallback} from 'rxjs'
import {map} from 'rxjs/operators'
import  SharedbAceBinding from 'sharedb-ace/distribution/sharedb-ace-binding'
import {SharedbAceMultipleCursorsClient} from 'sharedb-ace-collab';
//import {SharedbAceMultipleCursorsClient} from '@app/../../../sharedb-ace-multiple-cursors/dist/client';

const shareDbAddr = location.origin.replace(/^http/, 'ws').replace(/:\d+$/,'')

SharedbAceBinding.prototype.setInitialValue = function(){
    this.suppress = true;
    this.session.setValue(this.doc.data);
    this.suppress = false;
}
SharedbAceBinding.prototype.unlisten = function(){
    this.session.removeListener('change', this.$onLocalChange);
    this.doc.removeListener('op', this.$onRemoteChange);
    this.pluginWS.close();
}

SharedbAceBinding.prototype.onRemoteChange = function(ops, source) {
    this.logger.log(`*remote*: fired ${Date.now()}`);
    const self = this;

    const opsPath = ops[0].p.slice(0, ops[0].p.length - 1).toString();
    this.logger.log(opsPath);
    if (source === self) {
      this.logger.log('*remote*: op origin is self; _skipping_');
      return;
    } else if (opsPath !== this.path.toString()) {
      this.logger.log('*remote*: not from my path; _skipping_');
      return;
    }

    const deltas = this.opTransform(ops);
    this.logger.log(`*remote*: op received: ${JSON.stringify(ops)}`);
    this.logger.log(`*remote*: transformed delta: ${JSON.stringify(deltas)}`);

    self.suppress = true;
    // store cursor's previous position
    const cursorPos = this.editor.getCursorPosition();
    // apply changes
    self.session.getDocument().applyDeltas(deltas);
    // restore cursor's previous position
    this.editor.moveCursorTo(cursorPos.row,cursorPos.column);

    self.suppress = false;

    this.logger.log('*remote*: session value');
    this.logger.log(JSON.stringify(this.session.getValue()));
    this.logger.log('*remote*: delta applied');

}


@Injectable({
  providedIn: 'root'
})
export class SharedbService {

  socket:any;
  connection:ShareDb.Connection;
  status$ = new ReplaySubject<boolean>(1);
  path: any;

  constructor(private userService:UserService) {
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
        thisService.storeNewUsers(pluginSocket);
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

  storeNewUsers(socket){
    console.log("SOCK",socket)
    socket.addEventListener('message',(msg)=>{
      let data;
      try{
       data = JSON.parse(msg.data);
      }catch(e){
       return console.warn("json parse error",e)
      }

      if(data.id == 'newUser')
        return this.userService.addUser(data.userName)
      if(data.id == 'removeUser')
        return this.userService.removeUser(data.userName)

    });
  }

}
