console.log('<PRS: entering>')

let bradUID = 'braddevel'
let restUID = 'REST'

let blockUsed = false
let blockUsedName = 'NNULL'
let blockSetName = 'BASE'
blockSetName = 'SPECIFIED_TARGET'
blockSetName = 'NORMAL_ITERATIVE_STEPPING'

if(blockSetName === 'BASE'){
    // » <>
    // » <BASE>
    // » <BASE Obama>
    pm.globals.set("elementMaxChanged", "2008-01-20T12:00:00+0000") /* ø NOTE: drupal.changed ISO format*/
    pm.globals.set("elementMaxChangedGathered", "2022-12-01T23:59:59.001Z") /* ø NOTE: postman {{$isoTimestamp}} ISO format*/

    console.log(`PRS: [${blockSetName}] pm.globals.get("elementMaxChanged"): ${pm.globals.get("elementMaxChanged")}`)
    // » </BASE Obama>
    // » </BASE>
    // » </>
    blockUsedName = blockSetName
    blockUsed = true
}


if(blockSetName === 'SPECIFIED_TARGET'){
    // » <>
    // » <SPECIFIED_TARGET>
    // » <SPECIFIED_TARGET> <PRIOR-TO Check-In Difficulties>
    
    // pm.globals.set("elementMaxChanged", "2022-11-16T23:59:59+0000")
    // pm.globals.set("elementMaxChangedGathered", "2022-12-01T23:59:59.002Z")

    pm.globals.set("elementMaxChanged", "2022-11-28T06:37:36+0000")
    pm.globals.set("elementMaxChangedGathered", "2022-12-03T14:03:19.764Z")
    
    console.log(`PRS: [${blockSetName}] pm.globals.get("elementMaxChanged"): ${pm.globals.get("elementMaxChanged")}`)
    // » </SPECIFIED_TARGET> <PRIOR-TO Check-In Difficulties>
    // » </SPECIFIED_TARGET>
    // » </>
    blockUsedName = blockSetName
    blockUsed = true
}

if(blockSetName === 'NORMAL_ITERATIVE_STEPPING'){
    // » <>
    // » <NORMAL_ITERATIVE_STEPPING>
    // » <NORMAL_ITERATIVE_STEPPING> ["maxChanged" as of Previous 'ACTION INDICATED RUN']
    // » <NORMAL_ITERATIVE_STEPPING> [two lines below direct copy from console.log]
    pm.globals.set("elementMaxChanged", "2022-11-28T06:37:36+0000")
    pm.globals.set("elementMaxChangedGathered", "2022-12-03T13:16:07.223Z")

    console.log(`PRS: [${blockSetName}] pm.globals.get("elementMaxChanged"): ${pm.globals.get("elementMaxChanged")}`)
    // » </NORMAL_ITERATIVE_STEPPING> [two lines below direct copy from console.log]
    // » </NORMAL_ITERATIVE_STEPPING> ["maxChangedGathered" as Stamp of Previous 'ACTION INDICATED RUN']
    // » </NORMAL_ITERATIVE_STEPPING>
    // » </>
    blockUsedName = blockSetName
    blockUsed = true
}

pm.globals.set("blockSetName", blockSetName)
pm.globals.set("blockUsedName", blockUsedName)
pm.globals.set("blockUsed", blockUsed)


console.log(`PRS:[${blockSetName}] pm.globals.get("elementMaxChanged"): ${pm.globals.get("elementMaxChanged")} (immediately before exiting)`)
console.log('<PRS: exiting>')