    var Assist= {};
/** 
	 * @function
	 * @memberof Assist
	 * @name obsels_json
	 * @desc get the obsels json
**/
	
	
getName = function (val)	
{	
    lastIndexOfSlash = val.lastIndexOf("/");
    if (lastIndexOfSlash !== -1)
        valT = val.substr(lastIndexOfSlash+1,val.length);
    else
         valT=val ;
    return valT;
 } 
 
 getNameT = function (val)	
{	
    lastIndexOfSlash = val.lastIndexOf("#");
    if (lastIndexOfSlash !== -1)
        valT = val.substr(lastIndexOfSlash+1,val.length);
    else 
        valT=val ;
    if(valT.substr(0,2) == "m:")
        { 
        valT=valT.substr(2) ;
	    }
     return valT;
 } 
 
 getGenericModel = function ()
 {
   var d =  $.ajax({
            type: "GET",
            url: "./JSON/ModelClaco.json",
            crossDomain: true,
            async:false,
            dataType: 'json',
            success: function(data) {models=data;}
            });
 
 }
 
 getGenericModel();
 
