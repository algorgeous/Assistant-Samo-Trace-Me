<?php

require_once dirname(dirname( __FILE__ ))."/Global.php" ;
require_once $path_TraceModel;
require_once $path_Trace;
/*this class allow to generate a Trace Model from the list obsel trace*/
class GenerateModel{
    public $TraceURI = null;
    public $ModelName = null;
    public $BaseURI = null;
    public $Obsels = null ;
	    
    function __construct ($TraceURI,$ModelName){
         $this->TraceURI = $TraceURI;
         $this->ModelName = $ModelName;
         $Trace = new Trace ($TraceURI);
         $this->BaseURI = $Trace->getBaseURI();
         //$this->BaseURI="http://ktbs.univ-lyon1.fr/semasema34/";
         $this->Obsels = $Trace->getObsels();
         
         //$TraceInfo = RestfulHelper::getInfo($TraceURI);
         //$this->BaseURI= json_decode($TraceInfo,true)['inBase'];
         //$ObselListInfo = RestfulHelper::getInfo(json_decode($TraceInfo,true)['hasObselList']);
        // $this->Obsels = json_decode($ObselListInfo,true)['obsels'];
    }
    function PutModel (){
       
        $Model = new TraceModel($this->BaseURI,$this->ModelName);
        if (!$Model->exist()){$Model->dump();}
  
        $prefixes[] = "@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .";	
        $prefixes[] = "@prefix skos: <http://www.w3.org/2004/02/skos/core#> .";
        $prefixes[] = "@prefix xsd:  <http://www.w3.org/2001/XMLSchema#> .";
        $statements[] = "<.> :contains <".$Model->name."> .";
        $statements[] = "<".$Model->name."> a :TraceModel .";
        $statementsAttribute = array();	
        $statementsType = array () ;
        $Typearray = array () ;
        
        for ($i=0;$i < sizeof ($this->Obsels) ; $i++)
        {
            foreach ($this->Obsels[$i]  as $key => $value )
            {
                
                if ($key == "@type") 
                { if (isset (explode ('m:',$value)[1])) {$Type=explode ('m:',$value)[1];}}
                else
                {
                    if (($key!=="@type")&&($key!=="@id")&&($key!=="begin")&&($key!=="end")&&($key!=="subject"))
                    {
                        if (isset (explode ('m:',$key)[1]))
                          {  $Attribute=explode ('m:',$key)[1];
                        
                         if (strripos ($Attribute,'/'))
                         {
                         $HasType = explode ('/',$Attribute)[0];
                            }
                            else 
                            {
                             $HasType= "With_".$Attribute;
                             }
                            $statementsAttribute[] = "<#".$Attribute."> a :AttributeType ;";
                             $statementsAttribute[] = "skos:prefLabel \"".$Attribute."\" ;";
                             $statementsAttribute[] = ":hasAttributeDomain <#".$HasType."> ;";
                             $statementsAttribute[] = ":hasAttributeRange xsd:string . ";
                             $statementsType[] = "<#".$HasType."> a :ObselType .";
                                if ($Type !== $HasType)
                                { 
                            $statementsType[] = "<#".$Type."> a :ObselType ;"; 
                            $statementsType[] = "   :hasSuperObselType <#".$HasType."> .";
                   
                             }}
                    }
                }
            }
       }
   
        
       $script = implode("\n", $prefixes)."\n".implode("\n", $statements)."\n".implode("\n", $statementsType)."\n".implode("\n", $statementsAttribute);
       $Model-> put($script);	
     //  echo ($Model->getData());
    }
 }
?>
