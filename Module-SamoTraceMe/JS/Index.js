$('#Refresh').on('click',function (e) {

        last_obsel = traceINITIAL.get_Last_obsel().get_begin()+1000;
        traceINITIAL.list_obsels (last_obsel-new Date(traceINITIAL.origin).getTime());
        twZoom.set_start  (new Date(Date()).setHours(new Date (Date()).getHours()-1));
        twZoom.set_end (Date.now());
      
        }); 
