$(function() {
  function buildCalendar() {
      listDayNames();
      var daysOfMonth = getDaysOfMonth(); //was e
      var emptyDays = 0;
      var isEmpty = true;
      $calContent.empty();
      while (isEmpty) {
          if (days[emptyDays] == daysOfMonth[0].weekday) {
              isEmpty = false;
          } else {
              $calContent.append('<div class="blank"></div>');
              emptyDays++;
          }
      }
      for (var i = 0; i < 35 - emptyDays; i++) {
          if (i >= daysOfMonth.length) {
              $calContent.append('<div class="blank"></div>')
          } else {
              var day = daysOfMonth[i].day;
              var div = isDateToday(new Date(currentYear, currentMonth - 1, day)) ? '<div class="today">' : "<div>";
              $calContent.append(div + "" + day + "</div>")
          }
      }
      var monthColor = color[currentMonth - 1]; //get month color
      $calHeader.css("background-color", monthColor).find("h1").text(months[currentMonth - 1] + " " + currentYear);
      $weekDays.find("div").css("color", monthColor);
      $calContent.find(".today").css("background-color", monthColor);
      setDimensions();
  }

  function getDaysOfMonth() { //was h
      var daysOfMonth = [];
      for (var i = 1; i < getLastDayOfMonth(currentYear, currentMonth) + 1; i++) {
          daysOfMonth.push({
              day: i,
              weekday: days[getDayIndex(currentYear, currentMonth, i)]
          })
      }
      return daysOfMonth;
  }

  function listDayNames() { //was p
      $weekDays.empty();
      for (var i = 0; i < 7; i++) {
          $weekDays.append("<div>" + days[i].substring(0, 3) + "</div>")
      }
  }

  function setDimensions() {
      var t;
      var cal = $("#calendar").css("width", width + "px");
      cal.find(t = "#calendar_weekdays, #calendar_content").css("width", width + "px").find("div").css({
          width: width / 7 + "px",
          height: width / 7 + "px",
          "line-height": width / 7 + "px"
      });
      cal.find("#calendar_header").css({
          height: width * (1 / 7) + "px"
      }).find('i[class^="icon-chevron"]').css("line-height", width * (1 / 7) + "px")
  }

  function getLastDayOfMonth(cy, cm) {
      return (new Date(cy, cm, 0)).getDate()
  }

  function getDayIndex(year, month, day) {
      return (new Date(year, month - 1, day)).getDay()
  }

  function isDateToday(d) {
      return dateToString(new Date) == dateToString(d)
  }

  function dateToString(d) {
      return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
  }

  function getDate() { //was b
      var currentDate = new Date;
      currentYear = currentDate.getFullYear(); //was t
      currentMonth = currentDate.getMonth() + 1; //was n
  }
  var width = 480; //was e
  var currentYear = 2013; //was t
  var currentMonth = 9; //was n
  //var r = [];
  var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]; //was i
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //was s
  var color = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#FF6860", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];//was o
  var $calendar = $("#calendar"); //was u
  var $calHeader = $calendar.find("#calendar_header"); //was a
  var $weekDays = $calendar.find("#calendar_weekdays"); //was f
  var $calContent = $calendar.find("#calendar_content"); //was l
  getDate();
  buildCalendar();

  $calHeader.find('i[class^="icon-chevron"]').on("click", function() {
      var context = $(this);
      var changeMonth = function(context) {
        currentMonth = context == "next" ? currentMonth + 1 : currentMonth - 1;
          if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
          } else if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++
          }
          buildCalendar();
      };
      if (context.attr("class").indexOf("left") != -1) {
          changeMonth("previous")
      } else {
          changeMonth("next")
      }
  })
})