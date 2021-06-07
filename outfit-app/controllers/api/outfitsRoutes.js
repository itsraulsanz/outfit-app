const router = require("express").Router();
const { Outfits } = require("../../models");
const withAuth = require("../../utils/auth");

// POST NEW OUTFIT
router.post("/", withAuth, async (req, res) => {
  try {
    const {
      outfitName,
      price,
      brand,
      location,
      occasion,
      colour,
      gender,
      image,
    } = req.body;
    const payload = Object.assign(
      {
        user_id: req.session.user_id,
      },
      {
        outfit_name: outfitName,
        price,
        brand,
        location,
        occasion,
        colour,
        gender,
        image,
      }
    );
    const newOutfits = await Outfits.create(payload);

    res.status(200).json(newOutfits);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

// UPDATE AN OUTFIT BY ITS ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateOutfit = await Outfits.update({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(updateOutfit);
  } catch (err) {
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

module.exports = router;
