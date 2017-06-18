angular.module('tripoverflow').controller('qasController', qasController);

function qasController(qaDataFactory,$route, $routeParams, $window, AuthFactory, jwtHelper) {
  var vm = this;
  vm.title = 'TripOverflow Discussions';
  vm.isSubmitted = false;

  qaDataFactory.qaList().then(function(response) {
    // console.log(response);
    vm.quesans = response.data;
  });
  // qaDataFactory.postQuesans().then(function(response){
  //   console.log(response);
  // });


  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.addQuesans = function() {

    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var username = token.username;

    var postData = {
      name: username,
      // rating: vm.rating,
      qas: vm.newquesans,
      comments: null
    };
    if (vm.quesansForm.$valid) {
      qaDataFactory.postQuesans(postData).then(function(response) {
        if (response.status === 200) {

          // getQuesAns();

          qaDataFactory.qaList().then(function(response) {
            // console.log(response);
            vm.quesans = response.data;
          });

          vm.newquesans = '';
          // $route.reload();
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
  };

}
