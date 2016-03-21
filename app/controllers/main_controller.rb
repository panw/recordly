class MainController < ApplicationController
  def index
  	@favorites = {
  		albums: current_user.favorite_albums,
  		tracks: current_user.favorite_tracks
  	}
  end
end
