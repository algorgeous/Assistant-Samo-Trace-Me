
 
 //SamoTraceMe(URL,"time_form","scale","trace","traceZoom","scaleZoom","TraceText");
function SamoTraceMe (URL,time_form,scale,traceIcon,traceZoom,scaleZoom,TraceText)
{
   
	options = {
	url: function(o) {
			var path = "Module-SamoTraceMe/images/";
			switch(o["type"]) {
				case 'Ouverture_Page':
					return path+'Orange.png';
				case 'Survol-Session':
				case 'Click-Menu':
				case 'Click-Menu-Left':
				case 'Click-Onglet':
				case 'Click-Configurer-options':
				case 'Click-Button-Assistant':
				case 'Click-Button-Assistant':
				case 'Click-Menu-Left':
				case 'Click-Lien-Presentation':
				case 'Click-Session':
				case 'Click-Sur-Sujet':
				case 'Click-Menu-Left':
				case 'Click-Button':
				case 'Click-Menu':
				case 'Click-Lien-session-0':
				case 'Click-Lien-Categorie':
				case 'Click-Lien-session-1':
				case 'Deconnection':
				case 'click-lien-presentation':
				case 'Click-Lien-Tutoriel':
				case 'Click-Page-Quiz':
					return path+'rouge.png';
				case 'workspace-enter':
				case 'resource-claroline_forum-create_message':
				case 'resource-claroline_forum-delete_message':
				case 'resource-read':
				case 'resource-icap_lesson-chapter_read':
				case 'resource-ujm_exercise-exercise_evaluated':
				case 'resource-icap_blog-configure':
				case 'resource-create':
				case 'resource-icap_blog-post_create':
				
					return path+'vert.png';
				case 'Click-lien-google':
				case 'Recherche-Google':
				case 'Aime-Video':
				case 'dislike-video':
				case 'Annuler-Abonnement':
				case 'Abonner-Video':
					return path+'jeune.png';
				case 'Click-Button-Assistant':
				case 'Click-Assistant':
				case 'Click-Lien':	
				case 'click':
				return path+'cursor.png';
				default:
					return path+'help.png';
			}
		}
	};
	var timer = new Samotraces.Timer(Date.now());
	console.log ("init samoTraceMe");
	traceINITIAL.on('trace:updateData',function(){
        // init all object
       var tw = new Samotraces.TimeWindow({start: new Date(traceINITIAL.origin).getTime(), end: Date.now()});
        twZoom = new Samotraces.TimeWindow({start: new Date(Date()).setHours(new Date (Date()).getHours()-2), end: Date.now()});
       var I_IntervalTimeForm= new Samotraces.UI.Widgets.IntervalTimeForm(time_form,twZoom);
	   var tw1 = new Samotraces.TimeWindow({start: new Date(traceINITIAL.origin).getTime(), end: Date.now()});
       var I_TraceDisplayIconsFix = new Samotraces.UI.Widgets.TraceDisplayIconsFix(traceIcon,traceINITIAL,tw1,twZoom,options);
       var I_WindowScaleFix= new Samotraces.UI.Widgets.WindowScaleFix(scale,tw1);
       var  widget= new Samotraces.UI.Widgets.TraceDisplayIconsZoom(traceZoom,traceINITIAL,twZoom,options);
       var I_WindowScaleFix= new Samotraces.UI.Widgets.WindowScaleFix(scaleZoom,twZoom);
       var widgetText = new Samotraces.UI.Widgets.TraceDisplayText(TraceText,traceINITIAL,twZoom);
       if (ProxyKtbs.ExistStores("SamoMe."+traceINITIAL.uri))
		{
		    setTimeout(function(){
		    console.log ('here');
		     traceINITIAL.Before_on_refresh_obsel_list_(ProxyKtbs.getStore("SamoMe."+traceINITIAL.uri) );
		      var last_obsel= getMaxbeginObsels (ProxyKtbs.getStore("SamoMe."+traceINITIAL.uri))+1000;
		    traceINITIAL.list_obsels(last_obsel);
		   Date.now()-new Date(traceINITIAL.origin).getTime()
		     
		     
		     },2000)
		    
		  
		}
		else 
		{
		 traceINITIAL.list_obsels();
		}
      });
}

$(document).ready(function(){
        console.log ("init samoTraceMe");
        var URL = $("#URLTRACE").val()+$("#TraceName").val()+"/";
        
        SamoTraceMe(URL,"time_formDIV","scaleDIV","traceINITIALDIV","traceZoomDIV","scaleZoomDIV","TraceTextDIV");
   });


$(document).on('click','image',function(e) {
  
		 obs = $.data(e.target,'Samotraces-data');
		console.log (obs);
		//$('div.Widget-ObselInspector').css('display','block')
		if (obs.id[0]=="#")
		{
		current_obsel1.select(obs);
		        // event coché 
		$(document).on('click','.checkboxType',function(e){
		 console.log (this.name);
		        if (this.cheked)
		            {obs.coche=false;}
		        else 
		            {obs.coche=true;}
		  $(document).on('click','.checkboxAtt',function(e){
                        att = getAttribute(this.name,obs);
                        if (this.cheked)
                        {att.coche=false}
                        else 
                        {att.coche=true}
		                
		    
		    })
		    
		    })
		}
		else
		{if (($("#"+obs.id).css('background-color')=="rgba(0, 0, 0, 0)")||($("#"+obs.id).css('background-color')=="transparent"))
		{$("#"+obs.id).css ("background-color","#B5E655");
		var div = $("#TraceTextDIV");
		var div1 = $("#TraceText1");
        scrollTo=$("#"+obs.id);
        div.scrollTop(scrollTo.offset().top-div.offset().top+div.scrollTop());
        div1.scrollTop(scrollTo.offset().top-div1.offset().top+div1.scrollTop())
		}
		else 
		$("#"+obs.id).css ("background-color","rgba(0, 0, 0, 0)");
		}
	}); 
 


  getMaxbeginObsels = function(obsels){
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


getAttribute = function (id,obs){

for (i=0;i<obs.attributes.length;i++)

{
    
    if (new String (obs.attributes[i]['@id']).valueOf() == new String (id).valueOf())
    {return obs.attributes[i]}
}


}
