var app = angular.module('tableizer', []);

app
.constant("FEAT_URL", {
  "API_URL": "http://localhost:3000"
})
.service('Feature', function($http, FEAT_URL) {
  this.getFeatures = function() {
    return $http.get(FEAT_URL.API_URL + "/data");
  };
})
.controller('MainCtrl', function($scope, Feature) {
  Feature.getFeatures()
    .success(function(data) {
      console.log(data);
      $scope.features = data;
      $scope.tableKeys = Object.keys(data[0]);
      console.log($scope.feaures);
    })
    .catch(function(err) {
      console.log(err);
    });
  $scope.checkFeature = function(value) {
    value = value.toLowerCase();
    var featureTable = {
      "yes": "green",
      "no": "red",
      "partial": "orange"
    };
    return featureTable[value] || "red";
  };
});
