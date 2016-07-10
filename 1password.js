const fs = require('fs')
const os = require('os')
const path = require('path')
const fuzzyfind = require('fuzzyfind')
const url = require('url')

const home = os.homedir()
const webFile = path.join(home, 'Library/Application Support/1Password 4/3rd Party Integration/bookmarks-default.json')
const macStoreFile = path.join(home, 'Library/Containers/2BUA8C4S2C.com.agilebits.onepassword-osx-helper/Data/Library/3rd Party Integration/bookmarks-default.json')

const query = 'good'

const searchBookmarks = (file, query) => {
  fs.readFile(file, (_, data) => {
    const unorderedItems = JSON.parse(data.toString())
    const orderedItems = fuzzyfind(query, unorderedItems, (item) => {
      return item[1] + item[2]
    })
    .slice(0, 9)
    .map((item) => {
      const itemUrlObj = url.parse(item[2], true)
      itemUrlObj.query.onepasswdfill = item[0]
      const itemUrl = url.format(itemUrlObj)
      return {
        title: item[1],
        subtitle: itemUrl,
        value: itemUrl,
      }
    })
    console.log(JSON.stringify(orderedItems))
  })
}

[webFile, macStoreFile].forEach((file) => {
  fs.stat(file, (err, stats) => {
    if (!err) {
      searchBookmarks(file, query)
    }
  })
})
