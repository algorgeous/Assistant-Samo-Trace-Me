function verifyName(){
          var a = document.getElementById("Name").value;
          var x = true;

          for (var i = a.length - 1; i >= 0; i--) {
           if ((a.charCodeAt(i) == 32)||(a.charCodeAt(i)>=48 && a.charCodeAt(i)<=57)||(a.charCodeAt(i)>=97 && a.charCodeAt(i)<=122)||(a.charCodeAt(i)>=65 && a.charCodeAt(i)<=90)){ 
            console.log('T');
          }
          else{

            x = false
            
          };

        };

        if(x==false){
          
          
          document.getElementById("Name").value = "";

          alert("The name of the indocator must not have any special caracter or accents.");
        }
}

$("#Balance").on("click",function () {
 //get data from json
 //on succes send data to php
  //current_obsel = new Samotraces.Selector('obsel');
  //new Samotraces.UI.Widgets.ObselTypeInspector('obselinspector',current_obsel);
        
 $.ajax({
            type: "GET",
            url: "./JSON/Indicateur.json",
            crossDomain: true,
            async:false,
            dataType: 'json',
            success: function(dataJSOn) 
            { 
                     $.ajax({
                             type: 'POST',
                             url : 'Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/PHP/jsonviewer.php',
                             data: {data : JSON.stringify(dataJSOn)  },
                             success : function(data) 
                                    {
                                    
                                         $("#rep-Ind").html(data);
                                      //  wid_source= new Samotraces.UI.Widgets.DisplayModel ("source_Model",dataJSOn["Transformation"][0]["graph_model_Source"],options);
                                      //  wid_resultat= new Samotraces.UI.Widgets.DisplayModel ("Resultat_Model",dataJSOn["Transformation"][0]["graph_model_Resultat"],options)
                                          $("img.arrow").click(function() {
                                                                if ($(this).attr('src') == "images/arrow.png") {
                                                                $(this).parent().find("ul:first").toggle();
                                                                          }
                
                // Scroll the screen to the arrow for easier navigation
                $("html").animate({scrollTop: $(this).offset().top - 10 + 'px'}, { duration: 300});
               
            });

            $("#root, #first").show();
                                    }
                            })

           
           }
       });
 
 //document.getElementById('rep-Ind').innerHTML="<p>ici<p>";
});

 $("#classif").on("click",function () {
 //get data from json
 //on succes send data to php
  //current_obsel = new Samotraces.Selector('obsel');
    //     new Samotraces.UI.Widgets.ObselTypeInspector('obselinspector',current_obsel);
        
 $.ajax({
            type: "GET",
            url: "./JSON/IndicateurC.json",
            crossDomain: true,
            async:false,
            dataType: 'json',
            success: function(dataJSOn) 
            { 
                     $.ajax({
                             type: 'POST',
                             url : 'Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/PHP/jsonviewer.php',
                             data: {data : JSON.stringify(dataJSOn)  },
                             success : function(data) 
                                    {
                                    
                                         $("#rep-Ind").html(data);
                                      //  wid_source= new Samotraces.UI.Widgets.DisplayModel ("source_Model",dataJSOn["Transformation"][0]["graph_model_Source"],options);
                                      //  wid_resultat= new Samotraces.UI.Widgets.DisplayModel ("Resultat_Model",dataJSOn["Transformation"][0]["graph_model_Resultat"],options)
                                          $("img.arrow").click(function() {
                                                                if ($(this).attr('src') == "images/arrow.png") {
                                                                $(this).parent().find("ul:first").toggle();
                                                                          }
                
                // Scroll the screen to the arrow for easier navigation
                $("html").animate({scrollTop: $(this).offset().top - 10 + 'px'}, { duration: 300});
               
            });

            $("#root, #first").show();
                                    }
                            })

           
           }
       });
 
 //document.getElementById('rep-Ind').innerHTML="<p>ici<p>";
});


 function list_ind(){


    document.getElementById("listBOind").innerHTML="";

    // $('#B').load('balance.html');

        $.ajax({
            type : "POST",
            url : "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
            data : {
                reason : "list",
                trace : URL
            },
            success : function(response,status){
                var myJson = JSON.parse(JSON.stringify(response));
                //alert(myJson);
                var obj = eval("("+ myJson +")");
                //alert(obj);

                for (var i = obj.length - 1; i >= 0; i--) {
                    var k = obj[i];
                    $('#listBOind').append
                    ('<li class="active" ><a href="#'+k['Name']+'" class="btn" onclick="show('+"'"+k['Name']+"'"+')">'+k['Name']+' </a></li>')
                    
                };

            }
        })

}


 function show(name){

    //current_obsel = new Samotraces.Selector('obsel');
     //    new Samotraces.UI.Widgets.ObselTypeInspector('obselinspector',current_obsel);
        
        $.ajax({
            beforeSend: function() {
            $("#waiting").show()
            },
            complete: function() {
                 $("#waiting").hide()
            },
            type: "POST",
            url: "Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php",
            data : {
            reason : 'getForView',
            nameind : name,
            trace : URL
            },

            success: function(dataJSOn) 
            { 

                var myJson = JSON.parse(JSON.stringify(dataJSOn));
                // alert(myJson);
                var obj = eval("("+myJson+")");
                // alert(obj);

                console.log(obj);
                     $.ajax({
                        beforeSend: function() {
                        $("#waiting").show()
                        },
                        complete: function() {
                        $("#waiting").hide()
                        },
                             type: 'POST',
                             url : 'Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/PHP/jsonviewer.php',
                             data: {data : JSON.stringify(obj)  },
                             success : function(data) 
                                    {
                                    
                                         $("#rep-Ind").html(data);
                                      //  wid_source= new Samotraces.UI.Widgets.DisplayModel ("source_Model",dataJSOn["Transformation"][0]["graph_model_Source"],options);
                                      //  wid_resultat= new Samotraces.UI.Widgets.DisplayModel ("Resultat_Model",dataJSOn["Transformation"][0]["graph_model_Resultat"],options)
                                          $("img.arrow").click(function() {
                                          if ($(this).attr('src') == "images/arrow.png") {
                                          $(this).parent().find("ul:first").toggle();
                                                                          }
                
                // Scroll the screen to the arrow for easier navigation
                $("html").animate({scrollTop: $(this).offset().top - 10 + 'px'}, { duration: 300});
               
            });

            $("#root, #first").show();
                                    }
                            })

           }
       });
 
 //document.getElementById('rep-Ind').innerHTML="<p>ici<p>";

 }

 
$("#AddInd").on("click",function () {
         document.getElementById("rep-Ind").innerHTML="";
          
         $("#rep-Ind").load("./Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/FormAddInd.html",function () 
            {
               compteur = 1;
               Transformation =[];
               ListeObselTypeResultat=[];
               $("#waiting2").hide();
              
              // Module Transf-Model
              
              current_obsel1	= new Samotraces.Selector('obsel');
              new Samotraces.UI.Widgets.ObselTypeInspectorCocher('obselinspector1',current_obsel1);
              model = new Samotraces.KTBS.Model(dataModel);
              Mod = new Samotraces.UI.Widgets.DisplayModel ('model1',model,options);

              // partie formule avec outil Brayen  
              $('#formule').on('change',function() {
                document.getElementById("outIn-put").innerHTML="";
                        $.ajax({
                             type: 'POST',
                             url : 'Calcul-et-Gestion-Indicateur/Module-Indicateur-BackOffice/PHP/decomposerFormule.php',
                             data: {equation : $('#formule').val()  },
                             success : function(data) 
                                    {
                                        d = JSON.parse(data);
                                        if(d.Er){
                                            alert(d.Er);
                                        }
                                        else {   
                                                        //output
                                                    var divInput = document.createElement("div");   
                                                    divInput.setAttribute ('class','form-group');
                                                    var label = document.createElement("label");
                                                    label.setAttribute('class','col-sm-2 control-label');
                                                    label.appendChild(document.createTextNode("Output"));
                                                    var divI = document.createElement("div");
                                                    divI.setAttribute ('class','col-sm-10');
                                                        var div1 = document.createElement("div");
                                                        div1.setAttribute ('class','input-group');
                                                        div1.setAttribute ('id',"output");
                                                        var label1 = document.createElement("label");
                                                        label1.setAttribute('for','');
                                                        label1.setAttribute('class','control-label input-group-addon');
                                                        label1.appendChild(document.createTextNode(JSON.parse (data)["output"]));
                                                        div1.appendChild(label1);
                                                        var divC = document.createElement("input");
                                                        divC.setAttribute ('id',JSON.parse (data)["output"]);
            			                                divC.setAttribute ('type','text');
            			                                divC.setAttribute ('class','form-control');
                                                        div1.appendChild(divC);
                                                        divI.appendChild(div1);
                                                    divInput.appendChild(label);
                                                    divInput.appendChild(divI);
                                                    document.getElementById("outIn-put").appendChild(divInput);
                                                    output_name  =JSON.parse (data)["output"]
                                                        //input
                                                    
                                                    var divInput = document.createElement("div");
                                                    divInput.setAttribute ('class','form-group');
                                                    var label = document.createElement("label");
                                                    label.setAttribute('class','col-sm-2 control-label');
                                                    label.appendChild(document.createTextNode("Input"));
                                                    var divI = document.createElement("div");
                                                    divI.setAttribute ('class','col-sm-10');
                                                    divI.setAttribute ('id','input');
                                                    input=JSON.parse(JSON.parse(data)["input"]);
                                                    for (i=0;i<=input.length;i++)
                                                         {
                                                         if((input[i]!==undefined)&&(input[i]!=="null"))
                                                         {
                                                         var div1 = document.createElement("div");
                                                        div1.setAttribute ('class','input-group');
                                                        var label1 = document.createElement("label");
                                                        label1.setAttribute('for','');
                                                        label1.setAttribute('class','control-label input-group-addon');
                                                        label1.appendChild(document.createTextNode(input[i]));
                                                        div1.appendChild(label1);
                                                            //form brayan
                                                        var divC = document.createElement("iframe");
                                                        divC.setAttribute ('id',input[i]);
                                                        divC.setAttribute ('width','100%');
                                                        divC.setAttribute ('height','500px');
                                                        divC.setAttribute ('src',"./Module-Spare-LNC/index.html");
                                                        
                                                      
                                                        

            			                                   // $("#"+JSON.parse(input)[i]).load("./Module-Indicateur-BackOffice/FormAddInd.html");
            			                                     
            			                                //divC.innerHTML='<object type="text/html" style="width: 1220px;height: 400px;" data="./Module-Spare-LNC/index.html">'
                                                        div1.appendChild(divC);
                                                        divI.appendChild(div1);
                                                        divI.appendChild(document.createElement("br"));
                                                        }
                                                         }
                                                     divInput.appendChild(label);
                                                    divInput.appendChild(divI);
                                                    document.getElementById("outIn-put").appendChild(divInput);
                                        };
                                    }

                                       
                                                                           
               
                        });

              })
               EnregistrerTransf = function (){
                   
                var Tab_ObselType = [];
                 
                
                // parcour model.list_Types_Obsles
                if (compteur !== 2)
                {data = ListeObselTypeResultat }
                else 
                {data = model.list_Types_Obsles}
                ListeObselTypeResultat=[];
                console.log ('data',data);
                    data.forEach(function(o){
		                if (o.coche)
		                {
		                    Type_Id=o.id;
		                    o.coche=false;
		                    
		                    
		                    var Tab_Attr = [];
		                    var leng= o.attributes.length;
		                        for (j=0;j<leng;j++)
		                        {
		                            if (o.attributes[j])
		                            {
		                                    if (o.attributes[j].coche)
		                                    {
		                                    Name=o.attributes[j]['@id'];
		                                    var obj_attr = {nameAttributeId:Name,constraint:'null'};
		                                    Tab_Attr.push (obj_attr);
		                                    o.attributes[j].coche=false
		                                    }
		                                    else 
		                                    {
		                                    delete (o.attributes[j]);
		                                    //o.attributes.splice(j,1);
		                                    //j=j-1;
		                                    }
		                             }
		                        }
		                     
		                    ListeObselTypeResultat.push(o);
		                    var Obj_ObselType = {obselTypeId:Type_Id,attribute:Tab_Attr};
		                    Tab_ObselType.push(Obj_ObselType);
		                }
		                
		                });
                
                
                var Param_object = {after:'null',before:'null',ObselType:Tab_ObselType}
            
                // fin parcour
                if (compteur==2)
                  {var Predecesseur = ""}
                else 
                  {var Predecesseur = compteur-2}
                  idT= compteur-1
               var obj_transf={type:'sparql',id:idT,Predecesseur:Predecesseur,Successeur:compteur,method:'sparql',Parameter:Param_object};
               Transformation.push(obj_transf);
               
               console.log ('ListeObselTypeResultat',ListeObselTypeResultat)
               return ListeObselTypeResultat ;
               }
            $("#SaveTransf").on("click",function(){
                EnregistrerTransf();
            
            })
           $("#AddTransf").on("click",function(){
                    compteur++;
                  
                 div_transf= document.getElementById("Tranformation");
                 div_Trans = document.createElement("div");
                 div_Trans.setAttribute('id','Transf'+compteur)
                 div_add = document.createElement("div");
                 div_add.setAttribute('id','model'+compteur);
                 
                 div_Trans.appendChild(div_add)
                 
                 div_transf.appendChild(div_Trans)
                 
                 
                 delete (Model);
                 Model = new Samotraces.KTBS.Model('null');
                 
                 Model.list_Types_Obsles  = EnregistrerTransf();
                 //model.list_Types_Obsles 
                 div_model = 'model'+compteur;
                 
                 ModWid = new Samotraces.UI.Widgets.DisplayModel (div_model,Model,options);
                 
           })
           $("#DelTransf").on("click",function(){
                    
                  
                  div_to_delete =  document.getElementById('Transf'+compteur);
                  div_to_delete.parentNode.removeChild( div_to_delete)
                  compteur--;
                  Transformation.splice (Transformation.length-1,1);
                  
                 
           })
           
                  


// Save Indicateur 
$("#saveIND").on("click",function(){
            $("#waiting2").show();
            var Name = document.getElementById('Name').value;
            var Author = document.getElementById('Author').value;
            var Des = document.getElementById('Description').value;
            var formule = document.getElementById('formule').value
            var output_name = $('#output > label').text();
            var label_output=  document.getElementById(output_name).value;
            var objet_output = {name:output_name,label:label_output}

            var input_JSON =[];
            var ifr = document.getElementsByTagName('iframe');
            for (i=0;i<ifr.length ;i++)
            {
                name_input = ifr[i].id;
                var sparql=$('#'+ifr[i].id).contents().find('#resultSPARQL').val();
                var text=$('#'+ifr[i].id).contents().find('#resultLangage').val();
                var input_objet ={name:name_input,operation:sparql,text:text};

                input_JSON.push (input_objet)
            }
          
            Indictateur_JSON={Name:Name,Author:Author,Description:Des,Transformation:Transformation,formule:formule,output:objet_output,input:input_JSON}
            console.log (JSON.stringify(Indictateur_JSON));
            // window.location.href='#panel-5';
            
                         $.ajax({
                            
                             type: 'POST',
                             
                             url : 'Calcul-et-Gestion-Indicateur/Module-Indicateur-FrontOffice/PHP/indic.php',
                             data: {
                             reason : 'addindic',
                             data : Indictateur_JSON,  
                             trace : URL },
                             success : function(data) {

                                    list_ind();
                                  
                                    alert('indicateur saved');
                                    document.getElementById("rep-Ind").innerHTML="";
                                    $("#waiting2").hide();
                                    }   
               
                                     });
            });
             });           
            });
            
            
            
            
function SamoTraceMeTransf (URL,time_form,scale,traceIcon,traceZoom,scaleZoom,TraceText)
{
console.log ('hereTransf');
delete (traceT);
 var traceT = new Samotraces.KTBS.Trace(URL);
        
      var timerT = new Samotraces.Timer(Date.now());
	  var hour = 3600*1000;
	  var day = 24*hour;
	  
	  traceT.on('trace:updateData',function(){
                 traceT.list_obsels();
                 delete(twZoomT);
                 var twZoomT = new Samotraces.TimeWindow({start: new Date(Date()).setHours(new Date (Date()).getHours()-2), end: Date.now()});
                 new Samotraces.UI.Widgets.IntervalTimeForm(time_form,twZoomT);
                 delete(tw11T);
                 
               //  traceT.on ('trace:updateT',function(){
               //  o = traceT.get_First_obsel().get_begin();
                var  tw11T = new Samotraces.TimeWindow({start: new Date(traceT.origin).getTime(), end: Date.now()});
                new Samotraces.UI.Widgets.TraceDisplayIconsFix(traceIcon,traceT,tw11T,twZoomT,options);
                new Samotraces.UI.Widgets.WindowScaleFix(scale,tw11T);
                var widget= new Samotraces.UI.Widgets.TraceDisplayIconsZoom(traceZoom,traceT,twZoomT,options);
                new Samotraces.UI.Widgets.WindowScaleFix(scaleZoom,twZoomT);
                var widgetText1=new Samotraces.UI.Widgets.TraceDisplayText(TraceText,traceT,twZoomT);
              //   })
                 
                
                 
                 
	             
               
        });
  

}
