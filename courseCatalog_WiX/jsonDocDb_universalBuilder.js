let testKey = '1' 
let testName = 'TBD'
let testKind = 'section'
let paramObject_Location_CHOa = universalParamObjectBuilder(testKey, testName, testKind)
console.warn(`paramObject_Location_CHOa [object below]`)
console.warn(JSON.stringify(paramObject_Location_CHOa,undefined,4))

// let testKey = 'CHOa' // same for Location and Room
// let testName = 'CCS'
// let testKind = 'location'
// let paramObject_Location_CHOa = universalParamObjectBuilder(testKey, testName, testKind)
// console.warn(`paramObject_Location_CHOa [object below]`)
// console.warn(JSON.stringify(paramObject_Location_CHOa,undefined,4))

// let testKey = 'CHOa' // same for Location and Room
// let testName = '103-A'
// let testKind = 'room'
// let paramObject_Location_CHOa = universalParamObjectBuilder(testKey, testName, testKind)
// console.warn(`paramObject_Location_CHOa [object below]`)
// console.warn(JSON.stringify(paramObject_Location_CHOa,undefined,4))

//====================================================================================================
//============================================================              <Param Objects as Records>
//====================================================================================================

//==========================================================================================
//==================================================                             <Locations>
export function universalParamObjectBuilder(paramKey, paramName, paramKind) {
    let paramObject = {}
    paramObject.key = paramKey
    paramObject.name = paramName
    paramObject.notesToDelete = []
    paramObject.notesToDelete.push('universalParamObjectBuilder RUN')

    switch (paramKind) {
        case 'location':
            appendLocationCore(paramObject)
            break;
        case 'room':
            appendRoomCore(paramObject)
            break;
        case 'section':
            appendSectionCore(paramObject)
            break;

        default:
            break;
    }
    paramObject.notes = paramObject.notesToDelete
    delete paramObject.notesToDelete
    return paramObject
}
//==================================================                             </Locations>
//==========================================================================================

//====================================================================================================
//============================================================             </Param Objects as Records>
//====================================================================================================

//====================================================================================================
//============================================================                 <Param Objects as Core>
//====================================================================================================

//==========================================================================================
//==================================================                              <Location>
export function appendLocationCore(paramObject = {}) {
    paramObject.notesToDelete.push('appendLocationCore RUN')
    let defaultString = "holder"
    let emptyString = ''
    let defaultNumber = 777

    let stringAttributeArray = []
    let stringAttributeArray_EMPTY = []// often empty
    let numberAttributeArray = []
    let arrayAttributeArray = []
    //animals.push('chickens', 'cats', 'dogs');
    stringAttributeArray.push('region','nameFull', 'nameCommon', 'nameAbbrv', 'nameAcronym', 'street_1', 'street_2', 'city', 'state', 'zip', 'zipPlus')
    // ø <ONLY for emptyString default value NOT separate attributes>
    stringAttributeArray_EMPTY.push('nameAcronym')
    // ø </ONLY for emptyString default value NOT separate attributes>
    numberAttributeArray.push('latitude', 'longitude')
    
    
    let allAttributeArray = [...stringAttributeArray, ...numberAttributeArray, ...arrayAttributeArray]
    // console.warn(`allAttributeArray: `) 
    // console.dir(allAttributeArray) 
    for (let index = 0; index < allAttributeArray.length; index++) {
        const element = allAttributeArray[index];
        let value = defaultString
        value = stringAttributeArray.includes(element) ? defaultString : value
        value = stringAttributeArray_EMPTY.includes(element) ? emptyString : value
        value = numberAttributeArray.includes(element) ? defaultNumber : value
        paramObject[element] = value
    }
}
//==================================================                             </Location>
//==========================================================================================
//==========================================================================================
//==================================================                                  <Room>
export function appendRoomCore(paramObject = {}) {
    paramObject.notesToDelete.push('appendRoomCore RUN')
    let defaultString = "holder"
    let emptyString = ''
    let defaultNumber = 777
    let defaultArray = ['String One','String Two','String Three']
    
    let stringAttributeArray = []
    let stringAttributeArray_EMPTY = []// often empty
    let numberAttributeArray = []
    let arrayAttributeArray = []
    //animals.push('chickens', 'cats', 'dogs');
    // stringAttributeArray.push('nameFull', 'nameCommon', 'nameAbbrv', 'nameAcronym', 'street_1', 'street_2', 'city', 'state', 'zip', 'zipPlus')
    stringAttributeArray.push('roomNumber', 'roomTitle', )
    // ø <ONLY for emptyString default value NOT separate attributes>
    // stringAttributeArray_EMPTY.push('nameAcronym')
    // ø </ONLY for emptyString default value NOT separate attributes>
    // numberAttributeArray.push('latitude', 'longitude')
    arrayAttributeArray.push('roomAliases')
    
    
    let allAttributeArray = [...stringAttributeArray, ...numberAttributeArray, ...arrayAttributeArray]
    // console.warn(`allAttributeArray: `) 
    // console.dir(allAttributeArray) 
    for (let index = 0; index < allAttributeArray.length; index++) {
        const element = allAttributeArray[index];
        let value = defaultString
        value = stringAttributeArray.includes(element) ? defaultString : value
        value = stringAttributeArray_EMPTY.includes(element) ? emptyString : value
        value = numberAttributeArray.includes(element) ? defaultNumber : value
        value = arrayAttributeArray.includes(element) ? defaultArray : value
        if(element === 'roomNumber'){
            value = paramObject.name
            delete paramObject.name
        }
        
        paramObject[element] = value
    }
}
//==================================================                                 </Room>
//==========================================================================================
//==========================================================================================
//==================================================                               <Section>
export function appendSectionCore(paramObject = {}) {
    paramObject.notesToDelete.push('appendRoomCore RUN')
    // ø <defaultsObject>
    let defaultsObject = {}
    defaultsObject.roomNumber = 'TBD1'
    // ø </defaultsObject>
    // ø <Overloads>
    let overloadObject = {}
    overloadObject.key = 'sectionId'
    overloadObject.name = 'roomName'
    // ø </Overloads>
    let defaultString = "holder"
    let emptyString = ''
    let defaultNumber = 777
    let defaultArray = ['String One','String Two','String Three']
    
    let stringAttributeArray = []
    let stringAttributeArray_EMPTY = []// often empty
    let numberAttributeArray = []
    let arrayAttributeArray = []
    //animals.push('chickens', 'cats', 'dogs');
    // stringAttributeArray.push('nameFull', 'nameCommon', 'nameAbbrv', 'nameAcronym', 'street_1', 'street_2', 'city', 'state', 'zip', 'zipPlus')
    stringAttributeArray.push('sectionKey', "locationKey","courseName","curriculumKey","roomNumber","roomName")
    // ø <ONLY for emptyString default value NOT separate attributes>
    // stringAttributeArray_EMPTY.push('nameAcronym')
    // ø </ONLY for emptyString default value NOT separate attributes>
    numberAttributeArray.push('sectionId', "termId","weekId","curriculumId")
    // arrayAttributeArray.push('roomAliases')
    
    
    let allAttributeArray = [...stringAttributeArray, ...numberAttributeArray, ...arrayAttributeArray]
    allAttributeArray.sort()
    // console.warn(`allAttributeArray: `) 
    // console.dir(allAttributeArray) 
    for (let index = 0; index < allAttributeArray.length; index++) {
        const element = allAttributeArray[index];
        let value = defaultString
        value = stringAttributeArray.includes(element) ? defaultString : value
        value = stringAttributeArray_EMPTY.includes(element) ? emptyString : value
        value = numberAttributeArray.includes(element) ? defaultNumber : value
        value = arrayAttributeArray.includes(element) ? defaultArray : value
        value = typeof defaultsObject[element] !== 'undefined' ? defaultsObject[element] : value
        if(element === overloadObject.name){
            value = paramObject.name
            delete paramObject.name
        }
        if(element === overloadObject.key){
            value = paramObject.key
            delete paramObject.key
        }

        paramObject[element] = value
    }
}
//==================================================                              </Section>
//==========================================================================================
//====================================================================================================
//============================================================                </Param Objects as Core>
//====================================================================================================

//====================================================================================================
//============================================================                   <Actual Builder Code>
//====================================================================================================

//==========================================================================================
//==================================================                    <Main Function Call>

// ø <---------- <buildDocDbJSON(paramObject = {})>  ---------->
export function buildDocDbJSON(paramObject = {}) {

}
// ø <---------- </buildDocDbJSON(paramObject = {})> ---------->

//==================================================                   </Main Function Call>
//==========================================================================================

//====================================================================================================
//============================================================                  </Actual Builder Code>
//====================================================================================================

//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================
