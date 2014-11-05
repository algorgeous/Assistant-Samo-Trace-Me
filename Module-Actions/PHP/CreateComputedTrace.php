<?php

require_once  dirname( __FILE__ )."/SparqlGenerate.php";

require_once dirname(dirname(dirname( __FILE__ )))."/Global.php" ;
require_once $path_Trace;
require_once $path_ComputedTrace;

class CreateComputedTrace{
    
    public $TraceName = null;
    public $BaseURI = null;
    public $TraceURI = null;
    public $ModelURI = null;
    public $TraceSourceName=null;
	    
    function __construct ($BaseURI,$TraceName,$TraceSourceName,$ModelURI){
		$this->TraceName = $TraceName;
		$this->BaseURI = $BaseURI;
		$this->TraceSourceName = $TraceSourceName;
		$this->TraceURI= $this->BaseURI.$this->TraceName;
		if ($ModelURI == null){

			$trace = new Trace ($this->TraceURI);
			$this->ModelURI = $trace->getModel();
		}
		else{

			$this->ModelURI = $ModelURI; 
		}
    }

    function CreateComputedTrace_sparql($TypeObsel,$AttributeCond,$condition){
        
        $ComputedTrace = new ComputedTrace($this->BaseURI,$this->TraceName);
        $source = array(new Trace($this->BaseURI.$this->TraceSourceName));
        $ComputedTrace->config('sparql',$source);
        $ComputedTrace->setSparqlParameter($TypeObsel,$AttributeCond,$condition);
        if ($ComputedTrace->exist()){

        	$ComputedTrace->Delete();
        }
        $ComputedTrace->sparql();
        
    }

    function CreateComputedTrace_sparql2($TypeObsel,$AttributeCond,$condition){
        
        $ComputedTrace = new ComputedTrace($this->BaseURI,$this->TraceName);
        $source = array(new Trace($this->BaseURI.$this->TraceSourceName));
        $ComputedTrace->config('sparql',$source);
        $ComputedTrace->setSparqlParameter2($TypeObsel,$AttributeCond,$condition);
        if ($ComputedTrace->exist()){

            $ComputedTrace->Delete();
        }
        $ComputedTrace->sparql();
        
    }


    function getUri(){

        return $this->BaseURI.$this->TraceName;
    }
}

/*this class allow to create a computed trace*/

/*class CreateComputedTrace
{
    public $TraceName = null;
    public $BaseURI = null;
    public $TraceURI = null;
    public $ModelURI = null;
    public $TraceSourceName=null;
    public $TraceSourceURI=null;
	    
    function __construct ($BaseURI,$TraceName,$TraceSourceName,$ModelURI){
         $this->TraceName = $TraceName;
         $this->BaseURI = $BaseURI;
         $this->TraceSourceName=$TraceSourceName;
         $this->TraceURI= $this->BaseURI.$this->TraceName;
         $this->TraceSourceURI= $this->BaseURI.$this->TraceSourceName;
         if ($ModelURI == null){
         echo "here";
         $trace = new Trace ($this->TraceSourceURI);
         $this->ModelURI =  $this->BaseURI.substr($trace->getModel(),3);

         }
         else{
         $this->ModelURI = $ModelURI; 
         }
    }
    function CreateComputedTrace_sparql ($TypeObsel,$AttributeCond,$condition){
        
        $sparql = "sparql=".SparqlGenerate::generatePrefix()."CONSTRUCT{".SparqlGenerate::generateALLSELECT().
                          "} WHERE {".SparqlGenerate::generateConditionFiltreALL($this->ModelURI, $AttributeCond, $TypeObsel ,$condition )."}";
        $Parametre = '"'."inherit=true".'",'.'"""'.$sparql.'"""';
        $ComputedTrace = new ComputedTrace ($this->BaseURI,$this->ModelURI,$this->TraceName,"sparql","<".$this->TraceSourceName."/>",$Parametre);
        if (! $ComputedTrace->exist())
        {$ComputedTrace->dump();}
        exit ;
    }
}*/
