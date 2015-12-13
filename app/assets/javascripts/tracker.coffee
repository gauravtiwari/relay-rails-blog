# Tracker for Go Squared
if App.Environment().production
  $(document).on 'ready page:change', ->
    _gs 'track'
