angular.module('category.controllers',[])

.controller('addCategoryCtrl', function($scope,$cordovaSQLite) {

	$scope.submitCategory=function(category){
		
			console.log(category);
		var query = "INSERT INTO myCategory (title) VALUES (?)";
		$cordovaSQLite.execute(db, query, [category.title]).then(function(res) {
		  console.log("insertId: " + res.insertId);
		}, function (err) {
		  console.error(err);
		});
	};
});
