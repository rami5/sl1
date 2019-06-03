import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Shoping } from "../../shoping.model";
import { ShopingsService } from "../../shoping.service";

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  shopings: Shoping[] = [];
  private shopingsSub: Subscription;

  constructor(public shopingService: ShopingsService) {}

  ngOnInit() {
    this.shopingService.getShops();
    this.shopingsSub = this.shopingService.getShopUpdateListener()
      .subscribe((shopings: Shoping[]) => {
        this.shopings = shopings;
      });
  }

  onDelete(shopId: string) {
    this.shopingService.deletePost(shopId);
  }

  ngOnDestroy() {
    this.shopingsSub.unsubscribe();
  }
}

