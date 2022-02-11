const express = require("express");
const snacks = express.Router();
const { getAllSnacks, getOneSnack } = require("../queries/snacks.js");

snacks.get("/", async (req, res) => {
  const allSnacks = await getAllSnacks();
  if (allSnacks[0]) {
    res.status(200).json(allSnacks);
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

snacks.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const snack = await getOneSnack(id);
    if (snack.id) {
      res.status(200).json(snack);
    } else {
      res
        .status(404)
        .json({ error: "Snack was not returned from the database." });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = snacks;
