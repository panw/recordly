class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :favorites
  has_many :favorite_albums, through: :favorites, source: :favorited, source_type: 'Album'
  has_many :favorite_tracks, through: :favorites, source: :favorited, source_type: 'Track'
end
