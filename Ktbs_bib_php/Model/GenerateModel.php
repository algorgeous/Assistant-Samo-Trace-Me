<?php
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
               { $t = explode ('m:',$value);
                $Type=$t[1];}
               else
               {
                   if (($key!=="@type")&&($key!=="@id")&&($key!=="begin")&&($key!=="end")&&($key!=="subject"))
                   {  
                      $a = explode ('m:',$key);
                       $Attribute=$a[1];
                       
                       if (strripos ($Attribute,'/'))
                       {
                        $h = explode ('/',$Attribute);
                       $HasType = $h[0];
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
                  
                       }
                   }
               }
           }
      }
  
      $script = implode("\n", $prefixes)."\n".implode("\n", $statements)."\n".implode("\n", $statementsType)."\n".implode("\n", $statementsAttribute);
      //var_dump ($script);
      $Model-> put($script);  
   }
}

?>