 Module-SamoTraceMe
=========

This module allows to offer a graphical and textual display of the trace.
He is based on the namespace [Samotraces.UI. Widgets] (https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/ktbs_bib_JS/SamoTrace/UI/Widgets) for graphical representation and the [Text-Assist-JS library] (https://github.com/fderbel/Assistant-Samo-Trace-Me/tree/master/Module-SamoTraceMe/JS/Assist-Text-JS) for textual representation.


The widgets used in the samo-traceMe Module are : 
  - [TraceDisplayIconsFix.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/TraceDisplayIconsFix.js) widget display the whole trace (), with obsels represented graphically as images.
  - [TraceDisplayIconsZoom.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/TraceDisplayIconsZoom.js) :widget display the trace between two date.
  - [TraceDisplayText.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/TraceDisplayText.js) : widget display a textual description of the list of obsel during the selected temporal window.
  - [ReadableTimeForm](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/IntervalTimeForm.js) : Widget for visualising the current time as a date/time.
  - [ WindowScale] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/WindowScale.js) : Widget for visualising a time scale.
  
The image below shows a visualization of a trace in the module samoTraceMe


#### Creating a trace visualisation with SamoTrace-Me

##### The html code
For each widget, you must create an html element. The id of the HTML element is needed to properly initialize the widget.
```sh
<div id="time_formDIV">
        <input type="button" class="btn btn-primary btn-sm" id="Refresh" value="Refresh trace" style="float: right"/>
 </div>
 <div id="scaleDIV"> </div>
 <div id="traceINITIALDIV"> </div>
 <div id="traceZoomDIV"></div>
 <div id="scaleZoomDIV"> </div>
 <div id="TraceTextDIV"> </div>
```

##### Javascript code
At first, we need to initialize the objects [trace](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/KTBS.Trace.js), [timer](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/Timer.js) , [tw] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/TimeWindow.js) and twZoom
```sh
traceINITIAL = new Samotraces.KTBS.Trace(URL);
var timer = new Samotraces.Timer(Date.now());
var tw = new Samotraces.TimeWindow({start: new Date(traceINITIAL.origin).getTime(), end: Date.now()});
var twZoom = new Samotraces.TimeWindow({start: new Date(Date()).setHours(new Date (Date()).getHours()-2), end: Date.now()});
```
After we create widgets 

```sh
var widget_TimeForm= new Samotraces.UI.Widgets.IntervalTimeForm("time_formDIV",twZoom);
var widget_WindowScaleFix= new Samotraces.UI.Widgets.WindowScaleFix("scaleDIV",tw);
var widget_TraceDisplayIconsFix = new Samotraces.UI.Widgets.TraceDisplayIconsFix("traceINITIALDIV",traceINITIAL,tw,twZoom,options);

var  widget_DisplayIconsZoom = new Samotraces.UI.Widgets.TraceDisplayIconsZoom("traceZoomDIV",traceINITIAL,twZoom,options);
var widget_WindowScaleFix= new Samotraces.UI.Widgets.WindowScaleFix("scaleZoomDIV",twZoom);
var widgetText = new Samotraces.UI.Widgets.TraceDisplayText("TraceTextDIV",traceINITIAL,twZoom);
```
##### SamoTraceMe interface
The figure below shows the interface of visualization  of a trace with samoTracMe
![alt tag](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/images/Img2.png)
