const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { Outfits } = require("../../models");
const withAuth = require("../../utils/auth");
const app = express();
app.use("/upload", fileUpload(), router);

var cloudinary = require("cloudinary").v2;
var cloudinaryResult = undefined;

require("dotenv").config();

const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST NEW OUTFIT
router.post("/", withAuth, async (req, res) => {
  try {
    const {
      likes,
      outfitName,
      price,
      brand,
      location,
      occasion,
      colour,
      gender,
      notes,
      image,
      date_created,
    } = req.body;
    const payload = Object.assign(
      {
        user_id: req.session.user_id,
      },
      {
        likes,
        outfit_name: outfitName,
        price,
        brand,
        location,
        occasion,
        colour,
        gender,
        notes,
        image,
        date_created,
      }
    );
    const newOutfits = await Outfits.create(payload);

    res.status(200).json(newOutfits);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE AN OUTFIT BY ITS ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const {
      likes,
      outfitName,
      price,
      brand,
      location,
      occasion,
      colour,
      gender,
      notes,
      image,
    } = req.body;

    const payload = Object.assign(
      {
        user_id: req.session.user_id,
      },
      {
        likes,
        outfit_name: outfitName,
        price,
        brand,
        location,
        occasion,
        colour,
        gender,
        notes,
        image,
      }
    );

    console.log(payload);
    const editOutfits = await Outfits.update(payload);

    res.status(200).json(editOutfits);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET LIKES DATA
router.get("/:id/like", withAuth, async (req, res) => {
  try {
    const outfitId = req.params.id;

    const outfitExists = req.session.favouriteOutfits.includes(outfitId);

    if (!outfitExists) {
      req.session.favouriteOutfits = [
        ...req.session.favouriteOutfits,
        outfitId,
      ];
    }

    res.status(200).json({
      message: "successfully favourite outfitId " + outfitId,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

// DELETE AN OUTFIT BY ITS ID
router.delete("/:id", async (req, res) => {
  try {
    const outfitsData = await Outfits.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(outfitsData);
    if (!outfitsData) {
      res.status(404).json({ message: "No Outfit Found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const uploadToCloudinary = (image) =>
  cloudinary.uploader.upload(image, {
    tags: "outfit_pictures",
    eager: [{ width: 395, height: 495 }],
  });

router.post("/upload", async (req, res) => {
  const data = req.files.picture.data;
  const fileName = req.files.picture.name;
  const fileType = fileName.split(".").pop();
  const uri = parser.format(fileType, data);
  try {
    cloudinaryResult = await uploadToCloudinary(uri.content);
    const message = {
      text: "Ok",
      resp: cloudinaryResult,
    };
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Could not upload file" });
  }
});

module.exports = router;
