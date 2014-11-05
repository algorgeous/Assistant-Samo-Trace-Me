<?php

require 'jsmin.php';
    header("Content-type: text/javascript");
    $debug = true;
    $files = array(	
                 "d3.js"
                );

    $js = "";
    foreach($files as $f)
        $js .= file_get_contents($f);
    
    if($debug) 
    {
  echo $js;
    } 
    else 
    {
  echo $jsmin_php = JSMin::minify($js);
    }
