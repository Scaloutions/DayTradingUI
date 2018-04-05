var bodyParser = require('body-parser') // get body-parser
  , jwt        = require('jsonwebtoken')
  , config     = require('../../config')
  , promise    = require('promise')
  , httpRequest = require('request-promise')

// super secret for creating tokens (if needed for auth)
var superSecret = config.secret

var ServerURL = "http://localhost:9090/api/"

var userHistory = []

constructRequestBody = function(incomingRequestBody) {
  return {
    userid: incomingRequestBody.userid,
    priceDollars: incomingRequestBody.priceDollars,
    priceCents: incomingRequestBody.priceCents,
    stock: incomingRequestBody.stock,
    command: incomingRequestBody.command,
    commandNumber: incomingRequestBody.commandNumber
  }
}

module.exports = function(app, express) {
  var apiRouter = express.Router();

  apiRouter.get('/', function (req, res) {
    res.json({ message: 'Woohoooo! Welcome to our api!'})
  })

  // //######################## MIDDLEWARE AUTHENTICATING TOKEN #############################
// //######################## All routes below this will pass through the middleware before being served #############################
  apiRouter.use(function(req, res, next) {
  console.log('Somebody just came to our app!');
  if (req.body.addToSummary) {
    userHistory.push(req.body)
  } 
  next(); // make sure we go to the next routes and don't stop here
  });

  // apiRouter.route('/quote')
  //   .post(function(req, res) {
  //     var stock = {
  //       stock: req.body.stock,
  //       price: Math.random()*200
  //     }
  //     res.json({ 
  //       success: true, 
  //       results: stock
  //     })
  //   })

  apiRouter.route('/display_summary')
    .post(function(req, res) {
      res.json({ success: true, results: userHistory})
    })

    apiRouter.route('/quote')
    .post(function(req, res) {
      var reqOptions = {
        method: 'POST',
        uri: ServerURL + req.body.command,
        body: constructRequestBody(req.body),
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          res.json({ success: true, results: result})
        })
        .catch(function (err) {
          console.log('#ERROR', err)
          res.json({ success: false, err: err})
        })
    })

    apiRouter.route('/dumplog')
    .post(function(req, res) {
      var reqOptions = {
        method: 'POST',
        uri: ServerURL + req.body.command,
        body: constructRequestBody(req.body),
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          res.json({ success: true, results: result})
        })
        .catch(function (err) {
          console.log('#ERROR', err)
          res.json({ success: false, err: err})
        })
    })
    

  apiRouter.route('/addFunds')
    .post(function(req, res) {
      var reqOptions = {
        method: 'POST',
        uri: ServerURL + req.body.command,
        body: constructRequestBody(req.body),
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          res.json({ success: true, results: result})
        })
        .catch(function (err) {
          console.log('#ERROR', err)
          res.json({ success: false, err: err})
        })
    })

    apiRouter.route('/set_buy_amount')
    .post(function(req, res) {
      var reqOptions = {
        method: 'POST',
        uri: ServerURL + req.body.command,
        body: constructRequestBody(req.body),
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          res.json({ success: true, results: result})
        })
        .catch(function (err) {
          console.log('#ERROR', err)
          res.json({ success: false, err: err})
        })
    })

    apiRouter.route('/set_buy_trigger')
    .post(function(req, res) {
      var reqOptions = {
        method: 'POST',
        uri: ServerURL + req.body.command,
        body: constructRequestBody(req.body),
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          res.json({ success: true, results: result})
        })
        .catch(function (err) {
          console.log('#ERROR', err)
          res.json({ success: false, err: err})
        })
    })

    apiRouter.route('/set_sell_amount')
    .post(function(req, res) {
      var reqOptions = {
        method: 'POST',
        uri: ServerURL + req.body.command,
        body: constructRequestBody(req.body),
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          res.json({ success: true, results: result})
        })
        .catch(function (err) {
          console.log('#ERROR', err)
          res.json({ success: false, err: err})
        })
    })

    apiRouter.route('/set_sell_trigger')
    .post(function(req, res) {
      var reqOptions = {
        method: 'POST',
        uri: ServerURL + req.body.command,
        body: constructRequestBody(req.body),
        json: true
      }
    
      httpRequest(reqOptions)
        .then(function (result) {
          res.json({ success: true, results: result})
        })
        .catch(function (err) {
          console.log('#ERROR', err)
          res.json({ success: false, err: err})
        })
    })


    apiRouter.route('/buy')
      .post(function(req, res) {
        var reqOptions = {
          method: 'POST',
          uri: ServerURL + req.body.command,
          body: constructRequestBody(req.body),
          json: true
        }
      
        httpRequest(reqOptions)
          .then(function (result) {
            res.json({ success: true, results: result})
          })
          .catch(function (err) {
            console.log('#ERROR', err)
            res.json({ success: false, err: err})
          })
      })

      apiRouter.route('/commit_buy')
      .post(function(req, res) {
        var reqOptions = {
          method: 'POST',
          uri: ServerURL + req.body.command,
          body: constructRequestBody(req.body),
          json: true
        }
      
        httpRequest(reqOptions)
          .then(function (result) {
            res.json({ success: true, results: result})
          })
          .catch(function (err) {
            console.log('#ERROR', err)
            res.json({ success: false, err: err})
          })
      })

      apiRouter.route('/cancel_buy')
      .post(function(req, res) {
        var reqOptions = {
          method: 'POST',
          uri: ServerURL + req.body.command,
          body: constructRequestBody(req.body),
          json: true
        }
      
        httpRequest(reqOptions)
          .then(function (result) {
            res.json({ success: true, results: result})
          })
          .catch(function (err) {
            console.log('#ERROR', err)
            res.json({ success: false, err: err})
          })
      })

      apiRouter.route('/sell')
      .post(function(req, res) {
        var reqOptions = {
          method: 'POST',
          uri: ServerURL + req.body.command,
          body: constructRequestBody(req.body),
          json: true
        }
      
        httpRequest(reqOptions)
          .then(function (result) {
            res.json({ success: true, results: result})
          })
          .catch(function (err) {
            console.log('#ERROR', err)
            res.json({ success: false, err: err})
          })
      })

      apiRouter.route('/commit_sell')
      .post(function(req, res) {
        var reqOptions = {
          method: 'POST',
          uri: ServerURL + req.body.command,
          body: constructRequestBody(req.body),
          json: true
        }
      
        httpRequest(reqOptions)
          .then(function (result) {
            res.json({ success: true, results: result})
          })
          .catch(function (err) {
            console.log('#ERROR', err)
            res.json({ success: false, err: err})
          })
      })

      apiRouter.route('/cancel_sell')
      .post(function(req, res) {
        var reqOptions = {
          method: 'POST',
          uri: ServerURL + req.body.command,
          body: constructRequestBody(req.body),
          json: true
        }
      
        httpRequest(reqOptions)
          .then(function (result) {
            res.json({ success: true, results: result})
          })
          .catch(function (err) {
            console.log('#ERROR', err)
            res.json({ success: false, err: err})
          })
      })



  
/*
################################ PROFILE ROUTE /ME ###########################################
*/
  // apiRouter.route('/me')
  //   .get(function(req, res) {
  //     res.send(req.decoded);
  // });


//########################################## Routes with localhost://users/:user id  #######################
  apiRouter.route('/users/:username')
    //(accessed at GET http://localhost:8080/api/users/:userid)
    // get the user with that id
    .get(function(req, res) {
      User.findOne({ username: req.params.username }, function(err, user) {
        if(err) throw err

        res.json({
          success: true
        , user: user
        })
        
        // console.log(user)
      })
    })

    // update the user with this id
    //(accessed at PUT http://localhost:8080/api/users/:userid)
    .put(function(req, res) {
      User.findOne({ username: req.params.username }, function(err, user) {

        if (err) res.send(err);

        // set the new user information if it exists in the request
        if (req.body.name) user.name = req.body.name
        if (req.body.last_name) user.last_name = req.body.last_name
        if (req.body.email) user.email = req.body.email
        if (req.body.gender) user.gender = req.body.gender

        // save the user
        user.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'User updated!' });
        });

      });
    })

    ////(accessed at DELETE http://localhost:8080/api/users/:userid)
    // delete the user with this id
    .delete(function(req, res) {
      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    });


  return apiRouter;
}
