import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, tap, map, first, switchMap} from 'rxjs/operators'
import * as firebase from 'firebase/app'
const timestamp = firebase.firestore.FieldValue.serverTimestamp()
/*import Quill from 'quill'
import { Delta } from 'quill-delta'
const Delta = Quill.import('delta');*/

@Injectable({
  providedIn: 'root'
})
export class CodingSessionService {

  constructor(private afs: AngularFirestore) { }

  /*load(sessionId:string){
    return this.afs.collection(`/code-sessions/${sessionId}/deltas`, ref=>ref.orderBy('timestamp'))
    .valueChanges()
    .pipe(
      first()
    )
  }

  watch(sessionId:string){
    return this.afs.collection(`/code-sessions/${sessionId}/deltas`, ref=>ref.orderBy('timestamp'))
    .stateChanges(['added'])
    .pipe(
      map(added=>added.map(a=>a.payload.doc.data()))
    )
  }

  watchAll(sessionId:string){
    return this.afs.collection(`/code-sessions/${sessionId}/deltas`, ref=>ref.orderBy('timestamp'))
    .valueChanges()
    .pipe(
      filter(v=>v.length>0),
      // compose deltas
      map(([first,...deltas]:Delta[])=>deltas.reduce((final:Delta,current)=>final.compose(current), new Delta({ops:first.ops}))),

    )
  }

  update(sessionId:string,delta:Delta){
    console.log("updating firebase", delta);
    return this.afs.collection<Delta>(`/code-sessions/${sessionId}/deltas`).add(Object.assign({timestamp:timestamp},delta))
  }*/
}
