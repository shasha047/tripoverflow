angular.module('tripoverflow').controller('qaController', qaController);

function qaController($route, $routeParams, $window, qaDataFactory, AuthFactory, jwtHelper) {
  var vm = this;
  var id = $routeParams.id;
  vm.isSubmitted = false;
  qaDataFactory.qaDisplay(id).then(function(response) {
    vm.quesans = response.data;
    // vm.stars = _getStarRating(response.data.stars);
  });

  // function _getStarRating(stars) {
  //   return new Array(stars);
  // }

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.addComment = function() {

    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var username = token.username;

    var postData = {
      name: username,
      // rating: vm.rating,
      comment: vm.comment
    };
    console.log(postData);
    if (vm.commentForm.$valid) {
      qaDataFactory.postComment(id, postData).then(function(response) {
        if (response.status === 200) {
          $route.reload();
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
  };

}
