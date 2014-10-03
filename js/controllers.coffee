'use strict'

ytControllers = angular.module('ytControllers', [])



ytControllers.controller('IndexCtrl', [
	'$scope'
	'$http'
	'contentfulClient'
	($scope, $http, contentfulClient) ->
		$scope.features = ''

		contentfulClient.entries({'content_type': 'tGyjv9K8h2kiGAW6qe2WI','include': 1}).then (data) ->
			console.log data
			$scope.features = data


])




ytControllers.controller('DetailCtrl', [
	'$scope'
	'$routeParams'
	'$http'
	'$location'
	'contentfulClient'
	'$sce'
	'heightService'
	($scope, $routeParams, $http, $location, contentfulClient, $sce, heightService) ->

		converter = new Showdown.converter()

		$scope.player = {}

		$scope.playerVars = {
		    controls: 0
		    autoplay: 0
		    modestbranding: 1
		    showinfo: 0
		    hd: 1
		}

		$scope.$on('youtube.player.ready', ($event, player) ->
			$scope.player = player
		)


	
		#GRAB DATA
		contentfulClient.entries({'sys.id': $routeParams.featureId, 'include': 10}).then (data) ->
			
			$scope.feature = data[0]

			$scope.fields = $scope.feature.fields


			

			for item in $scope.fields.youTubeListItems
				text = item.fields.bodyText
				text = converter.makeHtml(text)


			$scope.trust = (body) ->
				return $sce.trustAsHtml(body)


			
			#parse markdown
			$scope.fields.introText = converter.makeHtml($scope.fields.introText)
			
			#get array of all items to send to factory
			$scope.items = $scope.fields.youTubeListItems

		
			#add initial youtube
			$scope.video = $scope.items[0].fields.youTubeVideoId


			setTimeout(heightService.sendHeight, 2000)




])