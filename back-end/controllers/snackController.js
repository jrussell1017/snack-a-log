const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getOneSnack,
  deleteSnack,
  createSnack,
  updateSnack
} = require("../queries/snacks.js");

const { spidersOnALog } = require("../helpers/spidersOnALog.js");
const confirmHealth = require("../confirmHealth.js");

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

// POST
snacks.post("/", async (req, res) => {
    const { body } = req;
    const createdSnack = await createSnack(body);


    body.is_healthy = confirmHealth(body);

    // If there is valid name, but no image
    if (createdSnack.id && !createdSnack.image) {
        res.status(200).json({
            success: true,
            payload: {
                id: createdSnack.id,
                name: spidersOnALog(createdSnack.name),
                fiber: createdSnack.fiber,
                protein: createdSnack.protein,
                added_sugar: createdSnack.added_sugar,
                is_healthy: createdSnack.is_healthy,
                image: "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
            }
        })
    } else if (createdSnack.id) {
        // Can create a snack
        res.status(200).json({
            success: true,
            payload: {
                id: createdSnack.id,
                name: spidersOnALog(createdSnack.name),
                fiber: createdSnack.fiber,
                protein: createdSnack.protein,
                added_sugar: createdSnack.added_sugar,
                is_healthy: createdSnack.is_healthy,
                image: createdSnack.image
            }
        })
    } else {
        res.status(500).json({ error: "Snack creation error" })
    }
})



// UPDATE SNACK
snacks.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updatedSnack = await updateSnack(id, body);
    
    if (updatedSnack.id) {
        res.status(200).json({
            success: true,
            payload: {
                id: updatedSnack.id,
                name: spidersOnALog(updatedSnack.name),
                fiber: updatedSnack.fiber,
                protein: updatedSnack.protein,
                added_sugar: updatedSnack.added_sugar,
                is_healthy: updatedSnack.is_healthy,
                image: updatedSnack.image 
            }
        })
    } else if (!updatedSnack.id) {
        res.status(422).json({ 
            success: false,
            payload: "/include all fields/"
         })
    }
})

module.exports = snacks;
