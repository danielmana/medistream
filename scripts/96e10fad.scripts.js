"use strict";angular.module("medistreamApp",["ngCookies","ngResource","ngSanitize","ngRoute","fmt","http-auth-interceptor","ui.bootstrap.carousel","ui.bootstrap.buttons"]).config(["$routeProvider","$httpProvider","$resourceProvider",function(a,b,c){a.when("/",{templateUrl:"views/landing.html",controller:"LandingCtrl"}).when("/events",{templateUrl:"views/events.html",controller:"EventsCtrl"}).when("/events/:id",{templateUrl:"views/event.html",controller:"EventCtrl"}).when("/talks/:id",{templateUrl:"views/talk.html",controller:"TalkCtrl"}).when("/collaborate",{templateUrl:"views/collaborate.html",controller:"CollaborateCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/account",{templateUrl:"views/account.html",controller:"AccountCtrl"}).when("/terms",{templateUrl:"views/terms.html",controller:"TermsCtrl"}).otherwise({redirectTo:"/"}),c.defaults.stripTrailingSlashes=!1,b.interceptors.push(function(){var a=function(a,b){var c=new RegExp("[?|&]"+a+"=([^&;]+?)(&|#|;|$)");return decodeURIComponent((c.exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||b},b=a("apiBasePath","/backend/api");return{request:function(a){return a.url=a.url.replace("API_BASE_PATH",b),a}}})}]).run(["$rootScope","$cookieStore","$http","$route","$location",function(a,b,c,d,e){var f=b.get("username"),g=b.get("djangotoken");f&&g&&(a.user={username:f},c.defaults.headers.common.Authorization="Token "+g),a.$on("event:auth-loginRequired",function(b,c){console.log("event:auth-loginRequired"),e.search("newUser",c.newUser?"true":"false"),a.loginRequired=!0}),a.$on("event:auth-loginConfirmed",function(d,f){console.log("event:auth-loginConfirmed"),b.put("djangotoken",f.token),b.put("username",f.username),c.defaults.headers.common.Authorization="Token "+f.token,a.user={username:f.username},e.search("newUser",null),a.loginRequired=!1}),a.$on("event:auth-loginCancelled",function(){console.log("event:auth-loginCancelled"),b.remove("djangotoken"),b.remove("username"),c.defaults.headers.common.Authorization=void 0,a.user=null,d.reload()}),a.$on("$routeChangeStart",function(b,c,d){d&&d.$$route&&"undefined"!=typeof c.params.newUser&&c.$$route.originalPath===d.$$route.originalPath||(a.loginRequired=!1)}),$(window).scroll(function(){return $(".animate-in").not(".hidden").each(function(a,b){return $(b).offset().top+80<$(window).height()+$(window).scrollTop()?$(b).removeClass("animate-in"):void 0})})}]),angular.module("medistreamApp").controller("HeaderCtrl",["$rootScope","$scope","$location","authService",function(a,b,c,d){b.isActive=function(a){return 0===c.path().indexOf("/"+a)},b.login=function(b){a.$broadcast("event:auth-loginRequired",{newUser:b})},b.logout=function(){d.loginCancelled({},"logout")}}]),angular.module("medistreamApp").controller("LandingCtrl",["$scope","$cookieStore",function(a,b){a.slides=[{image:"images/slide1.png",title:"Slide 1",description:"Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."},{image:"images/slide2.png",title:"Slide 2",description:"Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."}],a.specialities=["Dentistry","Anesthesia","Biomedicine","Pediatrics"],a.conf=b.get("conf")||{speciality:a.specialities[0]},a.$watch("conf",function(){b.put("conf",a.conf)},!0)}]),angular.module("medistreamApp").controller("EventsCtrl",["$scope","$location","EventResource",function(a,b,c){a.events=c.query(),a.select=function(a){b.path("events/"+a)}}]),angular.module("medistreamApp").controller("EventCtrl",["$scope","$routeParams","$filter","$location","EventResource","TalkResource",function(a,b,c,d,e,f){var g=b.id;a.event=e.get({id:g}),f.query({event:g},function(b){a.days=[],a.talksByDay={},angular.forEach(b,function(b){var d=new Date(b.start_time),e=c("date")(d,"longDate");a.days.indexOf(e)<0&&(a.days.push(e),a.talksByDay[e]=[]),a.talksByDay[e].push(b)})}),a.selectTalk=function(a){d.path("talks/"+a)}}]),angular.module("medistreamApp").controller("TalkCtrl",["$scope","$routeParams","EventResource","TalkResource",function(a,b,c,d){var e=b.id;d.get({id:e},function(b){a.talk=b,a.event=c.get({id:a.talk.event})})}]),angular.module("medistreamApp").controller("CollaborateCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("ContactCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("AccountCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("TermsCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").service("EventResource",["$resource",function(a){return a("API_BASE_PATH/events/:id/")}]),angular.module("medistreamApp").service("TalkResource",["$resource",function(a){return a("API_BASE_PATH/talks/:id/")}]),angular.module("medistreamApp").directive("login",["$rootScope","$http","$cookieStore","$location","authService",function(a,b,c,d,e){return{restrict:"A",templateUrl:"template/login/login.html",link:function(c){var d=function(a){var b=function(b){return b.headers.Authorization="Token "+a.token,b};e.loginConfirmed({username:c.username,token:a.token},b)};c.login=function(){b.post("API_BASE_PATH/api-token-auth/",{username:c.username,password:c.password}).success(d)},a.$on("$routeChangeStart",function(a,b){c.newUser="true"===b.params.newUser})}}}]),angular.module("medistreamApp").run(["$templateCache",function(a){a.put("template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n</div>\n'),a.put("template/carousel/slide.html","<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n"+'  }" class="item" ng-transclude style="width: 100%;"></div>\n'),a.put("template/login/login.html",'<div class="container" ng-hide="newUser">\n  <div class="row">\n    <div class="col-md-offset-4 col-md-4">\n      <h2>Please sign in</h2>\n\n      <form role="form" ng-submit="login()">\n        <div class="form-group">\n          <input type="text" class="form-control input-lg" id="inputEmail1" placeholder="Enter email" ng-model="username">\n        </div>\n        <div class="form-group">\n          <input type="password" class="form-control input-lg" id="inputPassword1" placeholder="Password" ng-model="password">\n        </div>\n        <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>\n      </form>\n    </div>\n  </div>\n</div>\n\n<h2 ng-show="newUser">Register</h2>')}]);