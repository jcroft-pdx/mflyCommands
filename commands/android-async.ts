import { guid } from './utils'

declare const InteractivesInterface: any

export interface InteractivesInterfaceResponse {
	data: any
	status: any
}

// dictionary guid -> anon funcions
var callbacks = {}

export function androidCallback(guid, data) {
	callbacks[guid](data)
	callbacks[guid] = null
}

export function callAndroid(verb, url, data = null) {

	var newGuid = guid()
	var deferred = $.Deferred()

	callbacks[newGuid] = (result: string) => {
		deferred.resolveWith(result)
	}

	InteractivesInterface.handleAsync(guid, url, verb, JSON.stringify(data))

	return deferred.promise()
}

export function InteractivesInterfaceIsDefined() {
	return typeof InteractivesInterface !== 'undefined'
}