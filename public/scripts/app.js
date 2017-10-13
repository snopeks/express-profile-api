console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  //make a request to your profile api
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleProfileSuccess,
    error: handleProfileError
  })
//get all hobbies from database via server and display on index.html
  $.ajax({
    method: 'GET',
    url: '/api/hobbies',
    success: displayHobbiesSuccess,
    error: displayHobbiesError
  })

  $("#hobbyId").on("submit", function ( e ){
    e.preventDefault();
    let hobbyQuery = $(this).serialize();
    console.log(hobbyQuery)
    //TODO: create a new hobby and add to db!
    $.ajax({
      method: "POST",
      data: hobbyQuery,
      url: '/api/hobbies',
      success: addHobbySuccess,
      error: addHobbyError
    })
  })

});

//HOBBY FUNCTIONS BELOW
function addHobbySuccess(dataObject){
  console.log("this is data object RESPONSE from my route", dataObject)
  console.log("this is my new hobby", dataObject.newHobby);
  let newHobby = dataObject.newHobby;
  $('#showHobbies').append(`<li>${newHobby}</li>`)
}
function addHobbyError(){
  console.log('there was an error with adding a hobby!')
}

//PROFILE FUNCTIONS BELOW
function handleProfileSuccess(data){
  //this is currently logging the profile data I have to browser console
  console.log(data.name)
}
function handleProfileError(){
  console.log("there was an error getting your profile!")

}

//GET ALL HOBBIES FUNCTIONS BELOW
function displayHobbiesSuccess(data){
  console.log(data);
  data.forEach(function(element){
    $("#showHobbies").append(`<li>${element.hobby}</li>`)
  })
}

function displayHobbiesError(){
  console.log("there was an error with campsites!")
}