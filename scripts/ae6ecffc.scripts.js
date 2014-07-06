"use strict";angular.module("medistreamApp",["ngCookies","ngResource","ngSanitize","ngRoute","fmt","http-auth-interceptor","ui.bootstrap.carousel","ui.bootstrap.buttons","ui.bootstrap.typeahead","pascalprecht.translate"]).config(["$routeProvider","$httpProvider","$resourceProvider","$translateProvider","$localeProvider",function(a,b,c,d,e){var f=localStorage.getItem("locale")||e.$get().id.split("-")[0];d.preferredLanguage(f),d.useStaticFilesLoader({prefix:"i18n/",suffix:".json"}),a.when("/",{templateUrl:"views/landing.html",controller:"LandingCtrl"}).when("/events",{templateUrl:"views/events.html",controller:"EventsCtrl"}).when("/events/:id",{templateUrl:"views/event.html",controller:"EventCtrl"}).when("/talks/:id",{templateUrl:"views/talk.html",controller:"TalkCtrl"}).when("/collaborate",{templateUrl:"views/collaborate.html",controller:"CollaborateCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/account",{templateUrl:"views/account.html",controller:"AccountCtrl"}).when("/terms",{templateUrl:"views/terms.html",controller:"TermsCtrl"}).otherwise({redirectTo:"/"}),c.defaults.stripTrailingSlashes=!1,b.interceptors.push(function(){var a=function(a,b){var c=new RegExp("[?|&]"+a+"=([^&;]+?)(&|#|;|$)");return decodeURIComponent((c.exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||b},b=a("apiBasePath","/backend/api");return{request:function(a){return a.url=a.url.replace("API_BASE_PATH",b),a}}})}]).run(["$rootScope","$cookieStore","$http","$route","$location",function(a,b,c,d,e){var f=b.get("username"),g=b.get("djangotoken");if(f&&g){a.user={username:f},c.defaults.headers.common.Authorization="Token "+g;var h=e.path();h&&"/"!==h||e.path("events")}a.$on("event:auth-loginRequired",function(b,c){console.log("event:auth-loginRequired"),e.search("newUser",c.newUser?"true":"false"),a.loginRequired=!0}),a.$on("event:auth-loginConfirmed",function(d,f){console.log("event:auth-loginConfirmed"),b.put("djangotoken",f.token),b.put("username",f.username),c.defaults.headers.common.Authorization="Token "+f.token,a.user={username:f.username},e.search("newUser",null),a.loginRequired=!1}),a.$on("event:auth-loginCancelled",function(){console.log("event:auth-loginCancelled"),b.remove("djangotoken"),b.remove("username"),c.defaults.headers.common.Authorization=void 0,a.user=null,d.reload()}),a.$on("$routeChangeStart",function(b,c,d){d&&d.$$route&&"undefined"!=typeof c.params.newUser&&c.$$route.originalPath===d.$$route.originalPath||(a.loginRequired=!1)}),$(window).scroll(function(){return $(".animate-in").not(".hidden").each(function(a,b){return $(b).offset().top+80<$(window).height()+$(window).scrollTop()?$(b).removeClass("animate-in"):void 0})})}]),angular.module("medistreamApp").controller("HeaderCtrl",["$rootScope","$scope","$location","authService",function(a,b,c,d){b.isActive=function(a){return 0===c.path().indexOf("/"+a)},b.showLogin=function(b){a.$broadcast("event:auth-loginRequired",{newUser:b})},b.logout=function(){d.loginCancelled({},"logout")}}]),angular.module("medistreamApp").controller("FooterCtrl",["$scope","$translate",function(a,b){a.getCurrentLanguageName=function(b){return _.findWhere(a.languages,{locale:b})},a.setLocale=function(c){b.use(c),localStorage.setItem("locale",c),a.currentLocale=c},a.languages={en:"English",es:"Español",ca:"Català"},a.currentLocale=b.use()}]),angular.module("medistreamApp").controller("LandingCtrl",["$rootScope","$scope","$cookieStore",function(a,b,c){b.slides=[{image:"images/slide1.png",title:"Slide 1",description:"Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."},{image:"images/slide2.png",title:"Slide 2",description:"Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."}],b.showLogin=function(b){a.$broadcast("event:auth-loginRequired",{newUser:b})},b.specialities=["Dentistry","Anesthesia","Biomedicine","Pediatrics"],b.conf=c.get("conf")||{speciality:b.specialities[0]},b.$watch("conf",function(){c.put("conf",b.conf)},!0)}]),angular.module("medistreamApp").controller("EventsCtrl",["$scope","$location","EventResource",function(a,b,c){a.events=c.query(),a.select=function(a){b.path("events/"+a)}}]),angular.module("medistreamApp").controller("EventCtrl",["$scope","$routeParams","$filter","$location","EventResource","TalkResource",function(a,b,c,d,e,f){var g=b.id;a.event=e.get({id:g}),f.query({event:g},function(b){a.days=[],a.talksByDay={},angular.forEach(b,function(b){var d=new Date(b.start_time),e=c("date")(d,"longDate");a.days.indexOf(e)<0&&(a.days.push(e),a.talksByDay[e]=[]),a.talksByDay[e].push(b)})}),a.selectTalk=function(a){d.path("talks/"+a)}}]),angular.module("medistreamApp").controller("TalkCtrl",["$scope","$routeParams","EventResource","TalkResource",function(a,b,c,d){var e=b.id;d.get({id:e},function(b){a.talk=b,a.event=c.get({id:a.talk.event})})}]),angular.module("medistreamApp").controller("CollaborateCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("ContactCtrl",["$scope","$http",function(a,b){var c=function(){a.response="success",a.email=a.name=a.phone=a.message=null},d=function(){a.response="error"};a.send=function(){a.response=null,b.post("API_BASE_PATH/contact/",{email:a.email,name:a.name,phone:a.phone,message:a.message}).success(c).error(d)}}]),angular.module("medistreamApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").controller("AccountCtrl",["$scope","UserResource","SpecialityResource",function(a,b,c){a.user=b.get({action:"current"}),a.specialities=c.query(),a.submit=function(){a.error=null,a.success=!1,a.user.$save({action:"current"},function(b){a.success=b},function(b){a.error=b.data})}}]),angular.module("medistreamApp").controller("TermsCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("medistreamApp").service("UserResource",["$resource",function(a){return a("API_BASE_PATH/users/:id/:action/")}]),angular.module("medistreamApp").service("EventResource",["$resource",function(a){return a("API_BASE_PATH/events/:id/")}]),angular.module("medistreamApp").service("TalkResource",["$resource",function(a){return a("API_BASE_PATH/talks/:id/")}]),angular.module("medistreamApp").service("SpecialityResource",["$resource",function(a){return a("API_BASE_PATH/specialities/:id/")}]),angular.module("medistreamApp").directive("login",["$rootScope","$http","$cookieStore","$location","UserResource","SpecialityResource","authService",function(a,b,c,d,e,f,g){return{restrict:"A",templateUrl:"template/login/login.html",link:function(c){c.specialities=f.query();var h=function(a){c.error=null;var b=function(b){return b.headers.Authorization="Token "+a.token,b};g.loginConfirmed({username:c.email,token:a.token},b)};c.login=function(){b.post("API_BASE_PATH/api-token-auth/",{username:c.email,password:c.password}).success(h).error(function(a){c.error=a})},c.register=function(){var a={username:c.email,email:c.email,password:c.password,speciality:c.speciality};e.save({action:"register"},a,function(a){c.error=null,c.login(a)},function(a){c.error=a.data})},c.setNewUser=function(a){d.search("newUser",a?"true":"false")},a.$on("$routeChangeStart",function(a,b){c.newUser="true"===b.params.newUser})}}}]),angular.module("medistreamApp").directive("cookiesAlert",["$cookieStore",function(a){return{restrict:"A",templateUrl:"template/cookies/cookies-alert.html",link:function(b,c){b.setCookieLawAccepted=function(){a.put("cookielaw",!0)},a.get("cookielaw")&&c.hide()}}}]),angular.module("medistreamApp").run(["$templateCache",function(a){a.put("template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n</div>\n'),a.put("template/carousel/slide.html","<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n"+'  }" class="item" ng-transclude style="width: 100%;"></div>\n'),a.put("template/cookies/cookies-alert.html",'<div class="alert alert-info alert-dismissable" style="margin-bottom: 0;">\n  <button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="setCookieLawAccepted()">&times;</button>\n  This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.\n  <a href="#terms">Find out more here</a>\n</div>'),a.put("template/login/login.html",'<div class="container">\n  <div class="row">\n    <div class="col-md-offset-4 col-md-4">\n\n      <!-- Login -->\n      <form ng-hide="newUser" name="formLogin" role="form" ng-submit="login()">\n        <h1 class="page-header">Log in</h1>\n        <div class="alert alert-danger" ng-if="error">\n          <strong>Invalid username or password.</strong>\n        </div>\n        <div class="form-group">\n          <label class="control-label" for="inputEmail1">Email</label>\n          <input type="email" class="form-control" id="inputEmail1" ng-model="email" placeholder="Email" autofocus required>\n        </div>\n        <div class="form-group">\n          <label class="control-label" for="inputPassword1">Password</label>\n          <input type="password" class="form-control" id="inputPassword1" ng-model="password" placeholder="Password" required>\n        </div>\n        <div class="form-group">\n          <button type="submit" class="btn btn-primary btn-block" ng-disabled="formLogin.$invalid">Log in</button>\n        </div>\n        <div class="form-group">\n          <small>Don\'t have an account? <a href="" ng-click="setNewUser(true)">Register</a>.\n          </small>\n        </div>\n      </form>\n      <!-- Login end ### -->\n\n      <!-- Register -->\n      <form ng-show="newUser" name="formRegister" role="form" ng-submit="register()">\n        <h1 class="page-header">Join Medistream</h1>\n        <div class="alert alert-danger" ng-if="error">\n          <strong>There were problems creating your account.</strong><br>\n          <ul>\n            <li ng-if="error.username">{{error.username[0]}}</li>\n          </ul>\n        </div>\n        <div class="form-group">\n          <label class="control-label" for="inputEmail">Email address</label>\n          <input type="email" class="form-control" id="inputEmail" ng-model="email" placeholder="Email" required>\n        </div>\n        <div class="form-group">\n          <label class="control-label" for="inputPassword">Password</label>\n          <input type="password" class="form-control" id="inputPassword" ng-model="password" placeholder="Password" required>\n        </div>\n        <div class="form-group" ng-class="{\'has-error\': passwordRepeat && passwordRepeat !== password}">\n          <label class="control-label" for="inputPasswordRepeat">Repeat password</label>\n          <input type="password" class="form-control" id="inputPasswordRepeat" ng-model="passwordRepeat" placeholder="Repeat password" required>\n        </div>\n        <div class="form-group" ng-class="{\'has-error\': !speciality.id}">\n          <label class="control-label" for="inputSpeciality">Speciality</label>\n          <input type="text" id="inputSpeciality" class="form-control" placeholder="Speciality"\n                 typeahead="speciality as speciality.name for speciality in specialities | filter:$viewValue"\n                 ng-model="speciality" typeahead-editable="false">\n        </div>\n        <div class="form-group">\n          <small>By clicking on "Create an account" below, you are agreeing to the <a href="#terms" target="_blank">Terms\n            of Service</a> and the <a href="#terms" target="_blank">Privacy Policy</a>.\n          </small>\n        </div>\n        <div class="form-group">\n          <button type="submit" class="btn btn-primary btn-block" ng-disabled="formRegister.$invalid || passwordRepeat!==password">Create an account</button>\n        </div>\n        <div class="form-group">\n          <small>Already a Medistream member? <a href="" ng-click="setNewUser(false)">Log in</a>.\n          </small>\n        </div>\n      </form>\n      <!-- Register end ### -->\n    </div>\n  </div>\n</div>\n'),a.put("template/typeahead/typeahead-match.html",'<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>'),a.put("template/typeahead/typeahead-popup.html","<ul class=\"dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n"+'    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>')}]);