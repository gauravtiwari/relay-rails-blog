# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create!(
  name: "Gaurav Tiwari",
  password: "password",
  email: "gaurav@gauravtiwari.co.uk"
)


User.create!(
  name: "Parul Singh",
  password: "password",
  email: "parul@parul.co.uk"
)


User.create!(
  name: "Sheshan Tiwari",
  password: "password",
  email: "sheshan@sheshan.co.uk"
)

10.times do
  Post.create!(
    title: "Lorem ipsum",
    body: "This is body of the post",
    user_id: (1..3).to_a.sample
  )
end

100.times do
  Comment.create!(
    body: "This is body of the post",
    user_id: (1..3).to_a.sample,
    post_id: (1..10).to_a.sample
  )
end
