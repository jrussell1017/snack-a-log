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

// POST
snacks.post("/", async (req, res) => {
    const { body } = req;
    const createdSnack = await createSnack(body);

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


// snacks.post("/", async (req, res) => {
//   const { id, name, fiber, protein, added_sugar, is_healthy, image } = req.body;
//   const createdSnack = await createSnack(req.body);
//   confirmHealth(createdSnack)
//   if(!createdSnack.image) {
//     res.status(200).json({ success: true, payload: { 
//         id: true,
//         image: "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image" 
//     } 
//   });
// }

// if (deletedSnack.id) {
//     res.status(200).json({ success: true, payload: deletedSnack });
//   } else {
//     res.status(404).json({ success: false, payload: { id: undefined } });
//   }

//   if (createdSnack.id) {
//     res.status(200).json({ 
//         success: true, 
//         payload: {
//             id: id,
//             name: spidersOnALog(name),
//             fiber: fiber,
//             protein: protein,
//             added_sugar: added_sugar,
//             is_healthy: is_healthy,
//             image: image
//         }
//         });
//   } else {
//     res.status(400).json({
//         success: false, 
//         payload: { is_healthy: undefined }
//     })
//   }
// });


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
