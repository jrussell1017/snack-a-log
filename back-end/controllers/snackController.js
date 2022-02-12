const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getOneSnack,
  deleteSnack,
  createSnack,
} = require("../queries/snacks.js");

const { spidersOnALog } = require("../helpers/spidersOnALog.js");
const { confirmHealth } = require("../confirmHealth.js");

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
  const { id, name, fiber, protein, added_sugar, is_healthy, image } = req.body;
  const createdSnack = await createSnack(req.body);
  confirmHealth(createdSnack)
  if(!createdSnack.image) {
    res.status(200).json({ success: true, payload: { 
        id: true,
        image: "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image" 
    } 
  });
}

if (deletedSnack.id) {
    res.status(200).json({ success: true, payload: deletedSnack });
  } else {
    res.status(404).json({ success: false, payload: { id: undefined } });
  }

  if (createdSnack.id) {
    res.status(200).json({ 
        success: true, 
        payload: {
            id: id,
            name: spidersOnALog(name),
            fiber: fiber,
            protein: protein,
            added_sugar: added_sugar,
            is_healthy: is_healthy,
            image: image
        }
        });
  } else {
    res.status(400).json({
        success: false, 
        payload: { is_healthy: undefined }
    })
  }
});

module.exports = snacks;
