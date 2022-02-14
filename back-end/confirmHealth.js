const confirmHealth = (snack) => {
    if (typeof snack.protein !== "number" && typeof snack.fiber !== "number" && typeof snack.added_sugar !== "number" ) {
        return null;
    }

    if (snack.fiber >= 5 && snack.added_sugar < 5) {
        return true;
    } else if (snack.protein >= 5 && snack.added_sugar < 5) { 
        return true;
    }
    return false;
};

module.exports = confirmHealth;


// const { body } = req;
// console.log("healthy:", body.is_healthy, "fiber:", body.fiber, "sugar:", body.added_sugar)

// if (body.fiber >= 5 && body.added_sugar < 5) {
//     body.is_healthy = true;
//     next();
// } else {
//     res.status(400).json({ error: "Fiber is not ok" });
// }

    // let { fiber, protein, added_sugar, is_healthy } = snack;
    // console.log(snack);
    // console.log(is_healthy);

    // if (!snack.fiber || !snack.protein || !snack.added_sugar) {
    //     console.log("if missing something");
    //     return null;
    // }

    // if (fiber >= 5 && added_sugar < 5) {
    //     is_healthy = true;
    // } else {
    //     is_healthy = false;
    // }
    // // console.log(is_healthy);
    // return is_healthy

    // if (protein > 5 && added_sugar < 5) {}
    // if (protein > 5 || fiber > 5 && sugar < 5) {}
    // if (fiber > 5 && added_sugar > 5) {} 
    // if (protein > 5 && added_sugar > 5) {}
    // if (protein > 5 && fiber > 5 && added_sugar > 5) {}  
    // if (typeof protein === null || typeof fiber === null  || typeof added_sugar === null ) {}
// };    

// *** #1 *** it("Checks if fiber is above five and added_sugar is below 5"
// console.log(confirmHealth({ protein: 4, fiber: 5, added_sugar: 1 })) //true

// *** #2 ***     it("Checks if protein is above 5 and added_sugar is below 5"
// confirmHealth({ protein: 6, fiber: 2, added_sugar: 0 }) //   true

// //  *** #3 ***    it("Checks if protein is above 5 or fiber is above five and added_sugar is below 5"
// confirmHealth({ protein: 8, fiber: 9, added_sugar: 3 }) //   true

// //   *** #4 ***   it("Checks if fiber is above five and added_sugar is above 5"
// confirmHealth({ protein: 2, fiber: 8, added_sugar: 10 }) //  false

// //   *** #5 ***   it("Checks if protein is above 5 and added_sugar is above 5"
// confirmHealth({ protein: 22, fiber: 3, added_sugar: 11 }) //  false

// //   *** #6 ***   it("Checks if protein is above 5 and fiber is above five and added_sugar is above 5"
// confirmHealth({ protein: 5, fiber: 5, added_sugar: 13 }) //  false
// confirmHealth({ protein: 1, fiber: 0, added_sugar: 6 }) //  false
// confirmHealth({ protein: 1, fiber: 0, added_sugar: 2 }) // false

// // *** #7 *** "Checks if protein, fiber and added_sugar have valid values"
// confirmHealth({ protein: "", fiber: "c", added_sugar: null }) //null
 

