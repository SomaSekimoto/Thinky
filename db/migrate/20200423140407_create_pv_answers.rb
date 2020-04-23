class CreatePvAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :pv_answers do |t|
      t.text :content, null: false
      t.timestamps
    end
  end
end
