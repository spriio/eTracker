angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$location) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addExpense.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
  
    $scope.modal.show();
  };
// Open the login modal
  $scope.addExpenseFunc = function() {
	$location.path('#/app/addExpense');
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('addExpenseCtrl', function($scope,$cordovaSQLite,$stateParams,$location) {
if ($stateParams.expensesId)
{
//alert("here : " + JSON.stringify($stateParams) );
	var query = "select title,amount,category,rowid from myExpenses where rowid= ? ";
		  $scope.expenses=[]; 
//(title, amount,category
		    $cordovaSQLite.execute(db, query,[$stateParams.expensesId]).then(function(res) {
				if(res.rows.length > 0) {
						$scope.expense = res.rows[0];
				}   
				console.log($scope.expense);
			}, function (err) {
				console.log(err);
			});
}

	$scope.submitExpense=function(expense){
		console.log(expense);
		var query;
		if (typeof $scope.expense === 'undefined' )
		{
		console.log($scope.expense );
		 query = "INSERT INTO myExpenses (title, amount,category) VALUES (?,?,?)";
		 		$cordovaSQLite.execute(db, query, [expense.title,expense.amount,expense.category]).then(function(res) {
		  console.log("insertId: " + res.insertId);
		  $location.path('#/app/expenses');
		  
		}, function (err) {
		  console.error(err);
		});
		}
		else{
		 query = "update myExpenses set title = ? , amount = ? ,category = ?  where rowid = ?";
		 		$cordovaSQLite.execute(db, query, [expense.title,expense.amount,expense.category,$scope.expense.rowid]).then(function(res) {
		  console.log("update: " + JSON.stringify(res));
		  $location.path('#/app/expenses');
		  
		}, function (err) {
		  console.error(err);
		});
		 }

	};
})

.controller('listExpenseCtrl', function($scope,$cordovaSQLite,$stateParams) {
		var query = "select title,amount,rowid from myExpenses";
		  $scope.expenses=[]; 
//(title, amount,category
		    $cordovaSQLite.execute(db, query).then(function(res) {
				if(res.rows.length > 0) {
					for(var i=0; i<res.rows.length; i++){
						$scope.expenses.push(res.rows[i]);
					}
					$scope.expensesCount = res.rows.length;
				}   
				//console.log($scope.expenses);
			}, function (err) {
				console.log(err);
			});

})

