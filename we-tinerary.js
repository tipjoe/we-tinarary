/**
 * Javascript to handle the we-tinerary app.
 */

var likes = []; // Track IDs of liked sessions.

$(function() {

  evaluateOrienationHint();

  Sqrl.defineFilter("newlineToBreak", function (str) {
    if (str) {
      return str.replace(/\n/g, "<br>");
    }
  });

  // Show summary - Up to | character or 140 characters if no pipe.
  Sqrl.defineFilter("summary", function (str) {
    if (str) {
        return str.substring(0, 140) + "...";
    }
  });

  Sqrl.autoEscaping(false);

  loadLikes();
  preRenderEvent();
  renderEvent();
  renderMySchedule();

  // Listen for resize changes
  window.addEventListener("resize", function() {
    evaluateOrienationHint();
  }, false);


  $("#myschedule-tab").click(function() {
    preRenderEvent();
    renderMySchedule();
  });


  // Show body after render to avoid flashes.
  $("body").show();

});


function evaluateOrienationHint() {
  // Check for portrait orientation on mobile screens.
  if (window.outerWidth < window.outerHeight && window.outerWidth < 600) {
    $("#orientationHint").removeClass("d-none");
  } else {
    $("#orientationHint").addClass("d-none");
  }
}

function toggleHeart(id, sel) {
  if ($(sel).hasClass('like')) {
    $(sel).removeClass('like');
    updateLikeCount(-1);
    removeLike(id);
  } else {
    $(sel).addClass('like');
    updateLikeCount(1);
    addLike(id);
  }
}

function addLike(id) {
  likes.push(id);
  localStorage.setItem("likes", likes);
}
function removeLike(id) {
  let idx = likes.indexOf(id);
  if (idx > -1) {
    likes.splice(idx, 1);
  }
  localStorage.setItem("likes", likes);
}

function updateLikeCount(amt) {
  let cnt = parseInt($("#myschedule-count").text()) ? parseInt($("#myschedule-count").text()) : 0;
  cnt += amt;
  if (cnt > 0) {
    $("#myschedule-count").text(cnt);
  } else {
    $("#myschedule-count").text("");
  }
}

function loadLikes() {
  likes = localStorage.getItem("likes");
  if (likes) {
    likes = JSON.parse("[" + likes + "]");
    updateLikeCount(likes.length);
  } else {
    likes = [];
  }
}

// Match existing likes with event sessions before rendering. Also
// tags days with at least one like to toggle day visibility.
function preRenderEvent() {
  if (likes.length > 0) {
    for (var day in scheduleData.days) {
      if (scheduleData.days.hasOwnProperty(day)) {
        let sessions = scheduleData.days[day]['sessions'];
        scheduleData.days[day]['haveSessions'] = false;

        for (var sess in sessions) {
          let sessionId = parseInt(sessions[sess].id);
          if (likes.indexOf(sessionId) > -1) {
            scheduleData.days[day]['sessions'][sess].like = true;
            scheduleData.days[day]['haveSessions'] = true;
          } else {
            scheduleData.days[day]['sessions'][sess].like = false;
          }
        }
      }
    }
  }
}

function renderEvent() {

  let days = scheduleData.days;
  for (var day in days) {
    if (days.hasOwnProperty(day)) {
      var res = Sqrl.Render(dayTabTemplate, days[day]);
      $("#eventDays").append(res);
    }
  }

}

function renderMySchedule() {
  // If it already exists, remove my schedule.
  $("#myschedule").each(function() {
    $(this).remove();
  });

  let days = scheduleData.days;
  // var res = Sqrl.Render(myScheduleTemplate, {"days": days, "likes": likes});
  var res = Sqrl.Render(myScheduleTemplate, {"days": days, "likes": likes});
  $("#eventDays").append(res);
}
