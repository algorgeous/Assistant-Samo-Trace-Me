<?php
$dir = dirname(__FILE__);
$page = file_get_contents($dir."/Index.html");


if (isset($_GET["mode"]))
{
        if($_GET["mode"]=="utilisateur" && $_GET["page"]=="TraceView")
        {
           
            $arr = explode ('=',$_SERVER ["QUERY_STRING"]);
    
            $trace_uri = urldecode($arr[3]) ;
            $array = explode ('/',$trace_uri);
            $trace_name = $array[count($array)-2];
        $a = explode ($trace_name,$trace_uri);
            $base_uri = $a[0];
            $page = file_get_contents($dir."/indexU.html");
            $page = str_replace("\$trace_name", $trace_name, $page);
            $page = str_replace("\$base_uri", $base_uri, $page);
            echo $page;
        }
        else if($_GET["mode"]=="admin" && $_GET["page"]=="TraceView")
        {
            $arr = explode ('=',$_SERVER ["QUERY_STRING"]);
            $trace_uri = urldecode($arr[3]) ;
            $array = explode ('/',$trace_uri);
            $trace_name = $array[count($array)-2];
            $a = explode ($trace_name,$trace_uri);
            $base_uri = $a[0];
            $page = str_replace("\$trace_name", $trace_name, $page);
            $page = str_replace("\$base_uri", $base_uri, $page);
            $page = str_replace("NA", "A", $page);
            echo $page;
        }
}
else if ($_GET["page"]=="TraceView")
{   
    $arr = explode ('=',$_SERVER ["QUERY_STRING"]);
    $trace_uri = urldecode($arr[2]) ;
   
    $array = explode ('/',$trace_uri);
    $trace_name = $array[count($array)-2];
    
    $a = explode ($trace_name,$trace_uri);
    $base_uri = $a[0];
    $page = str_replace("\$trace_name", $trace_name, $page);
    $page = str_replace("\$base_uri", $base_uri, $page);
    echo $page;

}
else 
{echo $page;
}

