<?php
    require_once dirname( __FILE__ )."/GenerateModel.php" ;
   
   $GenerateModel = new GenerateModel($_POST['TraceURI'],$_POST['ModelName']);
   $Model = new TraceModel($GenerateModel->BaseURI,$GenerateModel->ModelName);
   $GenerateModel->PutModel();
   echo ($Model->getData());
    /* if (!$Model->exist())
   
        {$GenerateModel->PutModel();}
     else 
        {echo ($Model->getData());}*/
?>
