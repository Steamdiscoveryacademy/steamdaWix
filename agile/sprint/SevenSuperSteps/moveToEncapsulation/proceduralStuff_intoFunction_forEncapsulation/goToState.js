// ø <---------- <oToState>  ---------->
// ø FIND superSeven202107
export async function goToState(responseObject, direction = 'NEXT'){
    responseObject.logArrayDeveloper.push('{% goToState(responseObject, direction = NEXT) %}');
    direction = direction.toUpperCase();
    let supportedAliasesForPREV = ['PREVIOUS','PREV'];
    direction = supportedAliasesForPREV.indexOf(direction) >= 0 ? 'PREV' : 'NEXT';
    //PREV is NOT SUPPORTED AT THIS TIME
    // ø <NEXT or PREVIOUS>
    let TTHIS = 'holder';
    let peSevenStates = $w("#mxboxPostEnrollmentSeven").states;
    // $w('#preTrashLog').value = JSON.stringify(peSevenStates,undefined,4);
    // $w('#preTrashLog').value += `\n\n<==========>\n\n`;
    let peSevenStatesIdArray = peSevenStates.map(a => a.id);
    $w('#stDatabaseResponseJSON').value = peSevenStatesIdArray.toString();
    let peSevenStateCurrent = $w("#mxboxPostEnrollmentSeven").currentState;
    let peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
    console.log('peSevenStates : ');
    console.log(peSevenStates);
    console.log('peSevenStatesIdArray : ');
    console.log(peSevenStatesIdArray);
    console.log('peSevenStateCurrent :' + peSevenStateCurrent);
    console.log('peSevenStateCurrentId :' + peSevenStateCurrentId);
    let length = peSevenStatesIdArray.length;
    let currentIndex = peSevenStatesIdArray.indexOf(peSevenStateCurrentId);
    console.log('length :' + length);
    console.log('currentIndex :' + currentIndex);
    // ø </NEXT or PREVIOUS>
    // ø <NEXT Only>
    let nextIndex = currentIndex + 1;
    let nextId = nextIndex >= length ? 'AFTER_LAST' : peSevenStatesIdArray[nextIndex];
    console.log('nextIndex :' + nextIndex);
    console.log('nextId :' + nextId);
    // ø </NEXT Only>
    // ø <PREV Only>
    let prevIndex = currentIndex - 1;
    let prevId = prevIndex <= 0 ? 'BEFORE_FIRST' : peSevenStatesIdArray[prevIndex];
    console.log('prevIndex :' + prevIndex);
    console.log('prevId :' + prevId);
    // ø </PREV Only>
    let targetId = direction === 'NEXT' ? nextId : prevId;
    if (targetId !== 'AFTER_LAST' && targetId !== 'BEFORE_FIRST') {
        goToStateById(targetId);
    }
    //<Nope>
    // else{
    //     $w('#btnPeSevenNext').hide();
    //     $w('#btnPeSevenCurrent').hide(); 
    // }
    //</Nope>
}
// ø <---------- </oToState> ---------->