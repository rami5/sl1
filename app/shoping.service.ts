import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Shoping } from "./shoping.model";

@Injectable({ providedIn: "root" })
export class ShopingsService {
  private shopings: Shoping[] = [];
  private shopingsUpdated = new Subject<Shoping[]>();

  constructor(private http: HttpClient) {}

  getShops() {
    this.http
      .get<{ message: string; shopings: any }>("http://localhost:3000/api/shops")//3000
      .pipe(
        map(shopData => {
          return shopData.shopings.map(shop => {
            return {
              parit: shop.title,
              content: shop.content,
              id: shop._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.shopings = transformedPosts;
        this.shopingsUpdated.next([...this.shopings]);
      });
  }
  getShopUpdateListener() {
    return this.shopingsUpdated.asObservable();
  }

  getShop(id: string) {
    return { ...this.shopings.find(s => s.id === id) };
  }

  addShop(parit: string, number: number) {
    const shop: Shoping = { id: null, parit: parit, number: number };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/shops",
        shop
      )
      .subscribe(responseData => {
        const id = responseData.postId;
        shop.id = id;
        this.shopings.push(shop);
        this.shopingsUpdated.next([...this.shopings]);
      });
  }

  updateShop(id: string, parit: string, number: number) {
    const shop: Shoping = { id: id, parit: parit, number: number };
    this.http
      .put("http://localhost:3000/api/shops/" + id, shop)
      .subscribe(response => console.log(response));
  }

  deletePost(shopId: string) {
    this.http
      .delete("http://localhost:3000/api/shops/" + shopId)
      .subscribe(() => {
        const updatedPosts = this.shopings.filter(shop => shop.id !== shopId);
        this.shopings = updatedPosts;
        this.shopingsUpdated.next([...this.shopings]);
      });
  }
}
