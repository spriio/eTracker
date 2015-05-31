angular.module('charts.controllers', [])

.controller('chartsCtrl', function($scope, $http, $stateParams,$ionicLoading, $ionicPopover,$ionicPopup,$cordovaSQLite, $window) {

$scope.showreport_0 = function ()
{

	$scope.chartConfig = {

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Expenses'  
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
         series: [{
            type: 'pie',
            name: 'Expenses',
            data: [
                ['Transport',   45.0],
                ['Food',       26.8],
                {
                    name: 'Rent',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Electricity',    8.5],
                ['EMI',     6.2],
                ['Groceries',   0.7]
            ]
        }]



};
};

$scope.showreport_0();

});
