const db = require("../db/dbConfig.js");

const getAllSnacks = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks");
    return allSnacks;
  } catch (error) {
    return error;
  }
};

const getOneSnack = async (id) => {
  try {
    const snack = await db.one("SELECT * FROM snacks WHERE id=$1", id);
    return snack;
  } catch (error) {
    return error;
  }
};

const deleteSnack = async (id) => {
    try {
        const deletedSnack = await db.one("DELETE FROM snacks WHERE id=$1 RETURNING *", id);
        return deletedSnack;
    } catch (error) {
        return error;
    }
}

module.exports = {
  getAllSnacks,
  getOneSnack,
  deleteSnack,
};
