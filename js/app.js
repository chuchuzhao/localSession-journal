angular.module('myApp', [])
    .controller('demoCtrl', ['$scope', function ($scope) {
        
        $scope.taskList = [];

        $scope.addTask = function () {
            if ($scope.task) {
                $scope.taskList.push({
                    id: $scope.taskList.length + 1,
                    name: $scope.task,
                    isCompleted: false,
                    isEdit: false
                })
                // data.push ($scope.taskList) 
                //data = JSON.stringify(data)
                localStorage.setItem("taskList", angular.toJson($scope.taskList));
                $scope.task = '';


            } else {
                alert('请输入任务名称：');
            }
        }

        getLocalData();

        function getLocalData() {

            if (localStorage.getItem('taskList')) {

                $scope.taskList = angular.fromJson(localStorage.getItem('taskList'));

            }

        }

        $scope.$watch('taskList', function () {

            localStorage.setItem('taskList', angular.toJson($scope.taskList));

        }, true)

        $scope.deteleTask = function (id) {
            // console.log(id);
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].id == id) {
                    $scope.taskList.splice(i, 1);
                }
            }
        }


        $scope.countNum = function () {
            var count = 0;
            for (var i = 0; i < $scope.taskList.length; i++) {
                // console.log($scope.taskList.length);
                if ($scope.taskList[i].isCompleted == false) {
                    count++;
                }
            }
            return count;
        }


        $scope.condition = '';
        $scope.selectTask = function (seletor) {
            switch (seletor) {
                case 'All':
                    $scope.condition = '';
                    break;
                case 'Active':
                    $scope.condition = false;
                    break;
                case 'Completed':
                    $scope.condition = true;
                    break;
            }
        }


        $scope.selectCom = function () {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].isCompleted == true) {
                    $scope.taskList.splice(i, 1);
                    i--;
                }
            }
        }

        $scope.selsctAll = function () {
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isCompleted = $scope.status;
            }
        }


        $scope.changeStatus = function () {
            $scope.status = true;
            for (var i = 0; i < $scope.taskList.length; i++) {
                if (!$scope.taskList[i].isCompleted) {
                    $scope.status = false;
                }
            }
        }

        $scope.editTask = function (id) {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].id == id) {
                    $scope.taskList[i].isEdit = true;
                } else {
                    $scope.taskList[i].isEdit = false;
                }
            }
        }


        $scope.leaveIpt = function () {
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isEdit = false;
            }
        }


    }])