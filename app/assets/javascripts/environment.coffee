###
# Get AppEnvironment
###

App.Environment = ->
  development:
    $('meta[name="env"]').attr('env') == "development"

  production:
    $('meta[name="env"]').attr('env') == "production"
