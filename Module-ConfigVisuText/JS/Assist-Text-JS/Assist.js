    var Assist= {};
/** 
	 * @function
	 * @memberof Assist
	 * @name obsels_json
	 * @desc get the obsels json
**/
	Assist.obsels_json = function(options,mode){ 
      var base_uri = options.base_uri;
	    var trace_name = options.trace_name;
	    var fn = options.fn;
	    mgr = new tService.TraceManager({
			"base_uri": base_uri,
			async: true
		});
	    trc = mgr.init_trace({name: trace_name});
        if (mode == "update")
        {
            maxb = AssistgetMaxb (JSON.parse(localStorage["Assit.obsels"]));
            trc.get_obsels({
				nocache: true,
				minb: maxb+1,
				success: function(newObsels){
					        var obsels = JSON.parse(localStorage["Assit.obsels"]);
					        for(var i=0;i<newObsels.length;i++)
					        {
						    obsels.push(newObsels[i]);
						    //insert ligne a l'interface 
						    Assist.ViewTrace.addObselVisu (newObsels[i]);
						    }					
					        localStorage["Assit.obsels"] = JSON.stringify(obsels);
					        console.log ("upadate visu");
				        }
			    });
        }
        else
	    {
	    trc.get_obsels({success: fn});
		}
    }
    AssistgetMaxb = function(obsels){
		var maxb = 0;
		for(var i=0;i<obsels.length;i++)
		{
		    var obsel = obsels[i];
			if(obsel.begin>maxb)
			    {
					maxb=obsel.begin;
				}
		}
			return maxb;
	}


	
getName = function (val)	
{	
	lastIndexOfSlash = val.lastIndexOf("/");
    if (lastIndexOfSlash !== -1)
  {valT = val.substr(lastIndexOfSlash+1,val.length);}
  else valT=val ;
 return valT;
 } 
 
 getNameT = function (val)	
{	
	lastIndexOfSlash = val.lastIndexOf("#");
    if (lastIndexOfSlash !== -1)
  {valT = val.substr(lastIndexOfSlash+1,val.length);}
  else valT=val ;
 if(valT.substr(0,2) == "m:") { // TODO this is not generic!!!!
					valT=valT.substr(2) ;
				}
 return valT;
 } 
  
