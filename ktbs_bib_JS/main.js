
$(document).ready (function () 
{
    height = window.innerHeight;
    $("#panel-1").load("Module-SamoTraceMe/SamoMe.html");
    $("#panel-2").load("Module-Actions/Actions.html");
    $("#panel-3").load("Module-ConfigVisuText/Config_Visu.html");
    $("#panel-4").load("Module-Analytics/moluti-page.html");
    $("#panel-5").load("Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/indicatorBO.html");
    $("#panel-6").load("Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/indicateur.html");
    $("#panel-7").load("Calcul-et-Gestion-Indicateur/Module-Indicateur-Store/index.html");
    
   // $("#includedContent").load("Module-translation/translate-User.html");
    localStorage["Assit.mode"]= "NA";
    URL = $("#URLTRACE").val()+$("#TraceName").val()+"/";
    
   
    traceINITIAL = new Samotraces.KTBS.Trace(URL);
    
    
      //getModel
                  
    
   traceINITIAL.on('trace:model',function(){
      modelName=traceINITIAL.model_uri.replace('../','');
      modelUri=traceINITIAL.model_uri.replace('../',$("#URLTRACE").val());
     
      $.ajax({
                                          type: 'POST',
                                          url: './Module-Generate-Model-ktbs/ModelKtbs.php',
                                          data: {TraceURI :URL , ModelName : modelName },
                                          success: function(data){
                                         
                                                   dataModel= JSON.parse (data);
                                                     
                                                 
                                                    }
		                     });
    
    })
   
    if (localStorage["Assit.ModelS"] == undefined) {localStorage["Assit.ModelS"]="[]";}
   $('#load').on ('click',function() 
        {
            var params = {"user_id": "","base_uri": $("#URLTRACE").val(),"trace_id": $("#TraceName").val()}
            generate_http("Index.php?page=TraceView",params, "post");
        })
})



generate_http = function(url, params, method)
{
        method = method || "post"; // Set method to post by default if not specified.
        var form = document.createElement("form");
        for(var key in params)
        {
            if(params.hasOwnProperty(key)) 
            {
	            var hiddenField = document.createElement("input");
		        hiddenField.setAttribute("type", "hidden");
		        hiddenField.setAttribute("name", key);
		        hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
	        }
        }
        form.setAttribute("method", method);
        form.setAttribute("action", url+"&trace_uri="+encodeURIComponent(params["base_uri"]+params["trace_id"]+"/"));
        document.body.appendChild(form);
        form.submit();
}


