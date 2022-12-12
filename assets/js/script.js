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

// update UI depends on the hour
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

//get data from localStorage
var plannerData = {};

// check if localStorage has plannerData item if not, create it.
if (!localStorage.getItem("plannerData")) {
  localStorage.setItem("plannerData", JSON.stringify(plannerData));
} else { // get data from localStorage
  plannerData = JSON.parse(localStorage.getItem("plannerData"));
  $('.description').each(function () {
    if ($(this).attr('time'))
      $(this).text(plannerData[$(this).attr('time')])
  });
  console.log(plannerData)
}

// save data to localStorage
$('.saveBtn').click(function (e) {
  e.preventDefault();
  var rowTasks = $(this).siblings('.description').val();
  var rowHour = $(this).siblings('.description').attr('time');
  plannerData[rowHour] = rowTasks

  console.log(plannerData)
  localStorage.setItem("plannerData", JSON.stringify(plannerData));
});






