<?php

class SparqlGenerate 
{
    
    static public function generatePrefix(){
        $prefixes[] = "PREFIX : <http://liris.cnrs.fr/silex/2009/ktbs#>";	
        $prefixes[] = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>";	
        $prefixes[] = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>";	
        $prefixes[] = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>";
        $prefixes[] = "PREFIX xml: <http://www.w3.org/XML/1998/namespace>";	
        $prefixes[] = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>";	
        $prefixe = implode("\n", $prefixes)."\n";
        return $prefixe;
    }
    // select all attribute 
    static public function generateALLSELECT(){
        $SELECT="[] :hasSourceObsel ?o1;";
        return $SELECT;
    }
    
     // select with specific attribute
   static public function generateSELECT($ModelURL, $Attribute)
    {
         $SELECT[]="[] :hasSourceObsel ?o1 ;";
        $SELECT[]="a ?a ;";
        $SELECT[]=":hasTrace <%(__destination__)s> ;";
        $SELECT[]=":hasBegin ?begin ;";
        $SELECT[]=":hasEnd ?end ;";
       
        $SELECT[]=":hasSubject ?subject ;" ;
        $i=1;
        foreach ($Attribute as &$att){
            $SELECT[]="<".$ModelURL."#".$att."> ?".$i.";";
            $i++;
        }
        $SELECTS = implode("\n", $SELECT)."\n";
        return $SELECTS;
    
    }
    
    
    static public  function generateConditionFiltreALL($ModelURL, $AttributeCondition, $TypeObsel, $condAttr){
        $SELECT[]="?o1 a ?a ;";
        
        $i=1;
        foreach ($AttributeCondition as &$att){
        $SELECT[]="OPTIONAL { ?o1 <".$ModelURL."#".$att."> ?".$i.".}";
        $i++;
        }
        
        foreach ($TypeObsel as &$att){
        $Cond[]="?a="."<".$ModelURL.$att.">";
        }
        
        foreach ( $condAttr as &$Arg){
            foreach ( $Arg["attribute"]as &$ArgAttr){
                $Cond[] = "(?a="."<".$ModelURL.$Arg["type"].">"."&&"."?".$ArgAttr["index"]."=\"".$ArgAttr["value"]."\")";
            }
        }
        
        $Condition = implode("\n", $SELECT)."\n"."FILTER (".implode("||", $Cond).")";
        return $Condition ;
    }
   

   static public  function generateConditionFiltre($ModelURL, $Attribute, $TypeObsel, $condAttr){
        $SELECT[]="?o1 a ?a ;";
        $SELECT[]=" :hasBegin ?begin ;";
        $SELECT[]=":hasEnd ?end ;";
        $SELECT[]=" :hasSubject ?subject ;" ;
        $i=1;
        foreach ($Attribute as &$att){
            $SELECT[]="OPTIONAL { ?o1 <".$ModelURL."#".$att."> ?".$i.".}";
            $i++;
        }
        foreach ($TypeObsel as &$att){
            $Cond[]="?a="."<".$ModelURL.$att.">";
        }
        foreach ( $condAttr as &$Arg){
            foreach ( $Arg["attribute"]as &$ArgAttr){
                $Cond[] = "(?a="."<".$ModelURL.$Arg["type"].">"."&&"."?".$ArgAttr["index"]."=\"".$ArgAttr["value"]."\")";
            }
        }
        
        $Condition = implode("\n", $SELECT)."\n"."FILTER (".implode("||", $Cond).")";
        return $Condition ;
    }
  

}
?>
