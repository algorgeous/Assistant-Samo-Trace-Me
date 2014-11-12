KTBS BIB JS
========

The KTBS_BIB_JS is a JS package used to communicate with [KTBS](https://kernel-for-trace-based-systems.readthedocs.org/en/latest/) ( Kernel of Trace Based Systems ) on the client side. Samotraces.js provides a set of tools to visualise and manage traces.
We have added a tools to visualize a model for this framework.

##### Trace management

Samothraces.js offers differents class for creating traces, storage traces and obsels in KTBS and retrieving all the informations about stored traces from the KTBS :[KTBS.Resource.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/KTBS.Resource.js),  [KTBS.Base.js](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/KTBS.Base.js) , [KTBS.Trace.js](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/KTBS.Trace.js), [Obsel.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/Obsel.js)

##### Trace visualisation

Samotraces.js offers differents trace visualisation widgets. Each widget provide a graphical user interface.
The widgets used in the samo-traceMe assistant are : 
  - [TraceDisplayIconsFix.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/TraceDisplayIconsFix.js) widget display the whole trace (), with obsels represented graphically as images.
  - [TraceDisplayIconsZoom.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/TraceDisplayIconsZoom.js) :widget display the trace between two date.
  - [TraceDisplayText.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/TraceDisplayText.js) : widget display a textual description of the list of obsel during the selected temporal window.
  - [ReadableTimeForm](https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/IntervalTimeForm.js) : Widget for visualising the current time as a date/time.
  - [ WindowScale] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/WindowScale.js) : Widget for visualising a time scale.
  
For more information about the other widget, have a look on this link : http://dsi-liris-silex.univ-lyon1.fr/bmathern/samotraces/doc/Samotraces.UI.Widgets.html



##### Model visualisation

We have added  classes to samotraces.js that allows the visualization of model :
  - [KTBS.Model.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/core/KTBS.Model.js) :this class allows you to generate the list of object 'ObselType {"type:" ","attributes": []} ' from the model data (json format)
  - [WidgetDisplayModel.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/WidgetDisplayModel.js) : widget display the model , with obsels types represented graphically as images.
  - [ObselTypeInspectorCocher.js] (https://github.com/fderbel/Assistant-Samo-Trace-Me/blob/master/ktbs_bib_JS/SamoTrace/UI/Widgets/ObselTypeInspectorCocher.js) :Widget for visualising an Obsel Type as an HTML list.
  
  
  *use*

  *current_obsel1	= new Samotraces.Selector('obsel')*;
  
  *new Samotraces.UI.Widgets.ObselTypeInspectorCocher('obselinspector1',current_obsel1)*;
  
  *model = new Samotraces.KTBS.Model(dataModel)*;
  
  *Mod = new Samotraces.UI.Widgets.DisplayModel ('model1',model,options)*;
  
  
  
  
  ##### For a detailed description of the framwork samotraces.js please have a look on its official documentation
 
 http://dsi-liris-silex.univ-lyon1.fr/bmathern/samotraces/doc/index.html
  
