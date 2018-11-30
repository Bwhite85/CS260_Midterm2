angular.module('shopping', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.products = [];
            $scope.purchased = [];
            $scope.getAll = function() {
                console.log("ran getAll function");
                return $http.get('/shopping').success(function(data) {
                    angular.copy(data, $scope.products);
                });
            };
            $scope.getAll();
            $scope.create = function(product) {
                return $http.post('/shopping', product).success(function(data) {
                    $scope.products.push(data);
                });
            };
            $scope.makePurchase = function() {
                console.log("In makePurchase");
                angular.forEach($scope.products, function(value, key) {
                    if (value.selected) {
                        $scope.finalizePurchase(value);
                        $scope.purchased.push(value);
                    }
                });
            }

            $scope.finalizePurchase = function(product) {
                return $http.put('/shopping/' + product._id + '/purchase')
                    .success(function(data) {
                        console.log("finalizePurchase worked");
                        product.timesPurchased += 1;
                    });
            };

            $scope.addProduct = function() {
                console.log("in addProduct function");
                var newObj = { Name: $scope.formContentName, price: $scope.formContentPrice, image: $scope.formContentURL, timesPurchased: 0 };
                $scope.create(newObj);
                $scope.formContentName = '';
                $scope.formContentPrice = '';
                $scope.formContentURL = '';
            };

            $scope.incrementPurchases = function(product) {
                $scope.finalizePurchase(product);
            };

            $scope.delete = function(product) {
                console.log("Deleting Name " + product.Name + " ID " + product._id);
                $http.delete('/shopping/' + product._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);
