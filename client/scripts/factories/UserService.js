myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');

  var userObject = {};
  var locationList = {};
  var placeObject = {
    place: ''
  };
  var locationObject = {
    user: '',
    name: '',
    dateAdded: '',
    dateVisited: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    website: '',
    recommender: '',
    recNotes: '',
    visited: '',
    type: '',
    userNotes: ''
  };

  function getPlaces(){
    $http.get('/locations').then(function(response){
      locationList.data = response.data;
    });
  }

  function getThisPlace(place){
    console.log("getting this place: ", place);
    placeObject.place = place;
  }
  

  return {
    userObject : userObject,
    locationList : locationList,
    locationObject : locationObject,
    placeObject : placeObject,

    getThisPlace : getThisPlace,
    getPlaces : getPlaces,

    deletePlace : function(place){
      getThisPlace(place);
      console.log('Deleting place: ', place);

      $http.delete('/locations/' + place._id).then(function(response){
          console.log(response);
      });
      getPlaces();
    },

    getuser : function(){
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
          } else {
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      });
    },

    submitAndUpdatePlace : function(location){
      console.log('Updating Place!', placeObject);
    //Send object to factory
      $http.put('/locations/submit', placeObject).then(function(response){
          console.log(response);
      });
    },

    updatePlace : function(location){
      console.log('Updating Place!', placeObject);
    //Send object to factory
      $http.put('/locations/update', placeObject).then(function(response){
          console.log(response);
      });
    },

    logout : function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path("/home");
        });
    }
  };
}]);
