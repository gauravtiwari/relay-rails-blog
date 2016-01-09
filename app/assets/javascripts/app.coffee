# Setup app into global name space
window.App ||= {}

App.loggedIn = ->
 if $('meta[name=logged_in]').attr('authenticated') == "true"
  return true
 else
  return false

App.scrolledToBottom = ->
  $(window).scrollTop() > $(document).height() - $(window).height() - 200

$(document).ready ->
  App.loggedIn();
  App.scrolledToBottom();
