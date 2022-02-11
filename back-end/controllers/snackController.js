const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getOneSnack,
  deleteSnack,
  createSnack,
} = require("../queries/snacks.js");

// GET ALL SNACKS
snacks.get("/", async (req, res) => {
  const allSnacks = await getAllSnacks();
  if (allSnacks[0]) {
    res.status(200).json({
      success: true,
      payload: allSnacks,
    });
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

// GET ONE SNACK
snacks.get("/:id", async (req, res) => {
  const { id } = req.params;

  const snack = await getOneSnack(id);

  if (snack.id) {
    res.status(200).json({
      success: true,
      payload: snack,
    });
  } else {
    res.status(404).json({ success: false, payload: "not found" });
  }
});

// DELETE SNACK
snacks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSnack = await deleteSnack(id);
  if (deletedSnack.id) {
    res.status(200).json({ success: true, payload: deletedSnack });
  } else {
    res.status(404).json({ success: false, payload: { id: undefined } });
  }
});

snacks.post("/", async (req, res) => {
  const { body } = req;

  const createdSnack = await createSnack(body);
  if (createdSnack.name && createdSnack.image) {
    res.status(200).json({ success: true, payload: createdSnack });
  } else if(createdSnack.name && !createdSnack.image) {
    res
      .status(200)
      .json({
        success: true,
        payload: {
          id: true,
          name: createdSnack.name[0].toUpperCase() + createdSnack.name.slice(1),  
          image:
            "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image",
        },
      });
  } else if(createdSnack.name.toLowerCase() && createdSnack.name.length > 2) {
      console.log("Split String", createdSnack.name.split(" "))
  }
});

module.exports = snacks;
