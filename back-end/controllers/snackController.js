const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getOneSnack,
  deleteSnack,
  createSnack,
} = require("../queries/snacks.js");

const { spidersOnALog } = require("../helpers/spidersOnALog.js");

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
    res.status(200).json({ success: true, 
        payload: {
            id: createdSnack.id,
            name: spidersOnALog(createdSnack.name),
            fiber: createdSnack.fiber,
            protein: createdSnack.protein,
            added_sugar: createdSnack.added_sugar,
            is_healthy: createdSnack.is_healthy,
            image: createdSnack.image
        }
        });
  } else if(createdSnack.name && !createdSnack.image) {
    res
      .status(200)
      .json({
        success: true,
        payload: {
          id: true,
          name: spidersOnALog(createdSnack.name),
          image:
            "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image",
        },
      });
  } else if (!createdSnack.fiber || !createdSnack.protein || !createdSnack.added_sugar) {
      res.status(200).json({
        success: true,
        payload: {
            is_healthy: null
        }
      })

  }
});

module.exports = snacks;
