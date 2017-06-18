angular.module('tripoverflow').factory('qaDataFactory', qaDataFactory);

function qaDataFactory($http) {
  return {
    qaList: qaList,
    qaDisplay: qaDisplay,
    postComment: postComment,
    postQuesans: postQuesans
  };

  function qaList() {
    return $http.get('/api/quesans/').then(complete).catch(failed);
  }

  function postQuesans(quesans) {
    return $http.post('/api/quesans/',quesans).then(complete).catch(failed);
  }

  function qaDisplay(id) {
    return $http.get('/api/quesans/' + id).then(complete).catch(failed);
  }

  function postComment(id, comment) {
    return $http.post('/api/quesans/' + id + '/comments', comment).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}
