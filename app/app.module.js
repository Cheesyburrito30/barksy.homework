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
    apiKey: "AIzaSyB9Y9L-k-SIc0HtGNgiaaSrv6Tb0Qph93I",
    authDomain: "barksy-homework.firebaseapp.com",
    databaseURL: "https://barksy-homework.firebaseio.com",
    projectId: "barksy-homework",
    storageBucket: "",
    messagingSenderId: "1021630299133"
  };
console.log(process.env.AWS_ACCESS_KEY_ID)

Firebase.initializeApp(firebaseConfig);

AWS.config.update({
    accessKeyId: "AKIAIDAN42KGCFFNHODQ",
    secretAccessKey: "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",
    region: "us-east-2"
})


