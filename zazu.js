// Deprecated use zazu.json instead
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
        id: 'Search',
        type: 'PrefixScript',
        prefix: '1p',
        space: true,
        args: 'Required',
        script: '1password.js',
        connections: ['Open'],
      },
    ],
    output: [
      {
        id: 'Open',
        type: 'OpenInBrowser',
        url: '{value}',
      },
    ],
  },
}
