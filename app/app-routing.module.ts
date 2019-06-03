import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShopingListComponent } from "./shopes/shoping-list/shoping-list.component";
import { ShopingCreateComponent } from "./shopes/shoping-create/shoping-create.component";

const routes: Routes = [
  { path: '', component: ShopingListComponent },
  { path: 'create', component: ShopingCreateComponent },
  { path: 'edit/:postId', component: ShopingCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
