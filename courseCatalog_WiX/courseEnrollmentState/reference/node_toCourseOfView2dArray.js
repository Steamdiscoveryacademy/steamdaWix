let nodeToCourseOfView2dArray = [['nid', '_id'],
['title', 'courseNameDisplay'],
['field_courseregionkey', 'courseRegionKey'],
['field_locationkey', 'locationKey'],
['field_termid', 'termId'],
['field_weekid', 'weekId'],
['field_gradelevelkey', 'gradeLevelKey'],
['field_courseoptions', 'courseOptions'],
['field_coursetilepath', 'courseTilePath'],
['field_coursekey', 'courseKey'],
['field_sectioncount', 'sectionCount'],
['field_coursepromopath', 'coursePromoPath'],
['field_curriculumid', 'curriculumId'],
['field_enrollexcptn', 'enrollExcptn']]

let exceptionTo__value__Array = []

let nodeJSON = `{"nid":[{"value":3604}],"uuid":[{"value":"ef8969bc-f37a-4e37-b59b-2162d59f66a1"}],"vid":[{"value":5995}],"langcode":[{"value":"en"}],"type":[{"target_id":"courses","target_type":"node_type","target_uuid":"928f9397-b228-4ff2-b713-50df78fe0f4c"}],"revision_timestamp":[{"value":"2021-12-20T12:57:20+00:00","format":"Y-m-d\\TH:i:sP"}],"revision_uid":[{"target_id":237,"target_type":"user","target_uuid":"c174b63f-6a5d-426d-ac8d-caab22741e42","url":"/user/237"}],"revision_log":[],"status":[{"value":true}],"uid":[{"target_id":237,"target_type":"user","target_uuid":"c174b63f-6a5d-426d-ac8d-caab22741e42","url":"/user/237"}],"title":[{"value":"Ceramics FD"}],"created":[{"value":"2021-12-20T12:57:20+00:00","format":"Y-m-d\\TH:i:sP"}],"changed":[{"value":"2022-01-06T16:21:35+00:00","format":"Y-m-d\\TH:i:sP"}],"promote":[{"value":true}],"sticky":[{"value":false}],"default_langcode":[{"value":true}],"revision_translation_affected":[{"value":true}],"path":[{"alias":null,"pid":null,"langcode":"en"}],"menu_link":[],"field_coursedateend":[{"value":"2021-06-11T11:59:00.000Z"}],"field_coursedatestart":[{"value":"2021-06-07T11:59:00.000Z"}],"field_coursekey":[{"value":"CERAMICSu2323bCHOa"}],"field_coursename":[{"value":"Ceramics"}],"field_coursenameabbrv":[{"value":"Ceramics"}],"field_courseoptions":[{"value":"FD"}],"field_coursepromopath":[{"value":"FFALSE"}],"field_courseregionkey":[{"value":"CHO"}],"field_coursetilepath":[{"value":"FFALSE"}],"field_coursetimeduration":[{"value":"08:00:00.000"}],"field_coursetimestart":[{"value":"09:00:00.000"}],"field_curriculumid":[{"value":20}],"field_curriculumkey":[{"value":"CERAMICS"}],"field_daysofweek":[{"value":"1,2,3,4,5"}],"field_enrollexcptn":[],"field_gradelevelkey":[{"value":"GL02"}],"field_jcal":[{"value":"NNULL"}],"field_locationkey":[{"value":"CHOa"}],"field_locationname":[{"value":"STEAM Incubator"}],"field_sectionarray":[{"value":"CERAMICSu2323bCHOa1"}],"field_sectioncount":[{"value":1}],"field_termid":[{"value":202123}],"field_weekid":[{"value":202123}]}`
let nodeObject = JSON.parse(nodeJSON)
console.dir(nodeObject)

let nodeToViewCourseTransform = {}
