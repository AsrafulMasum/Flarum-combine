const tags = require("../../models/tags/tags")

const findTags = async () => {
  const result = await tags.find()
  return result
}

module.exports = {findTags}