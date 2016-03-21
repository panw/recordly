class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :title
      t.string :artist
      t.string :cover_url
      t.integer :iTunes_id

      t.timestamps null: false
    end
  end
end
