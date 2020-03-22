import { Component, OnInit, Input } from '@angular/core';
import * as stringToColor from 'string-to-color'
import {UserService} from '@app/core/services/user.service'
import {ReplaySubject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() users:string[];
  destroyed$ = new ReplaySubject<boolean>(1);
  thisUsername:string;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.name$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(name=>
      this.thisUsername = name
    )
  }

  getColor(username:string){
    return stringToColor(username)
  }

  changeUserName(){
    const name = window.prompt("Change your name", this.thisUsername);
    if(this.thisUsername != name){
      this.userService.removeUser(this.thisUsername);
      this.userService.name = name
    }
  }

}
