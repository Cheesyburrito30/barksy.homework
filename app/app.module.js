require('angular');
require('angular-route');

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
var config = {
    apiKey: "AIzaSyB9Y9L-k-SIc0HtGNgiaaSrv6Tb0Qph93I",
    authDomain: "barksy-homework.firebaseapp.com",
    databaseURL: "https://barksy-homework.firebaseio.com",
    projectId: "barksy-homework",
    storageBucket: "",
    messagingSenderId: "1021630299133"
  };

Firebase.initializeApp(config);

AWS.config.update({
    accessKeyId: "AKIAII356TOHSUUFZMRA",
    secretAccessKey: "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",
    region: 'us-east-2'
})


