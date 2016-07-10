module.exports = {
  name: 'Mac 1password',
  version: '0.0.1',
  author: 'blainesch',
  description: 'Have your 1password bookmarks be searchable in zazu',
  icon: 'icon.png',
  homepage: 'https://github.com/tinytacoteam/zazu-mac-1password',
  git: 'git@github.com:tinytacoteam/zazu-mac-1password.git',
  blocks: {
    input: [
      {
        id: 1,
        type: 'RootScript',
        respondsTo: (input) => {
          return true
        },
        script: 'node 1password.js "{query}"',
        connections: [2],
      },
    ],
    output: [
      {
        id: 2,
        type: 'OpenInBrowser',
        url: '{value}',
      },
    ],
  },
}
