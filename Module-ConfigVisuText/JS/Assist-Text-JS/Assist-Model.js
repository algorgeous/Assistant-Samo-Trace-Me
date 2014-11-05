/** 
	 * @function
	 * @memberof Assist
	 * @name Assist.Model
	 * @desc all function used in the model 
**/
    Assist.Model = {
        generateModel : function ()			
        {			
            var Lignes = document.getElementById("table").rows;
            var i =1 ;
            var TypeArray = []
            while (i<Lignes.length)
            {
                if ((Lignes[i].getAttribute("class")=="active") )
                {
                    var typeT = Lignes[i].cells[0].childNodes[0].name; 
                    var textT = Lignes[i].cells[2].childNodes[0].value;
                    var styleT = Lignes[i].cells[3].childNodes[0].value;
                    var j = i+1 ;
                    var attibuteArray = []
                    // parcour attribut
                    while (j<Lignes.length)
                    {
                        if (Lignes[j].getAttribute("class")!=="active")
                        {
                            if (Lignes[j].cells[1].childNodes[0].checked)
                            {
                                var nomA = Lignes[j].cells[1].childNodes[0].name;
                                var textA = Lignes[j].cells[2].childNodes[0].value;
                                var styleA = Lignes[j].cells[3].childNodes[0].value;
                                var att = {nom : nomA,text : textA, style : styleA} 
                                attibuteArray.push (att) ;
                            }
                            j++; 
                        }
                        else {break;} 
                    }
                    var type = {type:typeT , text: textT, style: styleT , attribut: attibuteArray };
                    if (Lignes[i].cells[0].childNodes[0].checked) {TypeArray.push (type)};
                    i=j;
                }
            }
            // géniric ou non
            var base = $("#URLTRACE").val()+$("#TraceName").val();
            if ((localStorage["Assit.mode"]== "U") || (localStorage["Assit.mode"]== "NA"))
            {
                if (localStorage["Assit.ModelS"]!= undefined)
                {
                    ModelArray=JSON.parse (localStorage["Assit.ModelS"]);
                }
                else 
                {ModelArray = [];}
                if (Assist.Model.getModelSpecificID(base)!=undefined)
                {
                     delete (ModelArray[Assist.Model.getModelSpecificID(base)]);
                     ModelArray.splice (Assist.Model.getModelSpecificID(base),1);
                }
                ModelS = {url:base , model:TypeArray};
                ModelArray.push (ModelS)
                localStorage["Assit.ModelS"] = JSON.stringify(ModelArray);
            }
            else
            {
                //localStorage["Assit.Model"] = JSON.stringify(TypeArray);
            }
        },

        getModelType : function (Type,models){
            for ( var i = 0; i < models.length; i++) 
            {
                if (models[i]["type"] == Type)
                {return models[i];break;}
            }
        }, 

        getModelAttribute : function (nom,model){
            for ( var i = 0; i < model.attribut.length; i++) 
            {
                if (model.attribut[i]["nom"] == nom)
                {return model.attribut[i];break;}
            }
        },

        getModelSpecific : function (url) {
            model = JSON.parse (localStorage["Assit.ModelS"]);
            for ( var i = 0; i < model.length; i++) 
            {
                if (model[i]["url"] == url)
                {return model[i].model;break;}
            }
        }, 
          
        getModelSpecificID : function (url){
            model = JSON.parse (localStorage["Assit.ModelS"]);
            for ( var i = 0; i < model.length; i++) 
            {
                 if (model[i]["url"] == url)
                    {return i;break;}
            }
        }   
    }			
