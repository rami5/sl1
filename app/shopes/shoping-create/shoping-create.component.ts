import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { ShopingsService } from "../../shoping.service";
import { Shoping } from "../../shoping.model";

@Component({
  selector: 'app-shoping-create',
  templateUrl: './shoping-create.component.html',
  styleUrls: ['./shoping-create.component.css']
})
export class ShopingCreateComponent implements OnInit {
  enteredPrit = "";
  enteredNumber = "";
  shoping: Shoping;
  private mode = "create";
  private shopingId: string;

  constructor(
    public shopingService: ShopingsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("shopId")) {
        this.mode = "edit";
        this.shopingId = paramMap.get("shopingId");
        this.shoping = this.shopingService.getShop(this.shopingId);
      } else {
        this.mode = "create";
        this.shopingId = null;
      }
    });
  }

  onSaveShop(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
    //public shopingService: ShopingsService,
    this.shopingService.addShop(form.value.parit, form.value.number);
    } else {
      this.shopingService.updateShop(
        this.shopingId,
        form.value.parit,
        form.value.number
      );
    }
    form.resetForm();
  }
}

