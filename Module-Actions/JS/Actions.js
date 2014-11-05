
 
 //SamoTraceMe(URL,"time_form","scale","trace","traceZoom","scaleZoom","TraceText");
function SamoTraceMeActions (URL,time_form,scale,traceIcon,traceZoom,scaleZoom,TraceText)
{
delete (trace1);
  trace1 = new Samotraces.KTBS.Trace(URL);
        
        var timer1 = new Samotraces.Timer(Date.now());
	    var hour = 3600*1000;
	    var day = 24*hour;

        trace1.on('trace:updateData',function(){
                 trace1.list_obsels();
                 delete(twZoom1);
                  twZoom1 = new Samotraces.TimeWindow({start: new Date(Date()).setHours(new Date (Date()).getHours()-2), end: Date.now()});
                 var IntervalTimeForm = new Samotraces.UI.Widgets.IntervalTimeForm(time_form,twZoom1);
                 delete(tw11);
	             var tw11 = new Samotraces.TimeWindow({start: new Date(trace1.origin).getTime(), end: Date.now()});
                var TraceDisplayIconsFix = new Samotraces.UI.Widgets.TraceDisplayIconsFix(traceIcon,trace1,tw11,twZoom1,options);
                var WindowScaleFix = new Samotraces.UI.Widgets.WindowScaleFix(scale,tw11);
                var widget= new Samotraces.UI.Widgets.TraceDisplayIconsZoom(traceZoom,trace1,twZoom1,options);
                new Samotraces.UI.Widgets.WindowScaleFix(scaleZoom,twZoom1);
                var widgetText1=new Samotraces.UI.Widgets.TraceDisplayText(TraceText,trace1,twZoom1);
               
        });
  

}

$('#Refresh1').on('click',function (e) {
        last_obsel = trace1.get_Last_obsel().get_begin();
        trace1.list_obsels(last_obsel-new Date(trace1.origin).getTime(),Date.now()-new Date(trace1.origin).getTime());
        //document.getElementById('TraceText').innerHTML="";
        twZoom1.set_start  (last_obsel);
        twZoom1.set_end (Date.now());
        


 });
$("#ActionsType").on('change',function() {
     
     $("#waiting").show();
     document.getElementById("time_form1").innerHTML="";
            document.getElementById("scale1").innerHTML="";
            document.getElementById("trace1").innerHTML="";
            document.getElementById("traceZoom1").innerHTML="";
            document.getElementById("scaleZoom1").innerHTML="";
             document.getElementById("TraceText1").innerHTML="";
    var Action = this.value;
    $.ajax({
            type: 'POST',
            url : 'Module-Actions/PHP/Actions.php',
            data: {BaseURI : $("#URLTRACE").val(), TraceName : $("#TraceName").val() , ActionName : this.value  },
            success : function() {
            var URL = $("#URLTRACE").val()+$("#TraceName").val()+Action+"/";
            
           SamoTraceMeActions(URL,"time_form1","scale1","trace1","traceZoom1","scaleZoom1","TraceText1");
            }
           })
})



