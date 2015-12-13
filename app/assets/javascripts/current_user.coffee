###
# CurrentUser object, returning info on current logged in User
###

App.CurrentUser = ->
  id:
    $('meta[name=current_user]').attr('id')

  name:
    $('meta[name=current_user]').attr('name')

  email:
    $('meta[name=current_user]').attr('email')

  isCurrent: (id) ->
    this.getId() == id
