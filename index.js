const express = require('express')
const path = require('path')
var app = express();
const moment=require('moment');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb =require ('mongodb');
var crypto =require('crypto');
var bodyParser =require('body-parser');
const { myDateTime } = require('../../../../mongonodejs/vijay/time');

app.set('port', (process.env.PORT || 3000));


let now=moment();

var MongoClient =mongodb.MongoClient;

var url ='mongodb://localhost:27017'

MongoClient.connect(url,{useNewUrlParser: true},function(err,client){
    if(err){
    console.log('unable to connect to the mongoDB server Error',err);
    }else{
      var dbo=client.db("vijay");
      
    console.log('mongodb connected successfully');
   
                // io connection
io.on('connection', function(socket){
  console.log('User Conncetion');
    socket.on('connect user', function(user){
    console.log("Connected"+user);
    console.log('socket connected successfully');
  })     

  var Date=now.format(now.format());


//            login details
  socket.on('login',function(name,userpassword){
    console.log(name,userpassword);
    var username={name:name};
    var userspassword={name:name,password:userpassword};
  
   dbo.collection("users").find(username).toArray(function(err,result){
      if(result[0]){
        console.log('user details have in database')
        dbo.collection("users").find(userspassword).toArray(function(err,result1){
          if(result1[0]){
            console.log('welcome to credenze');

            socket.emit('goto_dashboard');
            socket.on('location',function(latitude,longitude){
              console.log(latitude,longitude);
              var Date=now.format(now.format());
              var location={name:name,latitude,longitude,Date};
                           //Daily_Registration_collection
              dbo.collection("Daily_Registration").insertOne(location,function(err,res){
                if(err)

                 socket.on('hi',function(){
                  console.log('server running in site updates')
                });
                socket.on('site_location',function(lat,long){
                  console.log(lat,long);
                  empdetails={name:name,lat,long,Date,login_status:'loggedIn',logout_status:'-',site_update:'no'}
                  dbo.collection("site_details").insertOne(empdetails,function(err,res){
                  if(err)
                  console.log(err);
                  console.log("site updated");
                  socket.emit('site_location');
                  })
                })
                                          
                                          //logout details
                                         /* socket.on('logoutlocation',function(latitude1,longitude1){
                                            console.log(latitude1,longitude1);
                                            var location1={name:name,latitude1,longitude1,Date};
                                            dbo.collection("Daily_Registration").insertOne(location1,function(err,res){
                                              if(err)
                                              throw err;
                                              empdetails1={$set:{name:name,lat,long,login_status:'loggedIn',logout_status:'loggedout',site_update:'yes'}}
                                            dbo.collection("site_details").updateOne(empdetails,empdetails1,function(err,result){
                                              if(err)
                                              throw err;
                                              console.log('logout site_update');
                                            })
                                              
                                              console.log("logout location inserted");
                                            socket.emit('logout');
                                            })
                                          })*/
                                        
                                        });
                                      })

                                      //logout process

                                
              
          }else{
            console.log('password wrong');
          }
        })
        
      }else{

        console.log('user cannot registered')
      }
    })  
});
});
    }
});


http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})//////;


            //     emp_id
         /*   dbo.collection("users").find({},{projection:{name:name,emp_id:emp_id}}).toArray(function(err,details){
              if(err)
              throw err
              console.log(details);
            

            })*/

            //after login
            //   socket.on('login_date',function(){
              //  var logchek={$set:{name:name,login:'login',Date}};
             //   dbo.collection("login_check").updateOne(logcheck,function(err,result){
               //   if(err)
                 // throw err
                  //console.log('logchek db updated');
                //})
            //   })
                         