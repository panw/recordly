json.array!(@favorites) do |favorite|
  json.extract! favorite, :id, :user_id, :favorited_id, :favorited_type
  json.url favorite_url(favorite, format: :json)
end
