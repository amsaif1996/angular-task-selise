import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookmarkManagerComponent} from "./components/bookmark-manager/bookmark-manager.component";

const routes: Routes = [
  {path: 'bookmarkManager',component:BookmarkManagerComponent},
  { path: '', redirectTo: 'bookmarkManager', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
