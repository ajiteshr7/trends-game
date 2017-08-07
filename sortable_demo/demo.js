var myapp = angular.module('sortableApp', ['ui.sortable']);

//controller function 
myapp.controller('connectedController', function ($scope, $rootScope, $http, $window) {
  'use strict';
    var data = [];
    var tmpList = [];
    //setting the level of game
    $scope.level = "1"
    $scope.size = 8
    var setData = function (data) {
                for(var i = 0;i < tmpList.length; ++i)
                    tmpList[i].text = data[tmpList[i].value - 1];
            }
   

  $http({
                method: 'GET',
                url: 'https://trends.google.com/trends/hottrends/visualize/internal/data'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                // console.log(response.data.india);
                data = response.data.india;
                setData(response.data.india);
                console.log("the value of data is",response.data.india);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response, 'cant get data.');
            });
    //contains the data of right part
   $rootScope.rightArray = [];
           
            // random generated list
         
            for (var i = 1; i <= 8; i++) {
                tmpList.push({
                    text: ' ',
                    value: i
                });
            }
    //function to update list on reaching new levels
   var updateFunc = function(count){
        for (var i=1; i <= 10; i++)
            {
                tmpList.push({
                    text: ' ',
                    value: i
                });
            }
        setData(data);
        var m = tmpList.length,
                t, i;
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
    
  var m = tmpList.length,
                t, i;
            // While there remain elements to shuffle…
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = tmpList[m];
                tmpList[m] = tmpList[i];
                tmpList[i] = t;
            }
  //contains the data of left part
  $rootScope.leftArray = [];
  $rootScope.rightArray = tmpList;
    var isSorted = function(){

       for(var i=0;i<$scope.size;++i)
     {
      if(i+1!==$rootScope.leftArray[i].value)
       return false;
       if($rootScope.leftArray.length!=$scope.size)
        return false;
       
    }
   return true;
   }
  
    $scope.sortableOptions = {

 	stop: function(e, ui){
       var test = {
                        'e': e,
                        'ui': ui
                    }
     console.log($rootScope.leftArray);
	console.log($rootScope.rightArray);
    if(isSorted())
        {
            if($scope.level == "1")
           {$window.alert("you completed level 1!!");
            $scope.size = 10;
            updateFunc($scope.size)
            console.log(tmpList)
            $scope.level = "2"
            $rootScope.leftArray = []
            $rootScope.rightArray=tmpList
           }
            else if($scope.level == "2")
               {
                   $window.alert("you completed level 2!!");
                   $scope.size = 12;
                   updateFunc($scope.size)
                   console.log(tmpList)
                   $scope.level = "3"
                   $rootScope.leftArray = []
                    $rootScope.rightArray=tmpList
               }
            else if($scope.level == "3")
                {
                    $window.alert("congrats you won the game")
                }
        }
        if($rootScope.leftArray.length ===  $scope.size)
            {
                if(!isSorted())
                   {$window.alert("wrong order try again")
                    $rootScope.rightArray = $rootScope.leftArray
                    $rootScope.leftArray = []
                   }
            }
     },
         
     connectWith: '.connectedItemsExample .list'
                // update: function (e, ui) {
                //     //                    var logEntry = tmpList.map(function(i){
                //     //                        return i.value;
                //     //                    }).join(', ');
                //     //                    console.log('Update: ' + logEntry);
                //     // console.log({
                //     //     'tmpList': tmpList,
                //     //     'scopelist': $scope.items
                //     // })
                //     // console.log(isSorted(tmpList));
                // },
                
  };
  
});