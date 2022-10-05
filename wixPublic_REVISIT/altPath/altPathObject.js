altPathObject = {}
altPathObject.originalPath
altPathObject.altPathArray
altPathObject.altPathArray

// ===
altPathSingleton = {}
altPathSingleton.altPath
altPathSingleton.redirectStatus
altPathSingleton.forceFinal
//boolean|if true, no re-redirect no matter what the db says
altPathSingleton.enabledCommon
// a boolean that can be set, but isoStart-isoEnd take precedence
altPathSingletion.enableForceOverride
// is a force-START and force-STOP that overrides all other settings
altPathSingleton.yyyyStart
altPathSingleton.mmStart
altPathSingleton.ddStart
altPathSingleton.hhStart
altPathSingleton.iiStart
altPathSingleton.ssStart
altPathSingleton.yyyyEnd
altPathSingleton.mmEnd
altPathSingleton.ddEnd
altPathSingleton.hhEnd
altPathSingleton.iiEnd
altPathSingleton.ssEnd
// if either above are blank/null then immediately(no start) and forever (no end)
// and adding a value for isoEnd in the past STOPS it
// and addint a value for isoStart in the futuer STOPS it, until
// maybe YYYY,MM,DD,HH,II,SS so that if YYYY is empty, it is scheduled
// example, Christmas Theme mm=12 dd=1/mm=1 dd=7
// example, April Fools Theme mm=4 dd=1 hh=00 ii=1/mm=4 dd=1 hh=23 ii=59
NAME FOR GENERIC PARAMETERS !!!
// in my example, one parameter for TermId one parametter for RegionKey
// ↪ another parameter (or just user data) for Developer another for 
// ∴ many rows, one for Spring 2022 CHO another for Spring 2022 ROA etc
altPathSingleton.roleEnabledArray = []
altPathSingleton.roleDisabledArray = []
altPathSingleton.userEnabledArray = []
altPathSingleton.userDisabledArray = []
//what if role='devel' is enabled and role='brad' is disable
//vice versa




