import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodingSessionComponent } from './coding-session.component';

const routes: Routes = [{ path: '', component: CodingSessionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingSessionRoutingModule { }
