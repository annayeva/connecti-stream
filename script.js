var roomName;
// Logged in user state
var sApiIsLoggedIn =
  "api-is-logged-in.php";
$.getJSON(sApiIsLoggedIn, function(
  jData) {
  if (jData.status == "ok") {
    loginStateWindows();
  } else {
    logoutStateWindows();
  }
});
/////EVENTS/////
// User logout
$("#btn-logout").click(function() {
  console.log("logout");
  websiteLogout();
});
// Show/hide sections
$("#toggle-display-options").on('click',
  function() {
    showHideSection(
      "#display-options-body", this);
  });
$("#toggle-comments").click(function() {
  showHideSection(
    "#comments-section-body", this);
});
$("#toggle-playlist").click(function() {
  showHideSection("#playlist-section",
    this);
});
// Menu linking
$('#home-menu-link , #logo-div').click(
  function() {
    redirectToPage("index.php");
  });
//"Create a room" action button
$("#btn-create-room").click(function() {
  console.log("create a room");
  swal({
    type: 'success',
    title: 'Success!',
    text: 'You created a new digital room.',
    timer: 3000,
    onOpen: () => {
      swal.showLoading()
    }
  }).then((result) => {
    if (result.dismiss === 'timer') {
      //redirectToPage("room.html");
      window.open("room.php");
    }
  })
})
// Display options
$(".display-option-buttons").click(
  function() {
    $(".display-option-buttons").removeClass("clicked-btn-display");
    $(this).addClass("clicked-btn-display", 1000,"easeOutSine");
  });

// Add video to playlist
$("#btn-add-video").click(function() {
  addVideoToPlaylist();
});
// Saving the playlist
$("#btn-save-playlist").click(function() {
  savePlaylist();
});
// Load playlist
$("#btn-load-playlist").click(function() {
  loadPlaylist();
});
//Change room tittle
$("#edit-tittle-icon").click(function() {
  editRoomTittle();
});
//Delete video from playlist
$('body').on('click',
  '.delete-video-icon',
  function() {
    $(this).parent().parent().remove();
  });
//Login & Signup
$("#btn-signup, #btn-try-it-out").click(
  function() {
    websiteSignup();
  });
$("#btn-login").click(function() {
  websiteLogin();
});
/////FUNCTIONS/////
function showHideSection(element, val) {
  $(element).toggle("blind", {
    direction: "vertical"
  }, 700);
  $(val).find('span').text($(val).find(
      'span').text() == 'Show' ? 'Hide' :
    'Show');
  $(val).find('i').toggleClass(
    'fa-chevron-up');
  $(val).find('i').toggleClass(
    'fa-chevron-down')
}

function loginStateWindows() {
  $("#btn-login").hide();
  $("#btn-signup").hide();
  $("#btn-try-it-out").hide();
  $("#btn-create-room").show();
  $("#user-greeting-div").show();
  $("#btn-logout").show();
  $(".homepage-menu").show();
}

function logoutStateWindows() {
  $("#btn-login").show();
  $("#btn-signup").show();
  $("#btn-try-it-out").show();
  $("#btn-create-room").hide();
  $("#user-greeting-div").hide();
  $("#btn-logout").hide();
  $(".homepage-menu").hide();
}

function redirectToPage(url) {
  window.location.replace(url);
}
// Sweet alerts
function websiteSignup() {
  var userEmail;
  var userPassword;
  swal.setDefaults({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2']
  })
  var steps = [{
    title: 'Sign up. ',
    text: 'Please input an e-mail:',
    input: 'email'
  }, {
    title: 'Sign up',
    text: 'Please input a password:',
    input: 'password'
  }]
  swal.queue(steps).then((result) => {
    swal.resetDefaults()
    if (result.value) {
      console.log(result.value);
      swal({
        type: 'success',
        title: 'You are registered user now!',
        html: 'We sent you an e-mail on: ' +
          result.value[0]
      })
      //passing in a link user e-mail and password
      var apiSignup ="api-signup.php?email=" + result.value[0] + "&password=" + result.value[1];
      //console.log(apiSignup);
      $.getJSON(apiSignup, function( //sending the data via AJAX to PHP
        jData) {
        console.log(jData);
        if (jData.status == "ok") {
          console.log("OKAY!");
        } else {
          console.log("ERROR!");
        }
      });
    }
  })
}

function websiteLogin() {
  var userEmail;
  var userPassword;
  console.log("login");
  swal({
    title: 'Log in',
    html: '<span>E-mail:</span><input id="email-field" placeholder="e-mail" class="swal2-input">' +
      '<span>Password:</span><input id="password-field" type="password" placeholder="password" class="swal2-input">',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Submit',
    preConfirm: function() {
      return new Promise(function(
        resolve) {
        resolve([userEmail = $('#email-field').val(), //saving input val into a var
                userPassword = $('#password-field').val()]) //saving input val into a var
      })
    }
  }).then((result) => {
    if (result.value) {
      //inserting user info into URL to pass to PHP
      var apiLogin ="api-login.php?email=" + userEmail + "&password=" + userPassword;
      console.log(apiLogin);
      $.getJSON(apiLogin, function(jData) { //passing user email and password to PHP to check it afterwards
        //console.log(jData);
        if (jData.status == "ok") {
          console.log("OKAY!");
          loginStateWindows();
          swal({
            type: 'success',
            title: 'You are logged in!',
            html: 'Welcome back: ' + jData.user //welcoming user by using received JSON
          })
        } else {
          console.log("ERROR!");
          loginErrorMessage();
        }
      });
    } else if (result.dismiss ===
      'cancel') {} else {
      loginErrorMessage();
    }
  })
}

function loginErrorMessage(message) {
  swal('Error',
    'E-mail or password is wrong, please try again..',
    'error').then((result) => {
    websiteLogin();
  })
}

function confirmRegistration(email) {
  swal({
    type: 'success',
    title: 'You are registered user now!',
    html: 'We sent you an e-mail on: ' +
      userEmail
  })
}

function websiteLogout() {
  var apiLogout = "api-logout.php";
  swal({
    title: 'Do you really want to logout?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.value) {
      swal({
        title: 'You are loged out.',
        type: 'info'
      })
      $.get(apiLogout, function() { //calling logout in order to destroy the session
        logoutStateWindows();
      });
    }
  })
}

function addVideoToPlaylist() {
  swal({
    title: 'To add a video to the playlist type in a valid YouTube link.',
    input: 'url',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (url) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (url ===
            'https://wwww.wrongurl.com' //think of how to validate the links
          ) {
            swal.showValidationError(
              'Sorry, this link is not working.'
            )
          }
          resolve()
        }, 1000)
      })
    },
    allowOutsideClick: false
  }).then((result) => {
    if (result.value) {
      videoUrl = result.value;
      getVideoFromYoutube(result.value);
    }
  })
}

function savePlaylist() {
  console.log("Saving video");
  swal({
    title: 'To save a playlist give it a name:',
    input: 'text',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (text) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (text === '') {
            swal.showValidationError(
              'Please give a name to your playlist.'
            )
          }
          resolve()
        }, 1000)
      })
    },
    allowOutsideClick: false
  }).then((result) => {
    if (result.value) {
      swal({
        type: 'success',
        title: 'Success!',
        html: 'The playlist was saved as ' +
          result.value
      })
    }
  })
}

function loadPlaylist() {
  console.log("loading video"); //to be developed..
}

$(function dragDropVideo() {
  $(".single-video-wrapper").draggable({helper: "clone"}); //giving a dragable feature to a video class
  $(".droppable").droppable({ //making the video container droppable
    drop: function(event, ui) {
      var draggableId = ui.draggable.attr("id"); //saving in a var an id of the video that is dragged

      $(this).addClass("ui-state-highlight").html( //embedding a video by using the video ID
        '<iframe width="560" height="315" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/' +
        draggableId +
        '" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>'
      );
    }
  });
});

function getVideoFromYoutube(url) {
  var apiKey ='AIzaSyAMCMlaVeKy6ZkN61_XepkJ-mzOwaOD8BE'; //declare API key
  var videoId = url.substr(url.length - 11); //fetch ID from the url
  var finalUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' +
    videoId + '&key=' + apiKey +'&part=snippet'; //url to access YouTube API of a video

  $.getJSON(finalUrl, function(jData) { //get data from google API with AJAX
    var videoTittle = jData.items[0].snippet.title; // path to get video tittle from JSON object
    var videoThumbnail = 'https://img.youtube.com/vi/' + videoId + '/mqdefault.jpg'; // path to get video thumbnail
    appendPlaylistVideo(videoTittle, videoThumbnail, videoId);
  });
}

function appendPlaylistVideo(title,
  thumbnail, id) {
  var appendDiv = //template for a video to be appended with a custom thumnail and tittle
    '<div id="'+id+'" class="single-video-wrapper">\
                          <div class="single-video-pic">\
                            <img class="inner-image" src="' + thumbnail +'" alt="" width="100%" height="100%">\
                            <div class="delete-video-icon"><i class="fa fa-times-circle" aria-hidden="true"></i></div>\
                            <div class="middle-icons">\
                              <div class="cc-icon"><i class="fa fa-cc" aria-hidden="true"></i></div>\
                            <div class="clock-icon"><i class="fa fa-clock-o" aria-hidden="true"></i></div>\
                            </div>\
                          </div>\
                          <p class="single-video-tittle">' + title +'</p>\
                        </div>'
  //appending the video to the playlist div. supplying it with a draggable clone
  $("#video-holder").append($(appendDiv).draggable({helper: "clone"}));
  //success alert
  swal({
    type: 'success',
    title: 'The "' + title +
      '" has been added to the playlist!'
  })
}

function editRoomTittle() {
  swal({
    title: 'To change the room name type the new name here:',
    input: 'text',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    allowOutsideClick: false
  }).then((result) => {
    if (result.value) {
      $("#room-tittle-text").text(result
        .value);
      swal({
        type: 'success',
        title: 'Success!',
        html: 'The room was renamed to: ' +
          result.value
      })
    }
  })
}