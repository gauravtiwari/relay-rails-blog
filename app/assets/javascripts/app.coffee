window.App ||= {}

App.loggedIn = ->
 if $('meta[name=logged_in]').attr('authenticated') == "true"
  localStorage.setItem('current_user_id', App.CurrentUser().id)
  return true
 else
  localStorage.setItem('current_user_id', undefined)
  return false

App.scrolledToBottom = ->
  $(window).scrollTop() > $(document).height() - $(window).height() - 200

$(document).ready ->
  App.loggedIn();
  App.scrolledToBottom();
