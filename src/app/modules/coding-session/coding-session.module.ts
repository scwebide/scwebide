import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CodingSessionComponent } from './coding-session.component';

import { AceModule } from 'ngx-ace-wrapper';
import { IdeComponent } from './pages/ide/ide.component';
import { PostWindowComponent } from './components/post-window/post-window.component';
import { ScKeybindingsDirective } from './components/sc-keybindings.directive';

const routes:Routes = [
  {
    path: '',
    component: IdeComponent
  }
]

@NgModule({
  declarations: [CodingSessionComponent, IdeComponent, PostWindowComponent, ScKeybindingsDirective],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AceModule
  ],
  exports: [
    RouterModule
  ]
})
export class CodingSessionModule { }
