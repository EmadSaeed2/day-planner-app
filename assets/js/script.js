// set current day
var currentDay = moment().format('dddd, MMMM Do');
$('#currentDay').text(currentDay);

var rowHour = moment(09, 'HH');

// create timeBlock rows and append them to container class
while (rowHour.hour() < 18) {
  var timeBlock = `<div class="time-block">
      <div class="row">
        <div class="hour">${rowHour.format('hh A')}</div>
        <textarea time=${rowHour.hour()} class="description">
        </textarea>
        <div class="saveBtn"><i class="fa fa-solid fa-floppy-disk"></i></div>
      </div>`

  $('.container').append(timeBlock);

  rowHour.add(1, 'hours');
}

// update the UI
setInterval(function () { //  check if currentHour has changed to update the UI 
  var currentHour = moment().hour();

  $('.description').each(function () {
    if (currentHour > $(this).attr('time')) {
      $(this).addClass('past').removeClass('present').removeClass('future');
    } else if (currentHour < $(this).attr('time')) {
      $(this).addClass('future').removeClass('present').removeClass('past');
    } else {
      $(this).addClass('present').removeClass('future').removeClass('past');
    }
  });
}, 1000);








