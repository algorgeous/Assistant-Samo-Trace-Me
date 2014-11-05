// Copyright 2012 Mean-Tech Ltd. - All Rigth Reserved

function queryHistory(page) {
    var microsecondsPerWeek =  1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - (6*microsecondsPerWeek);
    
    var numRequestsOutstanding = 0;
    
   /* chrome.history.search({
	'text': '',          
        'maxResults': 5000,
	'startTime': oneWeekAgo 
    }, function(historyItems) {
	processHistoryItems(historyItems);
    });*/
  // trace.obsel_list.forEach(function(o){processHistoryItems(o)})

  processHistoryItems(traceINITIAL.obsel_list)
  
}

urls = new Array();
titles = new Array();
countCallsVI = 0;
haveStarted = false;

function processHistoryItems(his){
    for (i in his) { 
        var url = his[i].type;
	urls[url] = new Array();
	titles[url] = his[i].type;
    }    
    getVisits();
}

function callVisits(url){
    haveStarted = true;
    countCallsVI++;
    //chrome.history.getVisits({url: url}, function(results){ processVisitItems(url, results)});
    processVisitItems(url,  traceINITIAL.get_List_obsel_ParType(url));
   
}

function getVisits(){
    for (url in urls){
	callVisits(url);
    }
}

function processVisitItems(url, vis){
    countCallsVI--;
    var i=0;
    for(vi in vis){
	urls[url][i]=vis[vi].begin;
	i++;	
    }
}

var pageskey = new Array();
var pagesvalue = new Array();
var domainskey = new Array();
var domainsvalue = new Array();
var dates = new Array();
var days = new Array();
var hours = new Array();
var wordskey = new Array();
var wordsvalue = new Array();

function insertIntoTables(keys, values, key, value){
    var i=0;
    var svalue = null;
    var skey = null;
    for(i=0; i < values.length; i++){
	if (values[i] < value) {
	    svalue=values[i];
	    skey=keys[i];
	    break;
	}
    }
    var l =  values.length;    
    keys[i]=key;
    values[i]=value;    
    for (j=i+1; j <= l; j++){
	nsvalue=values[j];
	nskey = keys[j];
	values[j]=svalue;
	keys[j]=skey;
	svalue=nsvalue;
	skey=nskey;
    }
}


function checkPagesFilter(url){
    var size = 0;
    for (p in pageFilters){
	if (p==url && pageFilters[url]) return true;
	if (pageFilters[p]) size++;
    }
    return size==0;
}

// do and...
function checkCloudFilter(url){
    var title = titles[url];
    var size = 0;
    for (w in cloudFilters){
	if (cloudFilters[w]) size++;
    }
    if (size==0) return true;
    for (w in cloudFilters){
	if (title.toLowerCase().indexOf(w)==-1 && cloudFilters[w]) return false;
    }
    return true;
}

function checkDomainsFilter(url){
    var domain = extractDomain(url);
    var size = 0;
    for (d in domainFilters){
	if (d==domain && domainFilters[domain]) return true;
	if (domainFilters[d]) size++;
    }
    return size==0;
}

function checkDateFilter(date){
    var size = 0;
    for (d in dateFilters){
	if (d==date && dateFilters[date]) return true;
	if (dateFilters[d]) size++;
    }
    return size==0;
}

function checkDayFilter(day){
    var size = 0;
    for (d in dayFilters){
	if (d==day && dayFilters[day]) return true;
	if (dayFilters[d]) size++;
    }
    return size==0;
}

function checkHourFilter(hour){
    var size = 0;
    for (h in hourFilters){
	if (h==hour && hourFilters[hour]) return true;
	if (hourFilters[h]) size++;
    }
    return size==0;
}

function checkFilters(url){
    return checkPagesFilter(url) && checkDomainsFilter(url);   
}

function buildCharts(){
    var domains = new Array();
    var words = new Array();
    var turls = new Array();
    pageskey = new Array();
    pagesvalue = new Array();
    wordskey = new Array();
    wordsvalue = new Array();
    domainskey = new Array();
    domainsvalue = new Array();
    days = new Array();
    hours = new Array();
    dates = new Array();
    if (countCallsVI > 0 || !haveStarted) {
	setTimeout(buildCharts, 500);
	return;
    } else {
	for (url in urls){
	    var pageExcl = !checkPagesFilter(url);
	    var domainExcl = !checkDomainsFilter(url);
	    // TODO: should be a and...
	    var cloudExcl = !checkCloudFilter(url);
	    var domain = extractDomain(url);
	    var wtitle = titles[url];	    
	    wtitle = wtitle.replace(/\W/g,' ');
	    var tword = wtitle.split(' ');
	    for (visit in urls[url]){
		var date = extractDate(urls[url][visit]);
		var dateExcl = !checkDateFilter(date);
		var day = extractDay(urls[url][visit]);
		var dayExcl = !checkDayFilter(day);
		var hour = extractHour(urls[url][visit]);
		var hourExcl = !checkHourFilter(hour);
		if (!domainExcl && !cloudExcl && !dateExcl &&!dayExcl &&!hourExcl) {
		    if (!turls[url]) turls[url]=1;
		    else turls[url]++; 
		}
		if (!cloudExcl && !dateExcl &&!dayExcl && !hourExcl) {
		    if (!domains[domain])
			domains[domain] = 1;
		    else 
			domains[domain]++;		
		}
		if (!pageExcl && !domainExcl && !cloudExcl &&!dateExcl && !dayExcl && !hourExcl)
		    for (w in tword){
			wo = tword[w].toLowerCase().trim();
			if (!words[wo]) words[wo] =  1;
			else  words[wo]++;
		    }
		if (!pageExcl && !domainExcl && !cloudExcl && !dayExcl && !hourExcl) {
		    if (!dates[date]) dates[date] = 1;
		    else dates[date]++;
		}
		if (!pageExcl && !domainExcl &&!cloudExcl && !dateExcl && !hourExcl) {
		    if (!days[day]) days[day]=1;
		    else days[day]++;
		}
		if (!pageExcl && !domainExcl && !cloudExcl && !dateExcl && !dayExcl) {
		    if (!hours[hour]) hours[hour]=1;
		    else hours[hour]++;
		}
	    }
	}
    }
    for (u in turls){
	insertIntoTables(pageskey, pagesvalue, u, turls[u]);
    }
    for (domain in domains){
	insertIntoTables(domainskey, domainsvalue, domain, domains[domain]);
    }
    for (w in words){
	if (w.length > 3) insertIntoTables(wordskey, wordsvalue, w, words[w]);
    }
    displayCharts();
}

function extractDate(ep){
    d =  new Date(parseInt(ep))
    return d.getDate()+"/"+(d.getMonth()+1);
}

function extractDay(ep){
    d =  new Date(parseInt(ep)).getDay();
    if (d==0) return "Mon";
    else if (d==2) return "Tue";
    else if (d==3) return "Wed";
    else if (d==4) return "Thu";
    else if (d==5) return "Fri";
    else if (d==6) return "Sat";
    return "Sun";
}

function extractHour(ep){
    return new Date(parseInt(ep)).getHours();
}

function extractDomain(url){
    u = url;
    if (u.indexOf("http://") == 0) u = url.substring(7);
    if (u.indexOf("https://") == 0) u = url.substring(8);
    if (u.indexOf("/")!=-1) u = u.substring(0,u.indexOf("/"));
    if (u.indexOf(":")!=-1) u = u.substring(0,u.indexOf(":"));
    if (u.indexOf("#")!=-1) u = u.substring(0,u.indexOf("#"));
    return u;
}

function displayCharts(){
    // TODO link to filters
    // TODO (how many more?)
    displayPages();
    displayDomains();
    displayDates();
    displayDays();
    displayHours();
    displayCloud();
}


$(document).ready (function () 
{
traceINITIAL.on ('trace:updateT',function () {queryHistory();
    setTimeout(buildCharts, 500);})

})
