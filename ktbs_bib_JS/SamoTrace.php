<?php

require 'jsmin.php';
    header("Content-type: text/javascript");
    $debug = true;
    $files = array(	
                  "Jquery/jquery.js"
                 ,"D3/d3.js"
                 ,"Assist.js"
                 ,"bootstrap/bootstrap.min.js"
                 ,"SamoTrace/generate_samotraces.js"
                 ,"SamoTrace/core/EventHandler.js"
                 ,"SamoTrace/core/KTBS.js"
                 ,"SamoTrace/core/Obsel.js"
                 ,"SamoTrace/core/KTBS.Base.js"
                 ,"SamoTrace/core/KTBS.Obsel.js"
                 ,"SamoTrace/core/KTBS.Resource.js"
                 ,"SamoTrace/core/KTBS.Trace.js"
                 ,"SamoTrace/core/Timer.js"
                 ,"SamoTrace/core/TimeWindow.js"
                 ,"SamoTrace/UI/Widgets/Widget.js"
                 ,"SamoTrace/UI/Widgets/WindowScale.js"
                 ,"SamoTrace/UI/Widgets/IntervalTimeForm.js"
                 ,"SamoTrace/UI/Widgets/TraceDisplayIconsFix.js"
                 ,"SamoTrace/UI/Widgets/TraceDisplayText.js"
                 ,"SamoTrace/UI/Widgets/WindowScaleFix.js"
                 ,"SamoTrace/UI/Widgets/TraceDisplayIconsZoom.js"
                 ,"SamoTrace/UI/Widgets/WidgetDisplayModel.js"
                 ,"SamoTrace/UI/Widgets/ObselInspector.js"
                 ,"SamoTrace/UI/Widgets/ObselTypeInspector.js"
                 ,"SamoTrace/core/Selector.js"
                 ,"SamoTrace/core/KTBS.Model.js"
                 ,"SamoTrace/UI/Widgets/ObselTypeInspectorCocher.js"
                 
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
