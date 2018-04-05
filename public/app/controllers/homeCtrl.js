// Sample Controller
angular.module('homeCtrl', ['homeService' ])
  
  .controller('homeController', function($rootScope, $location, $scope, $http) {
    
    var vm = this

    vm.commonHeaders = {
      'Content-Type': "application/json"
    }

    vm.selectedStock = ""
    vm.fundsToAdd = ""

    vm.userName = "Chrisanda"

    // vm.showBuyForm = true
    // vm.showFundsForm = true;
    // vm.showSellStocks = true;

    
    vm.stocks = [
      {
        name: 'MSFT',
        price: '34.35'
      },
      {
        name: 'GOGL',
        price: '35.78'
      },
      {
        name: 'AMZN',
        price: '36.35'
      }
    ]

    

    vm.addFunds = function() {
      vm.showFundsForm = true;
    }

    vm.confirmAddFunds = function(funds) {
      if (vm.fundsToAdd > 0) {
        var splited = vm.fundsToAdd.split(".")
        var body = {
          userid: '123',
          priceDollars: parseInt(splited[0]),
          priceCents: parseInt(splited[1]),
          command: 'add',
          commandNumber: 1
        }
        
        var reqOptions = {
          method: 'POST',
          url: 'api/addFunds',
          headers: vm.commonHeaders,
          data: body
         }

         $http(reqOptions)
          .then(function(results) {
            console.log('results are: ', results.data)
            if (results.data.success) {
              showSuccessAlert('Funds were added successfully!')
            } else {
              showErrorAlert('Something went wrong!')
            }
          }, function(err) {
            if (!results.data.success) {
              showErrorAlert('Something went wrong!')
            }
          })


      }
    }

    // SELL
    vm.confirmShareSell = function(funds) {
      if (vm.totalSharePrice > 0) {
        var splited = vm.totalSharePrice.split(".")
        var body = {
          userid: '123',
          priceDollars: parseInt(splited[0]),
          priceCents: parseInt(splited[1]),
          stock: 'S',
          command: 'sell',
          commandNumber: 1
        }
        
        var reqOptions = {
          method: 'POST',
          url: 'api/sell',
          headers: vm.commonHeaders,
          data: body
         }

         $http(reqOptions)
          .then(function(results) {
            console.log('results are: ', results.data)
            if (results.data.success) {
              showSuccessAlert('Funds were added successfully!')
              vm.showCommitSell = true;
              vm.showCancelSell = true;
            } else {
              showErrorAlert('Something went wrong!')
              // REMOVE LATER 
              vm.showCommitSell = true;
              vm.showCancelSell = true;
            }
          }, function(err) {
            if (!results.data.success) {
              showErrorAlert('Something went wrong!')
            }
          })
      }
    }

    // COMMIT_SELL
    vm.commitSell = function() {
      var body = {
        userid: '123',
        command: 'commit_sell',
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/commit_sell',
        headers: vm.commonHeaders,
        data: body
       }

       $http(reqOptions)
        .then(function(results) {
          console.log('results are: ', results.data)
          if (results.data.success) {
            showSuccessAlert('Sell was successfully commited!')
          } else {
            showErrorAlert('Something went wrong!')
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    // cancel_sell
    vm.cancelSell = function() {
      var body = {
        userid: '123',
        command: 'cancel_sell',
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/cancel_sell',
        headers: vm.commonHeaders,
        data: body
        }

        $http(reqOptions)
        .then(function(results) {
          console.log('results are: ', results.data)
          if (results.data.success) {
            showSuccessAlert('Sell was successfully cancelled!')
          } else {
            showErrorAlert('Something went wrong!')
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    // BUY
    vm.confirmShareBuy = function() {
      if (vm.totalSharePrice > 0) {
        var splited = vm.totalSharePrice.split(".")
        var body = {
          userid: '123',
          priceDollars: parseInt(splited[0]),
          priceCents: parseInt(splited[1]),
          command: 'buy',
          stock: 'S',
          commandNumber: 1
        }
        
        var reqOptions = {
          method: 'POST',
          url: 'api/buy',
          headers: vm.commonHeaders,
          data: body
         }

         $http(reqOptions)
          .then(function(results) {
            console.log('results are: ', results.data)
            if (results.data.success) {
              showSuccessAlert('Funds were added successfully!')
              vm.showCommitBuy = true;
              vm.showCancelBuy = true;
            } else {
              showErrorAlert('Something went wrong!')
              // REMOVE THIS LATER:
              vm.showCommitBuy = true;
              vm.showCancelBuy = true;
            }
          }, function(err) {
            console.log('err: ', err)
          })
      }
    }

    // COMMIT_BUY
    vm.commitBuy = function() {
      var body = {
        userid: '123',
        command: 'commit_buy',
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/commit_buy',
        headers: vm.commonHeaders,
        data: body
       }

       $http(reqOptions)
        .then(function(results) {
          console.log('results are: ', results.data)
          if (results.data.success) {
            showSuccessAlert('Buy was successfully commited!')
          } else {
            showErrorAlert('Something went wrong!')
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }


    // cancel_buy
    vm.cancelBuy = function() {
      var body = {
        userid: '123',
        command: 'cancel_buy',
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/cancel_buy',
        headers: vm.commonHeaders,
        data: body
        }

        $http(reqOptions)
        .then(function(results) {
          console.log('results are: ', results.data)
          if (results.data.success) {
            showSuccessAlert('Buy was successfully cancelled!')
          } else {
            showErrorAlert('Something went wrong!')
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    vm.getSummary = function() {
      var body = {
        userid: '123',
        command: 'display_summary',
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/display_summary',
        headers: vm.commonHeaders,
        data: body
        }

        $http(reqOptions)
        .then(function(results) {
          console.log('Display summary is are: ', results.data)
          if (results.data.success) {
            vm.userSummary = results.data.results
          } else {
            showErrorAlert('Something went wrong!')
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    showSuccessAlert = function(successAlertText) {
      vm.displaySuccessAlert = true
      vm.successAlertText = successAlertText
    }

    showErrorAlert = function(successAlertText) {
      vm.displayErrAlert = true
      vm.ErrAlertText = successAlertText
    }

    vm.getNewQuote = function(index) {
      console.log('Calling quote server', index)
      vm.showBuyForm = true;
    }


    makeHttpRequest = function(reqOptions) {
      var reqOptions = {
        method: 'POST',
        uri: 'http://localhost:'+ config.RPSPort + '/api/' + commandRequest.Command,
        body: {
          userid: commandRequest.UserId,
          priceDollars: parseFloat(commandRequest.PriceDollars),
          stock: commandRequest.Stock,
          command: commandRequest.Command,
          commandNumber: parseInt(commandRequest.CommandNumber)
        },
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          // if (result.statusCode == 200) {
          console.log('Results are:', result)
          sequentialPromiseExecution(commandRequestsArray, index + 1)
          // }
        })
        .catch(function (err) {
          console.log('#ERROR', err)
        })
    }
  })
  .directive('timer', function($timeout, $compile) {
    return {
      restrict: 'E',
      scope: {
        interval: '=', //don't need to write word again, if property name matches HTML attribute name
        startTimeAttr: '=?startTime', //a question mark makes it optional
        countdownAttr: '=?countdown' //what unit?
      },
      template: '<div ><p>'+
        '<p ng-show="!expired">Quote expires in :'+
        ' {{ seconds }} seconds </p> ' + 
        '<p ng-show="expired">Quote has expired! Please re-select the stock you want to buy</p>',
      
      link: function (scope, elem, attrs) {
      
        //Properties
        scope.startTime = scope.startTimeAttr ? new Date(scope.startTimeAttr) : new Date();
        scope.expired = false;
        var countdown = 5; //defaults to 60 seconds
        
        function tick () {
          
          //How many milliseconds have passed: current time - start time
          scope.millis = new Date() - scope.startTime;
          
          if (countdown > 0) {
            scope.millis = countdown * 1000;
            countdown--;
          } else if (countdown <= 0) {
            scope.stop();
            scope.expired = true
            console.log('Your time is up!');
          }
      
          scope.seconds = Math.floor((scope.millis / 1000) % 60);
          scope.minutes = Math.floor(((scope.millis / (1000 * 60)) % 60));
          scope.hours = Math.floor(((scope.millis / (1000 * 60 * 60)) % 24));
          scope.days = Math.floor(((scope.millis / (1000 * 60 * 60)) / 24));
      
          //is this necessary? is there another piece of unposted code using this?
          scope.$emit('timer-tick', {
            intervalId: scope.intervalId,
            millis: scope.millis
          });
          
          scope.$apply();
          
        }
        
        function resetInterval () {
          if (scope.intervalId) {
            clearInterval(scope.intervalId);
            scope.intervalId = null;
          }        
        }
        
        scope.stop = function () {
          scope.stoppedTime = new Date();
          resetInterval();
        }
        
        //if not used anywhere, make it a regular function so you don't pollute the scope
        function start () {
          resetInterval();
          scope.intervalId = setInterval(tick, scope.interval);           
        }
        
        scope.resume = function () {
          scope.stoppedTime = null;
          scope.startTime = new Date() - (scope.stoppedTime - scope.startTime);
          start();
        }
        
        start(); //start timer automatically
        
        //Watches
        scope.$on('time-start', function () {
          start();
        });
        
        scope.$on('timer-resume', function() {
          scope.resume();
        });
        
        scope.$on('timer-stop', function() {
          scope.stop();
        });
        
        //Cleanup
        elem.on('$destroy', function () {
          resetInterval();
        });
        
      }
    };
  });

