import { masker } from "./masker.js"

document.addEventListener("DOMContentLoaded", () => {
  masker()

  var app = angular.module('app',[]);

  app.controller('formController', ($scope) =>{
    $scope.formData = {
      name: "",
      work: "",
      country: "",
      relation: "",
      socialSecurity: ""
    }

    $scope.showModal = false
    $scope.showDoc = false
    
    $scope.setInput = (event, value) => {
      $scope.formData[value] = event.formData[value]
    }
    
    $scope.disableModal = () => {
      $scope.showDoc = false
    }
    
    $scope.createDoc = (event) => {
      $scope.showModal = true
      console.log($scope.formData)
    }
    //codigo aqui

    console.log($scope.formData)
  });
})