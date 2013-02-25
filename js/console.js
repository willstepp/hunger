var hunger = hunger || {};
hunger.console = hunger.console || {};

//shorthand
var hc = hunger.console;

hc['line'] = '<div class="line"><span>>&nbsp;</span><input class="active" type="text" maxlength="100"/></div>';
hc['el'] = '';

hc['history'] = [];
hc['history_index'] = 0;

hc['tab_activated'] = false;
hc['tab_index'] = -1;
hc['tab_command'] = '';

hc['commands'] = {
  'clear':'clears the console',
  'help':'prints a list of available commands',
  'end':'ends the game',
  'begin':'starts the game'
}

hc['init'] = function (el) {
  $(el).empty();

  hc.el = el;
  hc.history = [];
  hc.history_index = 0;
  hc.tab_activated = false;
  hc.tab_index = -1;
  hc.tab_command = '';

  $(el).on("keydown", ".active", function (e) {

    if(e.which !== 9) {
      //turn off tab helpers
      hc.tab_activated = false;
      hc.tab_index = -1;
    }

    if (e.which === 13) { //enter
      var c = $('.active').val();

      hc.history.push(c);
      hc.history_index = (hc.history.length - 1);

      hc.processCommand(c);
      return false;
    }

    if (e.which === 9) { //tab
      var c, i, ta_i;
      
      if (hc.tab_activated) {
        c = hc.tab_command;

        //start looking just after the current tab item
        ta_i = hc.tab_index+1;
        for(;;) {
          
          var item = hc.history[ta_i];
          if (item) {
            if (item.substring(0, c.length) === c) {
              hc.tab_index = ta_i;
              $('.active').val(item);
              return false;
            }
          }
          if (ta_i >= (hc.history.length-1)) {
            //if nothing found, start over
            hc.tab_index = -1;
            ta_i = 0;
          } else {
            ta_i++;
          }

        }
      } else {
        c = $('.active').val();
        if (c.length > 0) {
          for(i = 0; i < hc.history.length; i++) {
            if (hc.history[i].substring(0, c.length) === c) {

              hc.tab_activated = true;
              hc.tab_index = i;
              hc.tab_command = c;

              $('.active').val(hc.history[i]);
              return false;
            }
          }
        }
        return false;
      }
    }

    if (hc.history.length > 0) {
       if (e.which === 38) { //up arrow

        var history_item = hc.history[hc.history_index];
        $('.active').val(history_item);

        if (hc.history_index > 0) {
          hc.history_index--;
        } 
        return false;
      } else if (e.which === 40) { //down arrow
        if (hc.history_index < (hc.history.length - 1)) {
          hc.history_index++;
          var history_item = hc.history[hc.history_index];
          $('.active').val(history_item);
        } else {
          $('.active').val('');
        }
        return false;
      }
    }
  });

  hc.newline(el);
}

hc['newline'] = function (el, info) {
 $('.active').each(function () {
    $(this).attr('disabled', 'disabled');
    $(this).removeClass('active');
    $(this).addClass('inactive');
  });
  if (info) {
    var nl = $(el).append(hc.line);
    $('.active').attr('disabled', 'disabled');
    $('.active').addClass('info');
    $('.active').val(info);
  } else {
    var nl = $(el).append(hc.line);
    $('.active').addClass('user');
    $('.active').focus();
  }
}

hc['processCommand'] = function (c) {
  var ci;
  if (c.localeCompare('clear') == 0) {
    hc.clearConsole();
  } else if(c.localeCompare('help') == 0) {
    hc.newline(hc.el, 'clear: clears the console');
    hc.newline(hc.el, 'help: prints a list of available commands');
    hc.newline(hc.el, 'end: ends the game');
    hc.newline(hc.el, 'begin: starts the game');
    hc.newline(hc.el);
  } else {
     hc.newline(hc.el); 
  }
}

hc['clearConsole'] = function () {
  $(hc.el).empty();
  hc.newline(hc.el);
}