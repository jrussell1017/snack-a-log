function spidersOnALog(string) {
    const splitString = string.split(" ");

    let keepSameOrder = [];

    for (let word of splitString) {
        if (word.length > 2) {
            const newWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
            keepSameOrder.push(newWord);
        } else {
            const keepWord = word;
            keepSameOrder.push(keepWord);
        }
    }
    let entireString = keepSameOrder.join(" ");
    return entireString;
}

// spidersOnALog("spiders on a log");
console.log(spidersOnALog("spiders on a log"))
console.log(spidersOnALog("Flamin' Hot CheeTOS"))
console.log(spidersOnALog("COMBOS"))


module.exports = { spidersOnALog };