var roomName;

/////EVENTS/////


// Show/hide sections
//$('.filter-button-group button').on('click', function (e) {
$("#toggle-display-options").on('click', function(){
  showHideSection("#display-options-body", this);      
}); 
    
$("#toggle-comments").click(function(){
  showHideSection("#comments-section-body", this);
});

$("#toggle-playlist").click(function(){
  showHideSection("#playlist-section", this);
});

// Menu linking
$('#home-menu-link , #logo-div').click(function(){
  redirectToPage("index.html");
});

// Display options
$( ".display-option-buttons" ).click(function() {
  $(".display-option-buttons").removeClass( "clicked-btn-display" );
  $( this ).addClass( "clicked-btn-display", 1000, "easeOutSine" );
});
   
// Add video to playlist
$("#btn-add-video").click( function(){  
  addVideoToPlaylist();
});

// Saving the playlist
$("#btn-save-playlist").click( function(){  
  savePlaylist();
});

// Load playlist
$("#btn-load-playlist").click( function(){  
  loadPlaylist();
});

//Change room tittle
$("#edit-tittle-icon").click( function(){  
  editRoomTittle();
});

//Delete video from playlist
$('body').on('click', '.delete-video-icon', function() {
     $(this).parent().parent().remove();
});

//Login & Signup
$("#btn-signup").click( function(){  
  websiteSignup();
});

$("#btn-login").click( function(){  
  websiteLogin();
});


/////FUNCTIONS/////

function showHideSection (element, val) {
  $(element).toggle( "blind", {direction: "vertical"}, 700 );

  $(val).find('span').text($(val).find('span').text() == 'Show' ? 'Hide' : 'Show');
  $(val).find('i').toggleClass('fa-chevron-up');
  $(val).find('i').toggleClass('fa-chevron-down')
}

function redirectToPage (url) {
  window.location.replace(url);
  //window.open("url");
  //in a new window 
}


// Sweet alerts

function websiteSignup() {

  var userEmail;
  var userPassword;

swal({
  title: 'Sign up',
  html:
    '<span>E-mail:</span><input id="email-field" placeholder="e-mail" class="swal2-input">' +
    '<span>Password:</span><input id="password-field" type="password" placeholder="password" class="swal2-input">',
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonText: 'Submit',
  preConfirm: function () {
    return new Promise(function (resolve) {
      resolve([
        userEmail = $('#email-field').val(),
        userPassword = $('#password-field').val()      
      ])
    })
  }
}).then((result) => {
  if (result.value) {

  } else if (result.dismiss === 'cancel') {
  
  }
  })
}

function confirmRegistration (email) {
   swal({
      type: 'success',
      title: 'You are registered user now!',
      html: 'We sent you an e-mail on: ' + userEmail
    })
}


function websiteLogin() {
  var userEmail;
  var userPassword;

  console.log("login");

  swal({
  title: 'Log in',
  html:
    '<span>E-mail:</span><input id="email-field" placeholder="e-mail" class="swal2-input">' +
    '<span>Password:</span><input id="password-field" type="password" placeholder="password" class="swal2-input">',
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonText: 'Submit',
  preConfirm: function () {
    return new Promise(function (resolve) {
      resolve([
        userEmail = $('#email-field').val(),
        userPassword = $('#password-field').val()
      ])
    })
  }
}).then((result) => {
  if (result.value) {
    var apiLogin = "api-login.php?email="+userEmail+"&password="+userPassword;
    console.log (apiLogin);
    // $.getJSON(apiLogin, function(jData){
         
    //          console.log ( jData);
    //          if( jData.status == "ok" ){
    //            console.log ( "OKAY!");
    //            console.log (jData);     
    //          }
          
    //          else {
    //            console.log ( "ERROR!");  
    //          }
    //        });


  } else if (result.dismiss === 'cancel') {
  
  }
  })
}

function confirmRegistration (email) {
   swal({
      type: 'success',
      title: 'You are registered user now!',
      html: 'We sent you an e-mail on: ' + userEmail
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
        if (url === 'https://wwww.wrongurl.com') {
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
      html: 'The playlist was saved as ' + result.value
    })
  }
})

}

function loadPlaylist() {
  console.log("loading video");
}


   $( function dragDropVideo() {
    $( ".single-video-wrapper" ).draggable({  helper: "clone" });
    $( ".droppable" ).droppable({
      drop: function( event, ui ) {
        var draggableId = ui.draggable.attr("id");
        //console.log(draggableId);
        $( this )
          .addClass( "ui-state-highlight" )
          .html('<iframe width="560" height="315" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/'+draggableId+'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>');
      }
    });
  } );



function getVideoFromYoutube(url){
 var apiKey = 'AIzaSyAMCMlaVeKy6ZkN61_XepkJ-mzOwaOD8BE'; 
 var videoId = url.substr(url.length - 11); //fetch ID from the url
 var finalUrl = 'https://www.googleapis.com/youtube/v3/videos?id='+videoId+'&key='+apiKey+'&part=snippet';
 console.log(finalUrl);
  

  $.getJSON(finalUrl,function(jData){ //get data from google API

        var videoTittle = jData.items[0].snippet.title;
        var videoThumbnail = 'https://img.youtube.com/vi/'+videoId+'/mqdefault.jpg';
        appendPlaylistVideo(videoTittle, videoThumbnail, videoId);
         
  });

  
}

function appendPlaylistVideo (title, thumbnail, id) {

  var appendDiv= '<div id="'+id+'" class="single-video-wrapper draggable">\
                          <div class="single-video-pic">\
                            <img class="inner-image" src="'+thumbnail+'" alt="Single screen icon" width="100%" height="100%">\
                            <div class="delete-video-icon"><a href="#"><i class="fa fa-times-circle" aria-hidden="true"></i></a></div>\
                            <div class="middle-icons">\
                              <div class="cc-icon"><a href="#"><i class="fa fa-cc" aria-hidden="true"></i></a></div>\
                            <div class="clock-icon"><a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i></a></div>\
                            </div>\
                          </div>\
                          <p class="single-video-tittle">'+title+'</p>\
                        </div>'
        
        $("#video-holder").append($(appendDiv).draggable({ helper: "clone" }));

        //Success alert
        swal({
        type: 'success',
        title: 'The "'+title+'" has been added to the playlist!'
        })
}

function editRoomTittle(){

    swal({
  title: 'To change the room name type the new name here:',
  input: 'text',
  showCancelButton: true,
  confirmButtonText: 'Submit',
  allowOutsideClick: false
}).then((result) => {
  if (result.value) {

    $("#room-tittle-text").text(result.value);
    swal({
      type: 'success',
      title: 'Success!',
      html: 'The room was renamed to: ' + result.value
    })

  }
})

}