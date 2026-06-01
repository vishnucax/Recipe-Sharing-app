const express = require("express");
const Recipe = require("../models/Recipe");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      user: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can edit recipe" });
    }

    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;

    const updatedRecipe = await recipe.save();

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can delete recipe" });
    }

    await recipe.deleteOne();

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
