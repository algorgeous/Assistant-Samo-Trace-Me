


$(document).ready(function(){
     Type_style = ["Linéaire","Liste","Table"];
     Attribute_style = ["black","Yellow","black-bold","lien","green","green-bold","green-Italic","Orange","Orange-bold","fluorescent-orange","Red","Red-bold","Blue-bold","DeepPink","Maroon","Purple"];
     traceINITIAL.on('trace:Config',function(e){
     if (e.data.obsels)
        Assist.drawTabObsel(e.data.obsels);
     else 
        Assist.drawTabObsel(e.data);
     });
});

$("#Save").on("click",function() {
    Assist.Model.generateModel();
    getGenericModel();
    traceINITIAL._on_refresh_obsel_list_(ProxyKtbs.getStore("SamoMe."+traceINITIAL.uri) );
    alert ("configuration enregistrer");
    
})
