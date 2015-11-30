if($('meta[name="env"]').data('env') === "production") {
  $(document).on('ready page:change', function() {
    return _gs('track');
  });
}
