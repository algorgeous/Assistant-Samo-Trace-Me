<?php
require_once dirname (dirname(dirname(dirname( __FILE__ ))))."/Global.php" ;
require_once  $path_eval_math;


function decomposer($equation){
	$fb = array(  // built-in functions
        'sin',
        'cos',
        'tan',
        'sqrt','abs','ln','log','exp' ); 
	$bg = array('sinh','arcsin','asin',
		'arcsinh','asinh','cosh','arccos','acos',
		'arccosh','acosh','tanh','arctan','atan',
		'arctanh','atanh');

	$c = array('+','-','(',')','/','*','^');
	$numeric = array('1','2','3','4','5','6','7','8','9','0');

	$X =   explode('=',$equation);
	$output = $X[0];
	$Y = $X[1];


	foreach($numeric as $key => $v){
		$Y = str_replace($v, '#', $Y);
	}
	foreach($c as $key => $v){
		$Y = str_replace($v, '#', $Y);
	}

	foreach($bg as $key => $v){
		$Y = str_replace($v, '#', $Y);

	}
	foreach($fb as $key => $v){
		$Y = str_replace($v, '#', $Y);

	}

	$Y = str_replace(' ', '', $Y);

	for ($i=0; $i <strlen($Y) ; $i++) { 
		if ($Y[$i]=='#'){
			for ($j=$i+1; $j < strlen($Y); $j++) { 
				if ($Y[$j] == '#'){
					$Y[$j] = ' ';
				}
				else{
					break;
				}
			}
		}
	}
	$Y = str_replace(' ','', $Y);
	$input = '';
	if($Y[0] == '#'){

		for ($i=1; $i <strlen($Y) ; $i++) { 
			$input = $input.$Y[$i];
		}
	}
	else{
		$input = $Y;
	}
	$input = explode('#', $input);

	$input = array_unique($input);
	$j = 0;
	for ($i=0; $i <sizeof($input) ; $i++) {
		if(strlen($input[$i])!=0){
			$INPUT[$j] = $input[$i];
			$j++;	
		}
		
	}

	$f = $X[1];
		foreach ($INPUT as $key => $value) {
			$kamich = rand(1,5);
			
			$f = str_replace($value,"$kamich" , $f);
		}

		$m = new EvalMath;
		$m->suppress_errors = true;
		$res=$m->evaluate($f);




if ($res == false){

	$result = array("Er" => "Somthing Wrong with your Equation");
}
else{

	$result = array("output" => $output , "input" => json_encode($INPUT));

}

	
	echo(json_encode($result));
}

  if (isset($_POST)) {
         decomposer ($_POST['equation']);

    }


?>
