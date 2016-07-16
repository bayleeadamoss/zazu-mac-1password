require 'json'
require 'uri'

class Bookmark
  attr_accessor :id, :title, :url, :match

  def initialize(data)
    @id = data[0]
    @title = data[1]
    @url = data[2]
  end

  def matches?(query)
    title.match(query) || url.match(query)
  end

  def score(query)
    matches?(query).to_s.length
  end

  def hooked_link
    link = URI.parse(url)
    if link.query
      link.query = link.query + '&onepasswdfill=' + id
    else
      link.query = 'onepasswdfill=' + id
    end
    link.to_s
  end

  def to_json
    {
      title: title,
      subtitle: url,
      value: hooked_link,
    }
  end
end

class Searcher
  attr_accessor :file

  def initialize(file)
    @file = file
  end

  def bookmarks
    JSON.parse(File.read(file)).map do |item|
      Bookmark.new(item)
    end
  end

  def search(query)
    bookmarks.select { |item|
      item.matches?(query)
    }.sort { |a, b|
      a.score(query) <=> b.score(query)
    }.map(&:to_json)[0..2]
  end

  def self.give_exception
    {
      title: 'Error: 1Password bookmarks not found',
      subtitle: 'Click for help',
      value: 'https://support.1password.com/guides/mac/advanced-preferences.html',
    }
  end
end



webFile = File.expand_path('~/Library/Application Support/1Password 4/3rd Party Integration/bookmarks-default.json')
macStoreFile = File.expand_path('~/Library/Containers/2BUA8C4S2C.com.agilebits.onepassword-osx-helper/Data/Library/3rd Party Integration/bookmarks-default.json')
query = Regexp.new(ARGV[0].split('').join('.*?'), 'i')

if File.exists?(webFile)
  results = Searcher.new(webFile).search(query)
elsif File.exists?(macStoreFile)
  results = Searcher.new(macStoreFile).search(query)
else
  results = Searcher.give_exception
end

puts JSON.generate(results)
