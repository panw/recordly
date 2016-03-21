json.array!(@tracks) do |track|
  json.extract! track, :id, :iTunes_id, :title, :artist, :number, :genre, :album_id, :cover_url, :preview_url
  json.url track_url(track, format: :json)
end
