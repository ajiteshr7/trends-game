(function () {

    'use strict';

    angular.module('gameApp', ['ui.sortable'])
        .controller('ListController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
            var data = [];
            $http({
                method: 'GET',
                url: 'https://trends.google.com/trends/hottrends/visualize/internal/data'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                // console.log(response.data.india);
                setData(response.data.india);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response, 'cant get data.');
            });

            var setData = function (data) {
                for (var i = 0; i < tmpList.length; ++i)
                    tmpList[i].text = data[tmpList[i].value - 1];
            }

            $scope.items = [];
            var tmpList = [];
            // random generated list
            for (var i = 1; i < 8; i++) {
                tmpList.push({
                    text: ' ',
                    value: i
                });
            }

            var shuffleList = function(){
                var m = tmpList.length, t, i;
                // While there remain elements to shuffle…
                while (m) {
                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);

                    // And swap it with the current element.
                    t = tmpList[m];
                    tmpList[m] = tmpList[i];
                    tmpList[i] = t;
                }
            }

            // To check is list sorted
            var isSorted = function () {
                for (var i = 0; i < tmpList.length; ++i) {
                    if (i + 1 !== tmpList[i].value) {
                        // console.log('Not equal: ', i+1, '& ', tmpList);
                        return false;
                    }
                }
                return true;
            }

            $scope.items = tmpList;

            $scope.sortableOptions = {
                stop: function (e, ui) {
                        // var test = {
                        //     'e': e,
                        //     'ui': ui
                        // }
                        // var logEntry = tmpList.map(function (i) {
                        //     return i.value;
                        // }).join(', ');
                        // console.log('Change: ' + logEntry);
                        // console.log(isSorted());
                        if(isSorted())
                            $window.alert("You got it right!");
                        // console.log(test);
                }
            };
        }]);
})();