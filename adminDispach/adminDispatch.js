// Filename: public/adminDispatch.js

//====================================================================================================
//============================================================         <SINGLE adminDispatch Function>
//====================================================================================================

//==========================================================================================
//==================================================                     <Small Group Block>

// ø <---------- <lotsOfStuffHere( whichStuff = 'All of It')>  ---------->
export function adminDispatch( paramObject = {}){
    let responseObject = {}
    responseObject.paramObject = paramObject
    responseObject.responseObject = {}
    responseObject.messagingObject = {}
    responseObject.messagingObject.affirmative = {}
    responseObject.messagingObject.negative = {}
    let call = typeof paramObject.call !== 'string' ? 'unsupported_string': paramObject.call
    switch (call) {
        case 'value':
            
            break;
    
        default:
            responseObject.messagingObject.negative.boolean = true
            responseObject.messagingObject.negative.message = `adminDispatch: call = ${call}: UNSUPPORTED`
            responseObject.messagingObject.negative.notes = ['the paramObject.call must be supported, please try again or ask for assistance']
            break;
    }
    return responseObject
}
// ø <---------- </lotsOfStuffHere( whichStuff = 'All of It')> ---------->

//==================================================                    </Small Group Block>
//==========================================================================================

//====================================================================================================
//============================================================        </SINGLE adminDispatch Function>
//====================================================================================================

//====================================================================================================
//============================================================                     <Large Group Block>
//====================================================================================================

//==========================================================================================
//==================================================                     <Small Group Block>

// ø <---------- <lotsOfStuffHere( whichStuff = 'All of It')>  ---------->
export function lotsOfStuffHere( whichStuff = 'All of It'){
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
    console.log(`Lots of Code...`)
}
// ø <---------- </lotsOfStuffHere( whichStuff = 'All of It')> ---------->

//==================================================                    </Small Group Block>
//==========================================================================================

//====================================================================================================
//============================================================                    </Large Group Block>
//====================================================================================================

//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================
