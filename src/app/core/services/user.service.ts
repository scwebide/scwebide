import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  name$ = new ReplaySubject<string>(1)
  users: string[] = []
  users$ = new ReplaySubject<string[]>(1)

  constructor() {
    this.name$.next(window.localStorage.getItem('username'))
  }

  set name(name:string){
    window.localStorage.setItem('username',name);
    this.name$.next(name)
  }

  addUser(name:string){
    if(this.users.includes(name)) return
    this.users = [...this.users,name]
    this.users$.next(this.users)
  }
  removeUser(name:string){
    if(!this.users.includes(name)) return
    this.users = this.users.filter(u=>u!=name)
    this.users$.next(this.users)
  }

}
