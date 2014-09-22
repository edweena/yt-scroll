'use strict'

ytServices = angular.module('ytServices', [])

ytServices.factory('addBG', ->

	addImage = (image) ->
		$('.hero').css
			'background': "url(#{image})"

	return {
		paste: (image) ->
			return addImage(image)
	}

)

ytServices.factory('heightService', ['$rootScope', ($rootScope) ->

	getHeight = ->
		return $(document).height()


	
	sendHeight = (height) ->
		message = {height: height}
		messageJSON = JSON.stringify(message)
		
		console.log messageJSON
		$rootScope.$broadcast('loaded')
				
		return window.parent.postMessage(messageJSON, '*')



	window.addEventListener('resize', ->
			sendHeight(getHeight())
		)


	return{
		sendHeight: ->
			return sendHeight(getHeight())
	}

])
