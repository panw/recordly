json.array!(@albums) do |album|
  json.extract! album, :id, :title, :artist, :cover_url
  json.url album_url(album, format: :json)
end
