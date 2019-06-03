const express = require("express");

//const Post = require("../models/post");
const Shop = require("../models/shop");

const router = express.Router();

router.post("", (req, res, next) => {
  const shop = new Shop({
    parit: req.body.title,
    number: req.body.content
  });
  shop.save().then(createdShop => {
    res.status(201).json({
      message: "Shop added successfully",
      shopId: createdShop._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const shop = new Shop({
    _id: req.body.id,
    parit: req.body.parit,
    number: req.body.number
  });
  Shop.updateOne({ _id: req.params.id }, shop).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Shop.find().then(documents => {
    res.status(200).json({
      message: "Shops fetched successfully!",
      shops: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Shop.findById(req.params.id).then(shop => {
    if (shop) {
      res.status(200).json(shop);
    } else {
      res.status(404).json({ message: "Shop not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Shop.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Shop deleted!" });
  });
});

module.exports = router;
