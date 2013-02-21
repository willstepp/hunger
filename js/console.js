var hunger = hunger || {};
hunger.console = hunger.console || {};

hunger.console['line'] = '<div class="line"><span>>&nbsp;</span><input class="active" type="text" maxlength="100"/></div>';
hunger.console['el'] = '';
hunger.console['history'] = [];

hunger.console['init'] = function (el) {
  $(el).empty();

  hunger.console.el = el;

  $(el).on("keypress", ".active", function (e) {
    if (e.which === 13) {
      var c = $('.active').val();
      hunger.console.processCommand(c);
      return false;
    }
  });

  hunger.console.newline(el);
}

hunger.console['newline'] = function (el) {
  $('.active').each(function () {
    $(this).attr('disabled', 'disabled');
    $(this).removeClass('active');
  });
  var nl = $(el).append(hunger.console.line);
  $('.active').focus();
}

hunger.console['processCommand']  = function (command) {
  if (command.localeCompare('clear') == 0) {
    hunger.console.clearConsole();
  } else {
     hunger.console.newline(hunger.console.el); 
   }
}

hunger.console['clearConsole'] = function () {
  $(hunger.console.el).empty();
  hunger.console.newline(hunger.console.el);
}