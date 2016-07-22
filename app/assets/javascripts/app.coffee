# Setup app into global name space
window.App ||= {}

App.loggedIn = ->
 if $('meta[name=logged_in]').attr('authenticated') == "true"
  return true
 else
  return false

App.csrfToken = ->
  return $('[name="csrf-token"]').attr('content')

App.scrolledToBottom = ->
  $(window).scrollTop() > $(document).height() - $(window).height() - 50

$(document).ready ->
  App.loggedIn();
  App.scrolledToBottom();
