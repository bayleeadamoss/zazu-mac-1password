## 1password for Zazu (mac)

Make your 1password bookmarks visible in Zazu!

## Installing

Add `tinytacoteam/zazu-mac-1password` inside of `plugins` block of your
`~/.zazurc.js` file.

~~~ javascript
module.exports = {
  'plugins': [
    'tinytacoteam/zazu-mac-1password',
  ],
}
~~~

## Debugging

This plugin searches 2 places for your 1password bookmarks, if you are still not
seeing results:

* Ensure [third party integrations][alfred-advanced-preferences] are enabled.
* If you installed from the **web** check the file exist:
  * `~/Library/Application Support/1Password 4/3rd Party Integration/bookmarks-default.json`
* If you installed via **Mac App Store** check the file exists:
  * `~/Library/Containers/2BUA8C4S2C.com.agilebits.onepassword-osx-helper/Data/Library/3rd Party Integration/bookmarks-default.json`

[alfred-advanced-preferences]: https://support.1password.com/guides/mac/advanced-preferences.html
