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
  $scope.focus = false;
  $scope.currentFocus = null;

  Feature.getFeatures()
    .success(function(data) {
      $scope.features = data;
      $scope.tableKeys = Object.keys(data[0]);
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
    if (!$scope.focus) {
      angular.element(document.getElementsByClassName($scope.tableKeys[colidx+1])).css({opacity: 1});
      angular.element(document.getElementsByClassName(rowidx)).css({opacity: 1});
    }
  };
  $scope.removeHighlight = function(colidx, rowidx) {
    if (!$scope.focus) {
      angular.element(document.getElementsByClassName($scope.tableKeys[colidx+1])).css({opacity: 0.75});
      angular.element(document.getElementsByClassName(rowidx)).css({opacity: 0.75});
    }
  };
  $scope.displayFeature = function(idx) {
    var i;
    if ($scope.currentFocus === idx) {
      $scope.focus = false;
      $scope.currentFocus = null;
      for (i = 0; i < $scope.features.length; i++) {
          angular.element(document.getElementsByClassName(i)).css({opacity: 0.75});
      }
    }
    else {
      $scope.focus = true;
      $scope.currentFocus = idx;
      for (i = 0; i < $scope.features.length; i++) {
        if (i === idx) {
          angular.element(document.getElementsByClassName(i)).css({opacity: 1});
        }
        else {
          angular.element(document.getElementsByClassName(i)).css({opacity: 0.2});
        }
      }
    }
  };
});
