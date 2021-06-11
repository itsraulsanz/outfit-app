// HTML ROUTES
const router = require("express").Router();
const { Op } = require("sequelize");
const { Outfits, User } = require("../models");
const withAuth = require("../utils/auth");
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
router.use(expressCspHeader({
  directives: {
      'img-src': [SELF, 'data:', 'res.cloudinary.com']
  }
}));

const selectOptions = {
  price: [
    { name: "Price low to hight", value: "ASC" },    
    { name: "Price high to low", value: "DESC" },
  ],
  gender: [
    { name: "Men", value: "Men" },
    { name: "Women", value: "Women" },
    { name: "Unisex", value: "Unisex" },
  ],
  occasion: [
    { name: "Workwear", value: "Workwear" },
    { name: "Wedding", value: "Wedding" },
    { name: "Casual", value: "Casual" },
    { name: "Night Out", value: "Night Out" },
    { name: "Sportwear", value: "Sportwear" },
    { name: "Swimwear", value: "Swimwear" },
    { name: "Other", value: "Other" },
  ],
  colour: [
    { name: "Black", value: "Black" },
    { name: "Blue", value: "Blue" },
    { name: "Brown", value: "Brown" },
    { name: "Gold", value: "Gold" },
    { name: "Green", value: "Green" },
    { name: "Grey", value: "Grey" },
    { name: "Multi", value: "Multi" },
    { name: "Navy", value: "Navy" },
    { name: "Neutral", value: "Neutral" },
    { name: "No Colour", value: "No Colour" },
    { name: "Orange", value: "Orange" },
    { name: "Pink", value: "Pink" },
    { name: "Purple", value: "Purple" },
    { name: "Red", value: "Red" },
    { name: "White", value: "White" },
    { name: "Yellow", value: "Yellow" },
  ],
};

function queryFilters(filters) {
  const where = [];
  for (const property in filters) {
    if (filters[property]) {
      where.push({ [property]: filters[property] });
    }
  }

  return where;
}

// DISPLAY ALL OUTFITS ON HOMEPAGE
router.get("/", async (req, res) => {
  console.log("requestquery", req.query);
  // Get all outfits and join with User Data
  try {
    const { price, ...filters } = req.query;

    const outfitsData = await Outfits.findAll({
      where: {
        [Op.and]: queryFilters(filters),
      },
      order: [["price", req.query.price ? req.query.price : "ASC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // serialises outfits data for handlebars template
    const outfits = outfitsData.map((outfit) => outfit.get({ plain: true }));
    
    if (req.query.price) {
      for (let index = 0; index < selectOptions.price.length; index++) {
        if (req.query.price === selectOptions.price[index].value) {
          selectOptions.price[index].selected = true;
        } else {
          selectOptions.price[index].selected = false;
        }
      }
    }

    if (req.query.gender) {
      for (let index = 0; index < selectOptions.gender.length; index++) {
        if (req.query.gender === selectOptions.gender[index].value) {
          selectOptions.gender[index].selected = true;
        } else {
          selectOptions.gender[index].selected = false;
        }
      }
    }

    if (req.query.occasion) {
      for (let index = 0; index < selectOptions.occasion.length; index++) {
        if (req.query.occasion === selectOptions.occasion[index].value) {
          selectOptions.occasion[index].selected = true;
        } else {
          selectOptions.occasion[index].selected = false;
        }
      }
    }

    if (req.query.colour) {
      for (let index = 0; index < selectOptions.colour.length; index++) {
        if (req.query.colour === selectOptions.colour[index].value) {
          selectOptions.colour[index].selected = true;
        } else {
          selectOptions.colour[index].selected = false;
        }
      }
    }

    console.log("req.query.gender", req.query.gender);
    console.log(JSON.stringify(selectOptions));

    res.render("homepage", {
      outfits,
      logged_in: req.session.logged_in,
      selectOptions,
      query: req.query,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ONE OUTFIT
router.get("/outfits/:id", async (req, res) => {
  // Get one outfit and join with User Data
  try {
    const outfitsData = await Outfits.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // serialises data for one outfit into handlebars template
    const outfits = outfitsData.get({ plain: true });

    // passes data for one outfit into single-outfit handlebars template
    res.render("single-outfit", {
      ...outfits,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DASHBOARD - PREVENT ROUTE ACCESS USING WITHAUTH MIDDLEWARE
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const outfitsData = await Outfits.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // serialises outfits data for handlebars template
    const outfits = outfitsData.map((outfit) => outfit.get({ plain: true }));
   
    // filters outfits by session selection for each outfits selected
    const filteredOutfits = [];
    req.session.favouriteOutfits.forEach(outfitId => {
      const outfit = outfits.filter(({id}) =>  {
        return id == outfitId
      })[0];
      filteredOutfits.push(outfit)
    })
    // passes data into homepage handlebars template
    res.render("dashboard", {
      outfits: filteredOutfits,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN - Redirects user to dashboard page if already logged_in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// SIGNUP - Redirects user to dashboard page if already logged_in
router.get("/signup", async (req, res) => {
  res.render("signup");
});

// ADD OUTFIT - Render Get Outfit form once logged in
router.get("/outfits", withAuth, async (req, res) => {
  // Find user logged_in data from session ID
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Outfits,
        },
      ],
    });

    // serialises data specific to user into dashboard handlebars template
    const user = userData.get({ plain: true });

    // passes data for one outfit into single-outfit handlebars template
    res.render("addoutfit", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update outfit - Redirects user to dashboard page if already logged_in
router.get("/editoutfit", async (req, res) => {
  res.render("editoutfit");
});

module.exports = router;
