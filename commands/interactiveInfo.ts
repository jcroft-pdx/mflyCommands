import {getDeviceType, deviceTypes} from './device'
import { get } from './internalMethods'

export default function getInteractiveInfo () {

	let interactiveContext 
	
	try {
		interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext'])
	} catch (err) { }

	return get('interactive')
		.then(info => {
			if (!!interactiveContext) {

				switch (interactiveContext.type) {
					case 'collection':
						info.invokedFrom = 'collection'
						info.invokedFromId = interactiveContext.id
						return info

					case 'folder':
						info.invokedFrom = 'folder'
						info.invokedFromId = interactiveContext.parentSlug
						return info

					case 'search':
						info.invokedFrom = 'search'
						info.invokedFromTerm = interactiveContext.term
						return info
				
					default:
						return info
				}
			}

			return info
		})
}