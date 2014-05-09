"use strict";angular.module("medistreamApp",["ngCookies","ngResource","ngSanitize","ngRoute","http-auth-interceptor","ui.bootstrap.carousel"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/landing.html",controller:"LandingCtrl"}).when("/events",{templateUrl:"views/events.html",controller:"EventsCtrl"}).when("/events/:id",{templateUrl:"views/event.html",controller:"EventCtrl"}).when("/videos/:id",{templateUrl:"views/video.html",controller:"VideoCtrl"}).when("/collaborate",{templateUrl:"views/collaborate.html",controller:"CollaborateCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/account",{templateUrl:"views/account.html",controller:"AccountCtrl"}).when("/terms",{templateUrl:"views/terms.html",controller:"TermsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("medistreamApp").controller("HeaderCtrl",["$scope","$window","$location",function(a,b,c){a.isActive=function(a){return 0===c.path().indexOf("/"+a)},a.signin=function(){a.user={name:"fake user"}},a.signout=function(){a.user=null}}]),angular.module("medistreamApp").controller("LandingCtrl",["$scope",function(a){var b=a.slides=[];a.addSlide=function(){var a=600+b.length;b.push({image:"http://placekitten.com/"+a+"/300",text:["More","Extra","Lots of","Surplus"][b.length%4]+" "+["Cats","Kittys","Felines","Cutes"][b.length%4]})};for(var c=0;4>c;c++)a.addSlide();a.slides=[{image:"images/slide1.png",title:"Slide 1",description:"Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."},{image:"images/slide2.png",title:"Slide 2",description:"Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."}]}]),angular.module("medistreamApp").controller("EventsCtrl",["$scope","EventResource",function(a,b){a.events=b.query()}]),angular.module("medistreamApp").controller("EventCtrl",["$scope","$routeParams","EventResource",function(a,b,c){a.event=c.get({id:b.id})}]),angular.module("medistreamApp").controller("VideoCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("CollaborateCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("ContactCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("RegisterCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("AccountCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("TermsCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").run(["$templateCache",function(a){a.put("template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n</div>\n'),a.put("template/carousel/slide.html","<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item\" ng-transclude></div>\n"),a.put("template/login/login.html",'<div class="container">\n  <div class="row">\n    <div class="col-md-offset-4 col-md-4">\n      <h2>Please sign in</h2>\n\n      <form role="form">\n        <div class="form-group">\n          <input type="text" class="form-control input-lg" id="inputEmail1" placeholder="Enter email" ng-model="username">\n        </div>\n        <div class="form-group">\n          <input type="password" class="form-control input-lg" id="inputPassword1" placeholder="Password" ng-model="password">\n        </div>\n        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>\n      </form>\n    </div>\n  </div>\n</div>')}]),angular.module("medistreamApp").service("EventResource",["$resource",function(a){return a("/api/events/:id")}]),angular.module("medistreamApp").directive("login",["$http","$cookieStore","authService",function(a,b,c){return{restrict:"A",templateUrl:"template/login/login.html",link:function(d,e){e.bind("submit",function(){a.post("http://localhost:8001/api-token-auth/",{username:d.username,password:d.password}).success(function(d){b.put("djangotoken",d.token),a.defaults.headers.common.Authorization="Token "+d.token,c.loginConfirmed(d)})})}}}]);