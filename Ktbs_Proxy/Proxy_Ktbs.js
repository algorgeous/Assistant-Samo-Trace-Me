/**
	 * Library of the Objects of ProxyKtbs
	 * @namespace ProxyKtbs
**/
var ProxyKtbs = {};

ProxyKtbs.ExistStores = function (name) {
    if (localStorage[name])
    return true
    else
    return false
}

ProxyKtbs.initKeyStorage = function () {
    if (! ProxyKtbs.ExistStores ("SamoMe.traces"))
    {
        localStorage.setItem("SamoMe.traces","[]")
    }
}

ProxyKtbs.addStore_ArrayTraces = function (IdTrace) {
    ProxyKtbs.initKeyStorage () 
    var array_traces = JSON.parse (localStorage.getItem("SamoMe.traces"));
    if (array_traces.indexOf(IdTrace) ==-1)
      {
        array_traces.push (IdTrace);
        localStorage.setItem("SamoMe.traces",JSON.stringify(array_traces));
      }
}

ProxyKtbs.addStore_ListObsel = function (IdTrace,Data) {

   if (ProxyKtbs.ExistStores("SamoMe."+IdTrace))
   {
   localStorage.setItem("SamoMe."+IdTrace,JSON.stringify(JSON.parse(localStorage["SamoMe."+IdTrace]).concat (Data)))
   
   }
   else 
   {
   localStorage.setItem("SamoMe."+IdTrace,JSON.stringify(Data))
   }

}
ProxyKtbs.getStore = function (name) {
   return JSON.parse (localStorage.getItem(name))

}
