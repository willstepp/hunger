var hunger = hunger || {};
hunger.console = hunger.console || {};

hunger.console['line'] = '<div class="line"><span>>&nbsp;</span><input class="active" type="text" maxlength="100"/></div>';
hunger.console['el'] = '';
hunger.console['history'] = [];
hunger.console['history_index'] = 0;

hunger.console['init'] = function (el) {
  $(el).empty();

  hunger.console.el = el;
  hunger.console.history = [];
  hunger.console.history_index = 0;

  $(el).on("keydown", ".active", function (e) {

    if (e.which === 13) { //enter
      var c = $('.active').val();

      hunger.console.history.push(c);
      hunger.console.history_index = (hunger.console.history.length - 1);

      hunger.console.processCommand(c);
      return false;
    }

    if (hunger.console.history.length > 0) {
       if (e.which === 38) { //up arrow

        var history_item = hunger.console.history[hunger.console.history_index];
        $('.active').val(history_item);

        if (hunger.console.history_index > 0) {
          hunger.console.history_index--;
        } 
        return false;
      } else if (e.which === 40) { //down arrow
          if (hunger.console.history_index < (hunger.console.history.length - 1)) {
            hunger.console.history_index++;
            var history_item = hunger.console.history[hunger.console.history_index];
            $('.active').val(history_item);
          } else {
            $('.active').val('');
          }
          return false;
      }
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