/** 
	 * @function
	 * @memberof Assist
	 * @name drawTabObsel
	 * @desc get the Tab of config obsels 
**/		
		
Assist.drawTabObsel = function ()	{

   Assist.obsels_json({
             base_uri : $("#URLTRACE").val(),
             trace_name : $("#TraceName").val(),
             fn : function(obsels){
				  console.log("test trace_read correctly");
				  draw(obsels);
				}
                    });
     
   //var obsels = JSON.parse (localStorage["Assit.obsels"]);
   
    draw= function (obsels){
   var obsel_types = [];
   index =1 ;
   for ( var i = 0; i < obsels.length; i++) 
   {
   var obsel = obsels[i];
   // if have specific model
   var url = $("#URLTRACE").val()+$("#TraceName").val();
   if (Assist.Model.getModelSpecific(url)!=undefined)
   models = Assist.Model.getModelSpecific(url) ;
   else
   models = JSON.parse (localStorage["Assit.Model"]);
   if (obsel_types.indexOf(obsel["@type"]) == -1)
   {
        obsel_types.push(obsel["@type"]);
        if (localStorage["Assit.Model"] != undefined)
        {
                valT=getNameT(obsel["@type"]);
                var modelT = Assist.Model.getModelType (valT,models);
                if (modelT != undefined)
	            {createElementType(obsel["@type"], modelT);}
	            else 
	            {createElementType(obsel["@type"]);}
	     }
	     else 
	        {
	            createElementType(obsel["@type"]);}
	            for (j in obsel) 
	            {  
	                if (j !=="@type")
	               {
	                if (modelT != undefined)
                        {
                        val=getName(j);
                        var modelA = Assist.Model.getModelAttribute (val,modelT);
                        if (modelA != undefined)
	                        {
	                        createElementAttribute (j,modelA);
	                        }
	                   else
	                    {createElementAttribute (j);}
                         }
	                 else
	                {createElementAttribute (j);}
	             }
	             
	           }
          };
    }

    listen();  
}
}

createElementType = function (val,modelT){
        valT = getNameT(val);
        var tr = document.createElement ("tr");
        tr.setAttribute( "class","active");
        tr.setAttribute ("id",index);
        var td = document.createElement ("td");
        var chek = document.createElement ("input");
        chek.setAttribute('type','checkbox');
        chek.setAttribute('name',valT);
        if (typeof (modelT) !=="undefined"){chek.checked = true;}
        td.appendChild (chek);
        td.appendChild (document.createTextNode(" "));
        td.appendChild (document.createTextNode(valT));
        tr.appendChild (td);
        var td2 = document.createElement ("td");
        td2.appendChild (document.createTextNode(""));
        tr.appendChild (td2);
        var td3 = document.createElement ("td");
        var text = document.createElement ("input");
        text.setAttribute('type','text');
        if (typeof (modelT) !=="undefined")
        {
            text.value = modelT["text"];
        }
        td3.appendChild(text);
        tr.appendChild (td3);
        var td4 = document.createElement ("td");
        var select = document.createElement("select");
        select.setAttribute('class','form-control');
        select.setAttribute('Id','eventType');
        var list = JSON.parse(localStorage["Assit.Attribute.style"]);
        for (var j=0; j< list.length; j++)
        {
           select.options[select.options.length] = new Option(list[j],list[j]);
        }
        if (typeof (modelT) !=="undefined")
        {  
            select.value = modelT["style"];
        }
        td4.appendChild (select);
        tr.appendChild (td4);
        var td5 = document.createElement ("td");
        tr.appendChild (td5);
        document.getElementById("tab").appendChild(tr);
        index++;
}
createElementAttribute = function (val,modelA){
               valT = getName(val);
               var trA = document.createElement ("tr");
               trA.setAttribute("name",valT);
               trA.setAttribute ("id",index);
               var td1 = document.createElement ("td");
               var chek = document.createElement ("input");
               chek.setAttribute('type','checkbox');
               chek.setAttribute('name',valT);
               
               if (typeof (modelA) !=="undefined")
                   {chek.checked = true;}
               td1.appendChild(document.createTextNode(""));
               var td2 = document.createElement ("td");
               td2.appendChild (chek);
               td2.appendChild (document.createTextNode("  "));
               td2.appendChild (document.createTextNode(valT));
               var td3 = document.createElement ("td");
               var text = document.createElement ("input");
               text.setAttribute('type','text');
                if (typeof (modelA) !=="undefined")
                    {text.value = modelA["text"];}
               td3.appendChild(text);
               var td4 = document.createElement ("td");
               var select = document.createElement("select");
               select.setAttribute('class','form-control');
               select.setAttribute('Id','eventType');
               var list = JSON.parse(localStorage["Assit.Attribute.style"]);
               for (var j=0; j< list.length; j++)
                                {
              select.options[select.options.length] = new Option(list[j],list[j]);
                                }
               if (typeof (modelA) !=="undefined")
                   {select.value = modelA["style"];}
               td4.appendChild (select);
               var td5 = document.createElement ("td");
               var chek1 = document.createElement ("input");
               chek1.setAttribute('name',valT);
               chek1.setAttribute('class',"all");
               chek1.setAttribute('type','checkbox');
               chek1.setAttribute('index',index);
               td5.appendChild(chek1);
               trA.appendChild (td1);
               trA.appendChild (td2);
               trA.appendChild (td3);
               trA.appendChild (td4);
               trA.appendChild (td5);
               document.getElementById("tab").appendChild(trA);
               index ++;
        }
        listen = function (){
               $(".all").on("click",function() {   
               if (this.checked )
                {
                var index = this.getAttribute("index") ;
                $("tr[name='"+this.name+"']").each(function() {
                    document.getElementById("table").rows[this.id].cells[2].childNodes[0].value= document.getElementById("table").rows[index].cells[2].childNodes[0].value;
                    document.getElementById("table").rows[this.id].cells[3].childNodes[0].value= document.getElementById("table").rows[index].cells[3].childNodes[0].value;
                    document.getElementById("table").rows[this.id].cells[1].childNodes[0].checked = true;
                    })
                }
                else 
                {
                $("tr[name='"+this.name+"']").each(function() {
                    if (this.id !== index)
                    {
                    document.getElementById("table").rows[this.id].cells[2].childNodes[0].value= "";
                    document.getElementById("table").rows[this.id].cells[3].childNodes[0].value= "Noir";
                    document.getElementById("table").rows[this.id].cells[1].childNodes[0].checked = false;
                    }
                })
                }
                })
      }
