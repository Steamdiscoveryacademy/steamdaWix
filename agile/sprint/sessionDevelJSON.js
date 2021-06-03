// ø <---------- <sessionInstantiateDevelJSON>  ---------->
export function sessionInstantiateDevelJSON(){
    // ø <---------- <toLocalISO>  ---------->
    // ! <GET FROM BACKEND OR PROTOT DATE>
        let now = new Date();
        let evalDate = now;
        let nowISO = '';
        nowISO += evalDate.getFullYear();
        nowISO += ("00" + (evalDate.getMonth() + 1).toString()).substr(-2);
        nowISO += ("00" + evalDate.getDate().toString()).substr(-2);
        // nowISO += evalDate.getDate();
        nowISO += ("00" + evalDate.getHours().toString()).substr(-2);;
        nowISO += ("00" + evalDate.getMinutes().toString()).substr(-2);;
        nowISO += ("00" + evalDate.getSeconds().toString()).substr(-2);;
    // ! </GET FROM BACKEND OR PROTOT DATE>
    // ø <---------- </toLocalISO> ---------->
    
        let develObject = {};
        develObject.instantied = nowISO;
    
        if (Number(nowISO) < Number("20210814235959")) {
            develObject.manualEnrollment = true;
    
        }else{
            develObject.manualEnrollment = true;
        }
    
        let doInstantiate = typeof session.getItem("manualEnrollment") === 'string'  && (session.getItem("manualEnrollment")).length > 0? false : true;
        if (doInstantiate) {
            let develJSON = JSON.stringify(develObject);
            session.setItem("develJSON", develJSON);
        }
    
        if(develObject.manualEnrollment === true){
            session.setItem("manualEnrollment","TTRUE")
        }else{
            session.setItem("manualEnrollment","FFALSE")
        }
    }
    // ø <---------- </sessionInstantiateDevelJSON> ---------->
    