class CreateParades < ActiveRecord::Migration
  def change
    create_table :parades do |t|
      t.string :name
      t.string :youtube_url
      t.string :youtube_start_time
      t.text :encoded_params, :null => false
      t.timestamps
    end
  end
end
