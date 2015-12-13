###
# Policy object, returning a single `permit` action
#
# @param action [String]
# @param record [Object]
#
# @example
#   if (ApplicationPolicy.permit('update', record)) { ... }
#
# @return [Boolean]
###

App.Policy = ((currentUser) ->
  _policies =
    update: (record) ->
      currentUser.id == record.user_id
    edit: (record) ->
      this.update()
    destroy: (record) ->
      this.update()

  permit = (action, record) ->
    _policies[action] record

  { permit: permit }
)(App.currentUser)
