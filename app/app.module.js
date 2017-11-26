require('angular');
require('angular-route');
var dotenv = require('dotenv')
dotenv.config()

const Firebase = require('firebase'),
      TableController = require('./table/table.controller'),
      FileService = require('./file/file.service'),
      AWS = require('aws-sdk');
      AppRouteConfig = require('./app.routing.config')


angular.module('barksy', [
    'ngRoute'
])
.factory('FileService', FileService)
.constant('Firebase', Firebase)
.constant('AWS', AWS)
.config(['$routeProvider', AppRouteConfig])
.controller('TableController', TableController)

// firebase DB
var firebaseConfig = {
    apiKey: process.env.firebaseApiKey,
    authDomain: "barksy-homework.firebaseapp.com",
    databaseURL: "https://barksy-homework.firebaseio.com",
    projectId: "barksy-homework",
    storageBucket: "",
    messagingSenderId: "1021630299133"
  };
console.log(process.env.AWS_ACCESS_KEY_ID)

Firebase.initializeApp(firebaseConfig);

AWS.config.update({
    accessKeyId: "AKIAII356TOHSUUFZMRA",
    secretAccessKey: "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",
    region: "us-east-2"
})


