###
# Application Policy object
###

App.Policy = ((currentUser) ->
  _actions =
    update: (record) ->
      currentUser.id == record.user_id
    edit: (record) ->
      this.update()
    destroy: (record) ->
      this.update()

  permit = (action, record) ->
    _actions[action] record

  { permit: permit }
)(App.currentUser)
