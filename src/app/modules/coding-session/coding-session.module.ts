import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CodingSessionComponent } from './coding-session.component';

import { AceModule } from 'ngx-ace-wrapper';

const routes:Routes = [
  {
    path: '',
    component: CodingSessionComponent
  }
]

@NgModule({
  declarations: [CodingSessionComponent],
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
