import os
import sys
import re
import json
import urlparse
from urllib import urlencode

def create_url(id, url):
    myurl = urlparse.urlparse(url)
    query = dict(urlparse.parse_qsl(myurl.query))
    query['onepasswdfill'] = id

    url_list = list(myurl)
    url_list[4] = urlencode(query)

    return urlparse.urlunparse(url_list)

webFile = os.path.expanduser('~/Library/Application Support/1Password 4/3rd Party Integration/bookmarks-default.json')
macStoreFile = os.path.expanduser('~/Library/Containers/2BUA8C4S2C.com.agilebits.onepassword-osx-helper/Data/Library/3rd Party Integration/bookmarks-default.json')
query = re.compile('.*?'.join(map(re.escape, sys.argv[1])), re.I)

if os.path.exists(webFile):
    allResults = json.loads(open(webFile).read())
    filteredResults = [ row for row in allResults if query.search(row[1])]
    encodedResults = [ {
        'title': row[1],
        'subtitle': row[2],
        'value': create_url(row[0], row[2]),
    } for row in filteredResults ]
    print encodedResults
elif os.path.exists(macStoreFile):
    pass
else:
    pass
