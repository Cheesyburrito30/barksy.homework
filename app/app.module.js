require('angular');
require('angular-route');
var dotenv = require('dotenv')
dotenv.config()

const Firebase = require('firebase'),
      TableController = require('./table/table.controller'),
      ItemController = require('./item/item.controller')
      FileService = require('./file/file.service'),
      AWS = require('aws-sdk'),
      AppRouteConfig = require('./app.routing.config');


angular.module('barksy', [
    'ngRoute'
])
.factory('FileService', FileService)
.constant('Firebase', Firebase)
.constant('AWS', AWS)
.config(['$routeProvider', AppRouteConfig])
.controller('TableController', TableController)
.controller('ItemController', ItemController)

// firebase DB
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "barksy-homework.firebaseapp.com",
    databaseURL: "https://barksy-homework.firebaseio.com",
    projectId: "barksy-homework",
    storageBucket: "",
    messagingSenderId: "1021630299133"
  };

Firebase.initializeApp(firebaseConfig);


awsconfig = new AWS.Config()
awsconfig.accessKeyId = process.env.AWS_ACCESS_ID
awsconfig.secretAccessKey = process.env.AWS_SECRET_KEY
awsconfig.region = 'us-east-2'

