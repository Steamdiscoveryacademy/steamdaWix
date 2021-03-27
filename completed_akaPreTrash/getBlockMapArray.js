
let marais = "dog";

fillBlockMapArray(enrollmentObject);
getStudentGradeMisMatchDob(enrollmentObject);

document.getElementById("code").innerHTML = JSON.stringify(enrollmentObject, undefined, 4);

function fillBlockMapArray(enrollmentObject) {
    let testing = true;
    // let testing = false;
    // let countWeekArray = enrollmentObject.countWeekArray;
    // let writeMapWeekArray = enrollmentObject.writeMapWeekArray;
    let blockMapArray = {
        "blockMapErrors": {
            "zeroCheckedCount": -7,
            "multipleCheckedCount": -7
        },
        "blockMapArray": [
            {
                "blockMap": -999,
                "week": -999,
                "switchIdArray": [-999],
                "selectedCount": -999,
                "checkedCount": -999,
                "zeroChecked": -999,
                "multipleChecked": -999,
                "gradeMismatchCount": -999
            },
            {
                "blockMap": 1,
                "week": -7,
                "switchIdArray": ["#switch101", "#switch102", "#switch103"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 2,
                "week": -7,
                "switchIdArray": ["#switch201", "#switch202", "#switch203"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 3,
                "week": -7,
                "switchIdArray": ["#switch301", "#switch302", "#switch303"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 4,
                "week": -7,
                "switchIdArray": ["#switch401", "#switch402", "#switch403"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 5,
                "week": -7,
                "switchIdArray": ["#switch501", "#switch502", "#switch503"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 6,
                "week": -7,
                "switchIdArray": ["#switch601", "#switch602", "#switch603"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 7,
                "week": -7,
                "switchIdArray": ["#switch701", "#switch702", "#switch703"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 8,
                "week": -7,
                "switchIdArray": ["#switch801", "#switch802", "#switch803"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            },
            {
                "blockMap": 9,
                "week": -7,
                "switchIdArray": ["#switch901", "#switch902", "#switch903"],
                "selectedCount": -7,
                "checkedCount": -7,
                "zeroChecked": -7,
                "multipleChecked": -7,
                "gradeMismatchCount": -7
            }
        ]
    };
    let studentGrade = parseInt(enrollmentObject.family.student.currentGrade);
    let index = 0;
    let element = {};
    let jindex = 0;
    let jisChecked = false;
    let jelement = "";
    let zeroCheckedCount = 0;
    let multipleCheckedCount = 0;
    for (index = 1; index < blockMapArray.blockMapArray.length; index++) {
        element = blockMapArray.blockMapArray[index];
        weekOfBlockIndex = enrollmentObject.writeMapWeekArray[index];
        element.week = weekOfBlockIndex;
        if (weekOfBlockIndex + 0 > 0) {
            // console.log(weekOfBlockIndex);
            // console.log(enrollmentObject.countWeekArray[weekOfBlockIndex]);
            element.selectedCount = enrollmentObject.countWeekArray[weekOfBlockIndex];
        } else {
            element.selectedCount = 0;
        }
        element.checkedCount = 0;
        element.gradeMismatchCount = 0;
        for (let jindex = 0; jindex < element.switchIdArray.length; jindex++) {
            let jelement = element.switchIdArray[jindex];
            if (testing) {
                element.checkedCount = Math.floor(Math.random() * (element.selectedCount + 1));
            } else {
                jisChecked = $w(jelement).checked;
                element.checkedCount += jisChecked ? 1 : 0;
                // FOR: weekOfBlockIndex is WEEK 1 thru 9
                // AND: jindex is Index of Week's Course 0 thru 2
                // AND: jisChecked
                // THEN: getGradeLevel
                let gradeLevel = "3-5";
                let min = gradeLevel.split("-")[0];
                min = min === "K" ? 0 : parseInt(min);
                let max = gradeLevel.split("-")[1];
                max = parseInt(max);
                misMatch = false;
                misMatch = studentGrade < min ? true : misMatch;
                misMatch = studentGrade > max ? true : misMatch;
                console.log(misMatch);
                element.gradeMismatchCount += misMatch ? 1 : 0;

            }
        }
        element.zeroChecked = element.checkedCount === 0 ? 1 : 0;
        element.zeroChecked = element.selectedCount === 0 ? 0 : element.zeroChecked;
        zeroCheckedCount += element.zeroChecked;
        element.multipleChecked = element.checkedCount > 1 ? 1 : 0;
        multipleCheckedCount += element.multipleChecked;


    }
    blockMapArray.blockMapErrors.zeroCheckedCount = zeroCheckedCount;
    blockMapArray.blockMapErrors.multipleCheckedCount = multipleCheckedCount;
    enrollmentObject.blockMapArray = blockMapArray;
    enrollmentObject.enrollment = {};
    enrollmentObject.enrollment.ErrorArray = [];
    enrollmentObject.enrollment.ErrorArray[0] = blockMapArray.blockMapErrors.zeroCheckedCount > 0 ? true : false;
    enrollmentObject.enrollment.ErrorArray[1] = blockMapArray.blockMapErrors.multipleCheckedCount > 0 ? true : false;
    return blockMapArray;

    //  return enrollmentObject + " Chester!";
}

function getCoursesSwitched (enrollmentObject) {
    
}

function getStudentGradeMisMatchDob(enrollmentObject) {
    enrollmentObject.enrollment.messages = {};
    enrollmentObject.enrollment.messages.dox = ["messaging specifically for the Enrollment Event"];
    enrollmentObject.enrollment.messages.error = [];
    enrollmentObject.enrollment.messages.warn = [];
    enrollmentObject.enrollment.messages.fyi = [];
    enrollmentObject.enrollment.messages.btw = [];
    //http://charlottesvilleschools.org/home/programs-activities/kindergarten/
    //In order to enroll, potential kindergarteners must be 5 years old by September 30.
    const monthK = 9;
    const dayK = 30;
    now = new Date;
    const yearK = now.getFullYear()
    let dob = new Date(enrollmentObject.family.student.dobString);
    let dobString = enrollmentObject.family.student.dobString;
    console.log(dobString);
    console.log(dob);
    // enrollmentObject.family.student.dobString = dobString;
    enrollmentObject.family.student.dob = {};
    enrollmentObject.family.student.dob.date = dob;
    let month = dob.getMonth() + 1;
    enrollmentObject.family.student.dob.month = month;
    let day = dob.getDate();
    enrollmentObject.family.student.dob.day = day;
    let year = dob.getFullYear();
    enrollmentObject.family.student.dob.year = year;
    let grade = parseInt(enrollmentObject.family.student.currentGrade);
    let ageK = yearK - year;
    let minusK = 0;
    minusK = month < monthK ? 1 : minusK;
    minusK = month === monthK  && day < dayK ? 1 : minusK;
    ageK -= minusK;
    ageK -= grade; 
    console.log("ageK: " + ageK);
    ageError = Math.abs(ageK - 5) > 1 ? true : false;
    ageWarning = !ageError && Math.abs(ageK - 5) > 0 ? true : false;
    console.log("ageError: " + ageError);
    console.log("ageWarning: " + ageWarning);
    enrollmentObject.enrollment.ErrorArray[3] = ageError;
    if (ageWarning) {
        enrollmentObject.enrollment.messages.warn[enrollmentObject.enrollment.messages.warn.length] = "Student Grade is a Mismatch with Date-of-Birth (1 year)"
    }
}