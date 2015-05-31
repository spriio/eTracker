// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','category.controllers','highcharts-ng','charts.controllers','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	    ionic.Platform.isFullScreen = true;



if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "expense.db" }); //device
    }else{
      db = window.openDatabase("expense.db", '1', 'my', 1024 * 1024 * 100); // browser
    }


	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS myExpenses (title varchar(40) NOT NULL,amount float(11) DEFAULT NULL,category varchar(20) NOT NULL)");
	
	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS myCategory (title varchar(40) NOT NULL)");


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.expenses', {
      url: "/expenses",
      views: {
        'menuContent': {
          templateUrl: "templates/expenses.html",
          controller: 'listExpenseCtrl'
        }
      }
    }) 
	.state('app.addExpense', {
      url: "/addExpense",
      views: {
        'menuContent': {
          templateUrl: "templates/addExpense.html",
          controller: 'addExpenseCtrl'
        }
      }
    })
.state('app.addCategory', {
      url: "/addCategory",
      views: {
        'menuContent': {
          templateUrl: "templates/addCategory.html",
          controller: 'addCategoryCtrl'
        }
      }
    })
.state('app.charts', {
      url: "/charts",
      views: {
        'menuContent': {
          templateUrl: "templates/charts.html",
          controller: 'chartsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/expense/:expensesId",
    views: {
      'menuContent': {
        templateUrl: "templates/addExpense.html",
        controller: 'addExpenseCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/expenses');
});
