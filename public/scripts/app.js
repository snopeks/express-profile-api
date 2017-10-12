console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  //TODO: make a request to your profile api
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleProfileSuccess,
    error: handleProfileError
  })
  $("#hobbyId").on("submit", function ( e ){
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/api/campsites',
      success: campsiteSuccess,
      error: campsiteError
    })
    let hobbyQuery = $(this).serialize();
    console.log(db.Campsites)
    $('#showHobbies').append(`<li>${hobbyQuery}</li>`)

    // $('#')
  })

});

function handleProfileSuccess(data){
  //this is currently logging the profile data I have to browser console
  console.log(data)
}
function handleProfileError(){
  console.log("there was an error getting your profile!")

}

function campsiteSuccess(data){
  console.log(data)
  console.log(db.Campsite)
}

function campsiteError(){
  console.log("there was an error with campsites!")
}