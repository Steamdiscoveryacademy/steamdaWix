// ø <---------- <ppeqOneMessageFromMany UTILITY>  ---------->
export function ppeqOneMessageFromMany(uiPlacementObjectArray = []){
    // pstEnrSeven202108UTILITY SHORT
    // pstEnrSeven20210822_MESSAGING
    /**
     * NOTES:
     *   - there seems no practical reason to count the objects past one, but it could be done
     *   - there seems no practical reason to append finalObject uiPlacementObjectArray, but I did
     */
    let count = uiPlacementObjectArray.length -1;
    let firstSuccessObject = {};
    let countSuccessObject = 0;
    let firstWarningObject = {};
    let countWarningObject = 0;
    let firstDangerObject = {};
    let countDangerObject = 0;
    let finalObject = {};
    
    uiPlacementObjectArray.forEach(elementObject => {
        // console.log(elementObject);
        if(elementObject.bootstrap === 'SUCCESS' && countSuccessObject === 0){
            firstSuccessObject = elementObject;
            countSuccessObject++;
        }
        if(elementObject.bootstrap === 'WARNING' && countWarningObject === 0){
            firstWarningObject = elementObject;
            countWarningObject++;
        }
        if(elementObject.bootstrap === 'DANGER' && countDangerObject === 0){
            firstDangerObject = elementObject;
            countDangerObject++;
        }
    });


    finalObject = countSuccessObject > 0 ? firstSuccessObject : finalObject;
    finalObject = countWarningObject > 0 ? firstWarningObject : finalObject;
    finalObject = countDangerObject > 0 ? firstDangerObject : finalObject;
    // let uiPlacement = 'PENDING';// gather from param ¿or add param?
    // let uiPlacement = uiPlacementObjectArray[0].message;// should be the same for all objects in the array, by design
    // finalObject.bootstrap = `danger`;
    // finalObject.message = `One [Holder] Message from Many [${count}] for ${uiPlacement}`;
    let arrayBootstrapMessage = [];
    arrayBootstrapMessage.push(finalObject.bootstrap);
    arrayBootstrapMessage.push(finalObject.message);

    uiPlacementObjectArray.final = [];    
    uiPlacementObjectArray.final.push(finalObject);

    return arrayBootstrapMessage;	
}
// ø <---------- </ppeqOneMessageFromMany UTILITY> ---------->