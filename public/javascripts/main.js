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
      "yes": "rgb(104, 201, 116)",
      "no": "rgb(210, 109, 109)",
      "partial": "rgb(242, 171, 64)"
    };
    return featureTable[value] || "rgb(210, 109, 109)";
  };
  $scope.addHighlight = function(colidx, rowidx) {
    $("." + $scope.tableKeys[colidx+1]).css({opacity: 1});
    $("." + rowidx).css({opacity: 1});
  };
  $scope.removeHighlight = function(colidx, rowidx) {
    $("." + $scope.tableKeys[colidx+1]).css({opacity: 0.75});
    $("." + rowidx).css({opacity: 0.75});
  };
});
