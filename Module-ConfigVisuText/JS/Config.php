<?php

require 'jsmin.php';
    header("Content-type: text/javascript");
    $debug = true;
    $files = array(	
                 "Assist-Text-JS/Assist-Config.js"
                 ,"Config.js"
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
