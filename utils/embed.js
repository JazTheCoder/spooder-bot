const color = require('./color.json');

let error = {
    title: 'F',
    description: "whoopsies it looks like I didn't save MJ",
    color: color.fail
}

// Export embeds
module.exports = {
    error: error,
}