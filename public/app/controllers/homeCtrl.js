
// Sample Controller
angular.module('homeCtrl', ['homeService' ])
  
  .controller('homeController', function($rootScope, $location, $scope, $http, $compile) {
    
    var vm = this

    vm.commonHeaders = {
      'Content-Type': "application/json"
    }

    vm.selectedStock = ""
    vm.fundsToAdd = ""

    vm.userName = "123"

    // vm.showBuyForm = true
    // vm.showFundsForm = true;
    // vm.showSellStocks = true;
    // vm.showTriggers = true
    // vm.showQuote = true

    
    vm.stocks = [
      {
        name: 'MSFT'
      },
      {
        name: 'GOGL'
      },
      {
        name: 'AMZN'
      }
    ]

    vm.getDumplog = function() {
      var body = {
        userid: '123',
        command: 'dumplog',
        addToSummary: true,
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/dumplog',
        headers: vm.commonHeaders,
        data: body
       }

       $http(reqOptions)
        .then(function(results) {
          console.log('results are: ', results.data)
          if (results.data.success) {
            vm.dumplog = results.data
            showSuccessAlert('Dumplog was successful!')
          } else {
            showErrorAlert('Dumplog was not successful!')
          }
        }, function(err) {
          if (!results.data.success) {
            showErrorAlert(results.data.err.error.error)
          }
        })
    }

    startTimer = function(timerParentId) {
      var currentTimer = angular.element(document.getElementById('runningTimer'));
      if (currentTimer) {
        currentTimer.remove()
      }
      console.log('Starting timer now...')
      var timer = angular.element(document.createElement('timer'));
      timer.attr('interval', '1000');
      timer.attr('id', 'runningTimer');

      if (timerParentId === 'quoteTimerForSell') {
        timer.attr('timertype', 'sell');
      } else {
        timer.attr('timertype', 'buy');
      }
      
      var el = $compile(timer)($scope);

      angular.element(document.getElementById(timerParentId)).append(timer);

      $scope.insertHere = el;
    }

    vm.addFunds = function() {
      vm.showFundsForm = true;
    }

    vm.cancelSetBuyTrigger = function() {
      var body = {
        userid: '123',
        command: 'cancel_set_buy',
        stock: vm.buyTriggerStockName,
        addToSummary: true,
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/cancel_set_buy',
        headers: vm.commonHeaders,
        data: body
       }

       $http(reqOptions)
        .then(function(results) {
          console.log('results are: ', results.data)
          if (results.data.success) {
            showSuccessAlert('Cancel set buy was successful!')
          } else {
            showErrorAlert(results.data.err.error.error)
          }
        }, function(err) {
          if (!results.data.success) {
            showErrorAlert('Something went wrong!')
          }
        })
    }

    vm.cancelSetSellTrigger = function() {
      var body = {
        userid: '123',
        command: 'cancel_set_sell',
        stock: vm.sellTriggerStockName,
        addToSummary: true,
        commandNumber: 1
      }
      
      var reqOptions = {
        method: 'POST',
        url: 'api/cancel_set_sell',
        headers: vm.commonHeaders,
        data: body
       }

       $http(reqOptions)
        .then(function(results) {
          console.log('results are: ', results.data)
          if (results.data.success) {
            showSuccessAlert('Cancel set buy was successful!')
          } else {
            showErrorAlert(results.data.err.error.error)
          }
        }, function(err) {
          if (!results.data.success) {
            showErrorAlert('Something went wrong!')
          }
        })
    }

    vm.setSellAmount = function(funds) {
      if (vm.sellTriggerPrice > 0) {
        var body = {
          userid: '123',
          priceDollars: parseFloat(vm.sellTriggerPrice),
          priceCents: 0,
          command: 'set_sell_amount',
          stock: vm.sellTriggerStockName,
          addToSummary: true,
          commandNumber: 1
        }
        
        var reqOptions = {
          method: 'POST',
          url: 'api/set_sell_amount',
          headers: vm.commonHeaders,
          data: body
         }

         $http(reqOptions)
          .then(function(results) {
            console.log('results are: ', results.data)
            if (results.data.success) {
              showSuccessAlert('Set sell amount was successful!')
            } else {
              showErrorAlert(results.data.err.error.error)
            }
          }, function(err) {
            if (!results.data.success) {
              showErrorAlert('Something went wrong!')
            }
          })
      }
    }

    vm.confirmSellTrigger = function(funds) {
      if (vm.sellTriggerPrice > 0) {
        var body = {
          userid: '123',
          priceDollars: parseFloat(vm.sellTriggerPrice),
          priceCents: 0,
          command: 'set_sell_trigger',
          stock: vm.sellTriggerStockName,
          addToSummary: true,
          commandNumber: 1
        }
        
        var reqOptions = {
          method: 'POST',
          url: 'api/set_sell_trigger',
          headers: vm.commonHeaders,
          data: body
         }

         $http(reqOptions)
          .then(function(results) {
            console.log('results are: ', results.data)
            if (results.data.success) {
              showSuccessAlert('Set sell trigger was successful!')
            } else {
              showErrorAlert(results.data.err.error.error)
            }
          }, function(err) {
            if (!results.data.success) {
              showErrorAlert('Something went wrong!')
            }
          })
      }
    }

    vm.setBuyAmmount = function(funds) {
      if (vm.buyTriggerPrice > 0) {
        var body = {
          userid: '123',
          priceDollars: parseFloat(vm.buyTriggerPrice),
          priceCents: 0,
          command: 'set_buy_amount',
          stock: vm.buyTriggerStockName,
          addToSummary: true,
          commandNumber: 1
        }
        
        var reqOptions = {
          method: 'POST',
          url: 'api/set_buy_amount',
          headers: vm.commonHeaders,
          data: body
         }

         $http(reqOptions)
          .then(function(results) {
            console.log('results are: ', results.data)
            if (results.data.success) {
              showSuccessAlert('Set buy amount was successful!')
            } else {
              showErrorAlert(results.data.err.error.error)
            }
          }, function(err) {
            if (!results.data.success) {
              console.log('inhere: ', err)
              showErrorAlert('Something went wrong!')
            }
          })
      }
    }

    vm.confirmBuyTrigger = function(funds) {
      if (vm.buyTriggerPrice > 0) {
        var body = {
          userid: '123',
          priceDollars: parseFloat(vm.buyTriggerPrice),
          priceCents: 0,
          command: 'set_buy_trigger',
          stock: vm.buyTriggerStockName,
          addToSummary: true,
          commandNumber: 1
        }
        
        var reqOptions = {
          method: 'POST',
          url: 'api/set_buy_trigger',
          headers: vm.commonHeaders,
          data: body
         }

         $http(reqOptions)
          .then(function(results) {
            console.log('results are: ', results.data)
            if (results.data.success) {
              showSuccessAlert('Set buy trigger was successful!')
            } else {
              showErrorAlert('Set buy trigger was not successful!')
            }
          }, function(err) {
            if (!results.data.success) {
              showErrorAlert('Something went wrong!')
            }
          })
      }
    }

    vm.confirmAddFunds = function(funds) {
      if (vm.fundsToAdd > 0) {
        var body = {
          userid: '123',
          priceDollars: parseFloat(vm.fundsToAdd),
          priceCents: 0,
          command: 'add',
          addToSummary: true,
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
      startTimer('quoteTimerForSell')
      if (vm.totalSharePrice > 0) {
        var splited = vm.totalSharePrice.split(".")
        var body = {
          userid: '123',
          priceDollars: parseFloat(vm.totalSharePrice),
          priceCents: 0,
          stock: vm.selectedStock,
          command: 'sell',
          addToSummary: true,          
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
              showErrorAlert(results.data.err.error.error)
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
        addToSummary: true,        
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
            // showErrorAlert('Something went wrong!')
            showErrorAlert(results.data.err.error.error)
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    // cancel_sell
    vm.cancelSell = function() {
      var body = {
        userid: '123',
        addToSummary: true,
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
            showErrorAlert(results.data.err.error.error)
            // showErrorAlert('Something went wrong!')
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    // BUY
    vm.confirmShareBuy = function() {
      startTimer('quoteTimerForBuy')
      if (vm.totalSharePrice > 0) {
        var body = {
          userid: '123',
          priceDollars: parseFloat(vm.totalSharePrice),
          priceCents: 0,
          addToSummary: true,          
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
              showErrorAlert(results.data.err.error.error)
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
        addToSummary: true,        
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
            showErrorAlert(results.data.err.error.error)
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
        addToSummary: true,        
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
            showErrorAlert(results.data.err.error.error)

          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    vm.getSummary = function() {
      var body = {
        userid: '123',
        command: 'display_summary',
        addToSummary: true, 
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
            showErrorAlert(results.data.err.error.error)
          }
        }, function(err) {
          console.log('err: ', err)
        })
    }

    vm.getNewQuote = function(index, timerParentId) {
      console.log('Calling quote server for buy', index, timerParentId)
      var body = {
        userid: '123',
        command: 'quote',
        stock: vm.selectedStockName,
        addToSummary: true, 
        commandNumber: 1
      }

      var reqOptions = {
        method: 'POST',
        url: 'api/quote',
        headers: vm.commonHeaders,
        data: body
      }

      $http(reqOptions)
      .then(function(results) {
        console.log('Quote results are: ', results.data)
        if (results.data.success) {
          // startTimer(timerParentId)
          vm.selectedStockPrice = results.data.results.quote
        } else {
          showErrorAlert(results.data.err.error.error)
        }
      }, function(err) {
        console.log('err: ', err)
      })
    }

    // vm.getNewQuote = function(index) {
    //   console.log('Calling quote server for quote', index)
    //   var body = {
    //     userid: '123',
    //     command: 'quote',
    //     stock: index.name,
    //     commandNumber: 1
    //   }

    //   var reqOptions = {
    //     method: 'POST',
    //     url: 'api/quote',
    //     headers: vm.commonHeaders,
    //     data: body
    //   }

    //   $http(reqOptions)
    //   .then(function(results) {
    //     console.log('Quote results are: ', results.data)
    //     if (results.data.success) {
    //       startTimer('quoteTimer')
    //       vm.userSummary = results.data.results
    //       index.price = results.data.results.price
    //     } else {
    //       showErrorAlert('Something went wrong!')
    //     }
    //   }, function(err) {
    //     console.log('err: ', err)
    //   })
    // }

    showSuccessAlert = function(successAlertText) {
      vm.showAlert = true;
      vm.displaySuccessAlert = true
      vm.successAlertText = successAlertText
    }

    showErrorAlert = function(successAlertText) {
      vm.showAlert = true;
      vm.displayErrAlert = true
      vm.ErrAlertText = successAlertText
    }



    // vm.getNewQuote = function(index) {
    //   console.log('Calling quote server', index)
    //   startTimer('quoteTimer')
    // }
  })
  .directive('timer', function($timeout, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        interval: '=', //don't need to write word again, if property name matches HTML attribute name
        startTimeAttr: '=?startTime', //a question mark makes it optional
        countdownAttr: '=?countdown', //what unit?
        timertype: '=',
      },
      template: '<div ><p>'+
        '<p ng-show="!expired">Quote expires in :'+
        ' {{ seconds }} seconds </p> ' + 
        '<p ng-show="expired">Quote has expired! Please re-select the stock you want to buy</p>',
      
      link: function (scope, elem, attrs) {
      
        //Properties
        scope.startTime = scope.startTimeAttr ? new Date(scope.startTimeAttr) : new Date();
        scope.timerType = attrs.timertype
        console.log('TYPE: ',scope.timertype, scope , attrs)
        scope.expired = false;
        var countdown = 10; //defaults to 60 seconds
        
        function tick () {
          
          //How many milliseconds have passed: current time - start time
          scope.millis = new Date() - scope.startTime;
          // console.log('countdown is:', countdown)
          if (countdown > 0) {
            scope.millis = countdown * 1000;
            countdown--;
          } else if (countdown <= 0) {
            scope.stop();
            scope.expired = true
            console.log('Your time is up!');


            if (scope.timerType === 'sell') {
              var body = {
                userid: '123',
                command: 'cancel_sell',
                commandNumber: 1
              }
              
              var reqOptions = {
                method: 'POST',
                url: 'api/cancel_sell',
                headers:  {
                  'Content-Type': "application/json"
                },
                data: body
                }
        
                $http(reqOptions)
                .then(function(results) {
                  console.log('results are: ', results.data)
                  if (results.data.success) {
                    console.log('Buy was successfully cancelled!')
                  } else {
                    console.log('Something went wrong!')
                  }
                }, function(err) {
                  console.log('err: ', err)
                })
            } else {
              var body = {
                userid: '123',
                command: 'cancel_buy',
                commandNumber: 1
              }
              
              var reqOptions = {
                method: 'POST',
                url: 'api/cancel_buy',
                headers:  {
                  'Content-Type': "application/json"
                },
                data: body
                }
        
                $http(reqOptions)
                .then(function(results) {
                  console.log('results are: ', results.data)
                  if (results.data.success) {
                    console.log('Buy was successfully cancelled!')
                  } else {
                    console.log('Something went wrong!')
                  }
                }, function(err) {
                  console.log('err: ', err)
                })
            }
           
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

