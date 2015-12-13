window.App ||= {}

App.loggedIn = ->
 if $('meta[name=logged_in]').attr('authenticated') == "true"
  localStorage.setItem('current_user_id', App.CurrentUser().id)
  return true
 else
  localStorage.setItem('current_user_id', undefined)
  return false

$(document).ready ->
  App.loggedIn();
