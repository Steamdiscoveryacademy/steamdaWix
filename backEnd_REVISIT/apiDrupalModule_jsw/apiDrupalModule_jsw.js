//backend/apiDrupalModule.jsw

import {fetch} from 'wix-fetch'; 
import {getSecret} from 'wix-secrets-backend';


export async function getCurrentTemp(city) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
//   const key = await getSecret(WeatherApiKey);
  const key = await getSecret('WeatherApiKey');
  console.log(`key: ${key}`)
    
  let fullUrl = url + city + '&APPID=' + key + '&units=imperial'; 
  let options = {}
  options.method = 'get'
//   return fetch(fullUrl, {method: 'get'})
  return fetch(fullUrl, options )
    .then(response => response.json())
    .then(json => json);
}

//====================================================================================================
//============================================================                   <Core REST Functions>
//====================================================================================================

//==========================================================================================
//==================================================                       <Drupal Node GET>

export async function getDrupalNode(nid) {

    let thisDrupalObject = {}
    thisDrupalObject.verb = 'GET'
    thisDrupalObject.parameters = {}
    thisDrupalObject.parameters.nid = nid
    await loadDrupalObject(thisDrupalObject)
    console.log(`return thisDrupalObject`)
    //   const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    //   const url = thisDrupalObject.endpoint
    //   const key = await getSecret('drupalREST_maybe');
    //   const key = await getSecret('WeatherApiKey');
    //   console.log(`key: ${key}`)

    let fullUrl = thisDrupalObject.endpoint
    let options = {}
    // options.method = 'get'
    options.method = thisDrupalObject.verb
    // options.headers = {}
    // options.headers.authorization = thisDrupalObject.request.headers.authorization
	// options.headers.host = thisDrupalObject.request.headers.host
	// options.headers.accept = thisDrupalObject.request.headers.accept
	// options.headers['accept-encoding'] = thisDrupalObject.request.headers['accept-encoding']
	// options.headers.connection = thisDrupalObject.request.headers.connection
	// options.credentials = "include"
    return fetch(fullUrl, options)
        .then(response => response.json())
        .then(json => json);

    return thisDrupalObject
    return options
    return fullUrl
}
 
//==================================================                      </Drupal Node GET>
//==========================================================================================
 
//==========================================================================================
//==================================================                      <Drupal Node POST>
 

export async function postDrupalNode(body = 'COMPLEX_STRING') {
	if(body === 'COMPLEX_STRING'){
		return
	}
    let thisDrupalObject = {}
    thisDrupalObject.verb = 'POST'
    thisDrupalObject.parameters = {}
    // thisDrupalObject.parameters.nid = nid
    await loadDrupalObject(thisDrupalObject)
    console.log(`return thisDrupalObject`)
    //   const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    //   const url = thisDrupalObject.endpoint
    //   const key = await getSecret('drupalREST_maybe');
    //   const key = await getSecret('WeatherApiKey');
    //   console.log(`key: ${key}`)

    let fullUrl = thisDrupalObject.endpoint
    let options = {}
    // options.method = 'post'
    options.method = thisDrupalObject.verb
    options.headers = {}
    options.headers.authorization = thisDrupalObject.request.headers.authorization
    options.headers['content-type'] = thisDrupalObject.request.headers['content-type']
	// options.headers.host = thisDrupalObject.request.headers.host
	// options.headers.accept = thisDrupalObject.request.headers.accept
	// options.headers['accept-encoding'] = thisDrupalObject.request.headers['accept-encoding']
	// options.headers.connection = thisDrupalObject.request.headers.connection
	options.body = body
	options.credentials = "include"
    return fetch(fullUrl, options)
        .then(response => response.json())
        .then(json => json);

    return options
    return thisDrupalObject
    return fullUrl
}
 
//==================================================                     </Drupal Node POST>
//==========================================================================================
 
//==========================================================================================
//==================================================                     <Drupal Node PATCH>
 

export async function patchDrupalNode(nid = 7777777,body = 'COMPLEX_STRING') {
    let thisDrupalObject = {}
    thisDrupalObject.verb = 'PATCH'
	if(nid === 7777777){
        thisDrupalObject.validation = false
        thisDrupalObject.error = {}
        thisDrupalObject.error.string = `DEFAULT nid [${nid}] is Not Valid`
        thisDrupalObject.error.notes = []
        thisDrupalObject.error.notes.push(`default to obviate validation of type`)
        thisDrupalObject.error.notes.push(`can drupal handle 7 million nodes?`)
		return thisDrupalObject
	}
	if(body === 'COMPLEX_STRING'){
        thisDrupalObject.validation = false
        thisDrupalObject.error = {}
        thisDrupalObject.error.string = `DEFAULT body [${body}] is Not Valid`
        thisDrupalObject.error.notes = []
        thisDrupalObject.error.notes.push(`default to obviate validation of type`)
        thisDrupalObject.error.notes.push(`and pretty short`)
		return thisDrupalObject
	}
    thisDrupalObject.parameters = {}
    thisDrupalObject.parameters.nid = nid
    await loadDrupalObject(thisDrupalObject)
    // console.log(`thisDrupalObject: [object below]`)
    // console.dir(thisDrupalObject)
    
    console.log(`return thisDrupalObject`)
    //   const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    //   const url = thisDrupalObject.endpoint
    //   const key = await getSecret('drupalREST_maybe');
    //   const key = await getSecret('WeatherApiKey');
    //   console.log(`key: ${key}`)

    let fullUrl = thisDrupalObject.endpoint
    let options = {}
    // options.method = 'post'
    options.method = thisDrupalObject.verb
    options.headers = {}
    options.headers.authorization = thisDrupalObject.request.headers.authorization
    options.headers['content-type'] = thisDrupalObject.request.headers['content-type']
	// options.headers.host = thisDrupalObject.request.headers.host
	// options.headers.accept = thisDrupalObject.request.headers.accept
	// options.headers['accept-encoding'] = thisDrupalObject.request.headers['accept-encoding']
	// options.headers.connection = thisDrupalObject.request.headers.connection
	options.body = body
	options.credentials = "include"
    return fetch(fullUrl, options)
        .then(response => response.json())
        .then(json => json);

    return thisDrupalObject
    return options
    return options
    return thisDrupalObject
    return fullUrl
}
 
//==================================================                    </Drupal Node PATCH>
//==========================================================================================
 
//====================================================================================================
//============================================================                  </Core REST Functions>
//====================================================================================================
 
 
//====================================================================================================
//============================================================               <Esoteric REST Functions>
//====================================================================================================
 
//==========================================================================================
//==================================================              <Esoteric PATCH Functions>
 
 export async function patchDrupalNodeByKeyValuePairs(nid, keyValuePairObjectArray){}
 
 export async function patchDrupalNodeCoursesBySectionArray(nid, sectionObjectArray){}
 
//==================================================             </Esoteric PATCH Functions>
//==========================================================================================
 
//====================================================================================================
//============================================================              </Esoteric REST Functions>
//====================================================================================================
 
 
//====================================================================================================
//============================================================         <Esoteric Validation Functions>
//====================================================================================================
 
//==========================================================================================
//==================================================   <Esoteric PATCH Validation Functions>
 
export async function validateKeyValuePairObjectArray(contentType = 'page',kvpObjectArray = {},nid = 7777777){
    let validateValidator = nid !== 7777777 ? true : false
    if(validateValidator){
        collectValidKeyValuePairObjectArray_viaGET(contentType, nid)
        return
    }
    let supportedcontentTypeArray = ['page','courses']
    let responseObject = {}
    responseObject.isValid = false
    responseObject.title = 'Main Result'
    responseObject.descr = 'Longer Result'
    responseObject.notes = []
    responseObject.possibleElementCount = 0
    responseObject.validElementCount = 0
    responseObject.invalidElementCount = 0
    responseObject.invalidElementArray = []
    if(!supportedcontentTypeArray.includes(contentType)){
        responseObject.title = 'Unsupported Content Type'
        responseObject.descr = `The Content Type parameter [${contentType}] is NOT Supported at this time, please try again or ask for assistance.`
        return responseObject
    }
}

function collectValidKeyValuePairObjectArray_viaGET(contentType, nid){
    // MANUALLY MAINTAINED BY DEVELOPER
    let keyIgnoreArray = ['nid','uuid','vid','type','revision_timestamp','revision_uid','revision_log','uid','revision_translation_affected','path','menu_link']
    let keyIgnoreArrayByContentType = collectKeyIgnoreArrayByContentType(contentType)
    let keyIgnoreArrayAllThisContentType = [...keyIgnoreArray, ...keyIgnoreArrayByContentType]
    
    let HOLDER_STRING = `GET by nid: ${nid}`
    let responseObject = {}
    responseObject.note = HOLDER_STRING
    let allResponseKeysArray = Object.keys(responseObject)
}

function collectKeyIgnoreArrayByContentType(contentType){
    // MANUALLY MAINTAINED BY DEVELOPER
    let supportedContentTypeArray = ['courses']
    if(!supportedContentTypeArray.includes(contentType)){
        return []
    }
    let contentTypeKeyIgnoreObject = {}
    contentTypeKeyIgnoreObject.courses = {}
    contentTypeKeyIgnoreObject.courses.keyIgnoreArray = ['field_enrollexcptn','field_sectioncount','field_sections']

    return contentTypeKeyIgnoreObject[contentType]['keyIgnoreArray']
}
 
//==================================================  </Esoteric PATCH Validation Functions>
//==========================================================================================
 
//====================================================================================================
//============================================================        </Esoteric Validation Functions>
//====================================================================================================
 
//====================================================================================================
//============================================================               <Core Drupal REST Object>
//====================================================================================================
 
//==========================================================================================
//==================================================                 <loadDrupalObject>
export async function loadDrupalObject(drupalObject = {}){
    // const host = `dev-steamda.pantheonsite.io`
    const host = `live-steamda.pantheonsite.io`
    const url = `https://${host}/`
    const urlPathParam = `node/`
    // const secret = `UkVTVDpSM1NUc3QzQG1kQA==`
    const secret = await getSecret('drupalREST_maybe');
    const urlQueryFormatAppend = `?_format=json`
    // let parameter = 3473
    
    // let drupalObject = {}
    drupalObject.working = true
    // drupalObject.parameters = {}
    // drupalObject.parameters.nid = parameter
    drupalObject.authorization = {}
    drupalObject.authorization.kind = 'basic'
    drupalObject.authorization.secret = secret
    // drupalObject.authorization.header = `Basic UkVTVDpSM1NUc3QzQG1kQA==`
    drupalObject.authorization.header = secret
    drupalObject.request = {}
    drupalObject.request.headers = {}
    drupalObject.request.headers.host = host
    drupalObject.request.headers.accept = `*/*` // JUST DIRECT FROM POSTMAN
    drupalObject.request.headers['accept-encoding'] = `gzip, deflate, br` // JUST DIRECT FROM POSTMAN
    drupalObject.request.headers.connection = `keep-alive` // JUST DIRECT FROM POSTMAN
    drupalObject.request.headers.authorization = drupalObject.authorization.header
    drupalObject.variables = {}
    drupalObject.variables.url = url
    drupalObject.variables.urlPathParam = urlPathParam
    drupalObject.variables.urlQuery = urlQueryFormatAppend
    
    drupalObject.endpoint = drupalObject.variables.url
    drupalObject.endpoint +=            drupalObject.variables.urlPathParam
    let nidIncludedVerbs = ['GET','PATCH']
    if(nidIncludedVerbs.includes(drupalObject.verb)){
        drupalObject.endpoint +=            drupalObject.parameters.nid 
    }
    let contentTypeIncludedVerbs = ['POST','PATCH']
    if(contentTypeIncludedVerbs.includes(drupalObject.verb)){
        drupalObject.request.headers['content-type'] = `application/json`
    }
    drupalObject.endpoint +=            drupalObject.variables.urlQuery
    
    }
//==================================================                </loadDrupalObject>
//==========================================================================================
 
//====================================================================================================
//============================================================              </Core Drupal REST Object>
//====================================================================================================
    