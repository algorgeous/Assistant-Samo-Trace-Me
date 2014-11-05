<?php
 require_once dirname(dirname( __FILE__ ))."/Global.php" ;
 require_once $path_RestfulHelper ;
        /* This class is used to identify the KTBS.*/

class KtbsRoot{

	public $uri = null;

	function __construct($root){

		$this->uri = $root;
	}

	function getListOfBases(){

		$cont = RestfulHelper::getInfo($this->uri);
		$cont = json_decode($cont,true);
		$bases = $cont['hasBase'];
		return $bases;
	}

	function exist(){

		$this->exist = RestfulHelper::get($this->uri);
		return $this->exist;
	}
}

?>