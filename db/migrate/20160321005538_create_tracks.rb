class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :iTunes_id
      t.string :title
      t.string :artist
      t.integer :number
      t.string :genre
      t.references :album, index: true, foreign_key: true
      t.string :cover_url
      t.string :preview_url

      t.timestamps null: false
    end
  end
end
