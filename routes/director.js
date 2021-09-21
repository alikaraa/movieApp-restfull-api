const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Director = require("../models/Director");

//Director Get
router.get("/", (req, res) => {
  const promise = Director.find({});
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Director Post
router.post("/", (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/", (req, res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: "movies", //director tablosu nereyle join edilicegini yazdik
        localField: "_id", //director tablosunda neyle eslestirceksin id ile
        foreignField: "director_id", //movies collection da neyle eslesicek
        as: "movies",
      },
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true, //filmi olmayan yonetmenleride gosteriir
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio",
        },
        movies: {
          $push: "$movies",
        },
      },
    },
  ]);
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:director_id", (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id),
      },
    },
    {
      $lookup: {
        from: "movies", //director tablosu nereyle join edilicegini yazdik
        localField: "_id", //director tablosunda neyle eslestirceksin id ile
        foreignField: "director_id", //movies collection da neyle eslesicek
        as: "movies",
      },
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true, //filmi olmayan yonetmenleride gosteriir
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio",
        },
        movies: {
          $push: "$movies",
        },
      },
    },
  ]);
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true,
  });

  promise
    .then((director) => {
      if (!director) next({ message: "The movie was not found", code: 99 });

      res.json(director);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise
    .then((director) => {
      if (!director) next({ message: "The movie was not found", code: 99 });

      res.json(status);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
