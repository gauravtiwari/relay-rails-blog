# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create!(
  name: "John Doe",
  password: "password",
  email: "john@example.com"
)


User.create!(
  name: "Mary Smith",
  password: "password",
  email: "mary@example.com"
)


User.create!(
  name: "Sam Smith",
  password: "password",
  email: "sam@example.com"
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
