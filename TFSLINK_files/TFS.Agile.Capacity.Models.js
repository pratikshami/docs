//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
define(["require","exports","Presentation/Scripts/TFS/TFS","Presentation/Scripts/TFS/TFS.Core","Presentation/Scripts/TFS/TFS.Diag","Presentation/Scripts/TFS/TFS.Core.Utils"],function(l,b,e,c,a,k){function j(b,c){a.assertParamIsObject(b,"a");a.assertParamIsDate(b.Start,"a.Start");a.assertParamIsDate(b.End,"a.End");a.assertParamIsObject(c,"b");a.assertParamIsDate(c.Start,"b.Start");a.assertParamIsDate(c.End,"b.End");var d=b.Start,e=c.Start;return d>e?1:d<e?-1:0}b.dateRangeStartDateCompare=j;function f(c){a.assertParamIsArray(c,"dateRangeArray");var b,e,d=[];for(b=0,e=c.length;b<e;b+=1)d.push({Start:c[b].Start,End:c[b].End});return d}var d=function(){function c(b,c){a.assertParamIsObject(b,"teamCapacity");a.assertParamIsObject(c,"rawTeamMemberCapacityData");var d=this;this._teamCapacity=b;this._rawTeamMemberCapacityData=c;b.attachTeamDaysOffChanged(function(){d._currentDateBreakdown=null;d._totalDateBreakdown=null})}c.prototype.getTeamMemberId=function(){return this._rawTeamMemberCapacityData.TeamMemberId};c.prototype.getTeamMemberDisplayName=function(){return this._rawTeamMemberCapacityData.DisplayName};c.prototype.getDailyCapacity=function(){return this._rawTeamMemberCapacityData.Capacity};c.prototype.setDailyCapacity=function(b){a.assertParamIsNumber(b,"value");if(this._rawTeamMemberCapacityData.Capacity!==b){this._rawTeamMemberCapacityData.Capacity=b;this._teamCapacity._raiseTeamMemberCapacityChanged(this,true)}};c.prototype.getDaysOffDates=function(){var a;if(this._rawTeamMemberCapacityData.DaysOffDates)a=$.extend(true,[],this._rawTeamMemberCapacityData.DaysOffDates);else a=[];return a};c.prototype.setDaysOffDates=function(d){a.assertParamIsArray(d,"value",false);var c=f(d);this._currentDateBreakdown=null;this._totalDateBreakdown=null;c.sort(b.dateRangeStartDateCompare);this._rawTeamMemberCapacityData.DaysOffDates=c;this._teamCapacity._raiseTeamMemberCapacityChanged(this,true)};c.prototype.getActivity=function(){return this._rawTeamMemberCapacityData.Activity||""};c.prototype.setActivity=function(a){var b;if(this._rawTeamMemberCapacityData.Activity!==a){b=this.getActivity();this._rawTeamMemberCapacityData.Activity=a;this._teamCapacity._raiseActivityCapacityChanged([b,a])}};c.prototype.getTeam=function(){return this._teamCapacity};c.prototype.getTotalRemainingCapacity=function(){a.assertIsNotNull(this._teamCapacity,"_teamCapacity cannot be null prior to retrieving total remaining capacity");return this._teamCapacity.hasIterationDates()?this.getCurrentDateBreakdown().workingDays*this.getDailyCapacity():0};c.prototype.getTotalDaysOff=function(){return this.getTotalDateBreakdown().totalExcludedDays-this._teamCapacity.getTeamDaysOffTotalDatesBreakdown().totalExcludedDays};c.prototype.getCurrentDateBreakdown=function(){if(!this._currentDateBreakdown)this._currentDateBreakdown=this._getDateBreakdown(this._teamCapacity.getCurrentDateInIteration());return this._currentDateBreakdown};c.prototype.getTotalDateBreakdown=function(){if(!this._totalDateBreakdown)this._totalDateBreakdown=this._getDateBreakdown(this._teamCapacity.getIterationStartDate());return this._totalDateBreakdown};c.prototype._getDateBreakdown=function(b){a.assertParamIsDate(b,"startDate");return this._teamCapacity._getDateBreakdown(b,this._rawTeamMemberCapacityData.DaysOffDates||[],this._teamCapacity._rawCapacityData.TeamCapacity.TeamDaysOffDates||[])};return c}();b.TeamMemberCapacity=d;e.initClassPrototype(d,{_teamCapacity:null,_currentDateBreakdown:null,_totalDateBreakdown:null,_rawTeamMemberCapacityData:null});var i=function(){function e(b){a.assertParamIsObject(b,"payload");this._events=new Sys.EventHandlerList;this._normalizePayload(b);this._rawCapacityData=b;this._originalPayload=$.extend(true,{},b);this._createDataMap();this._activityCapacity={};this._updateActivityCapacity(this.getActivityValues(),true)}e.getTeamCapacity=function(){var a;if(!e._teamCapacity){a=k.parseMSJSON($(".team-capacity-data").html(),false);e._teamCapacity=new e(a)}return e._teamCapacity};e.prototype.flushPayload=function(){this._originalPayload=$.extend(true,{},this._rawCapacityData)};e.prototype.revertToPayload=function(){this.updateTeamCapacity(this._originalPayload)};e.prototype.attachActivityCapacityChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.addHandler(e.EVENT_ACTIVITY_CAPACITY_CHANGED,b)};e.prototype.detachActivityCapacityChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.removeHandler(e.EVENT_ACTIVITY_CAPACITY_CHANGED,b)};e.prototype.attachTeamCapacityChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.addHandler(e.EVENT_TEAM_CAPACITY_CHANGED,b)};e.prototype.attachTeamMemberCapacityChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.addHandler(e.EVENT_TEAM_MEMBER_CAPACITY_CHANGED,b)};e.prototype.attachTeamDaysOffChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.addHandler(e.EVENT_TEAM_DAYS_OFF_CHANGED,b)};e.prototype.detachTeamDaysOffChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.removeHandler(e.EVENT_TEAM_DAYS_OFF_CHANGED,b)};e.prototype.getRawCapacityData=function(){var a,d,b=$.extend(true,{},this._rawCapacityData),c=b.TeamCapacity.TeamMemberCapacityCollection;this._shiftDaysOff(b,false);for(a=0,d=c.length;a<d;a+=1)delete c[a].DisplayName;return b};e.prototype.updateTeamMemberCapacityInfo=function(e,g){a.assertParamIsArray(e,"updatedCapacityInfo");var d,f,b,c;for(d=0,f=e.length;d<f;d++){b=e[d];c=this._teamMemberCapacityMap[b.DisplayName];if(c){c.setActivity(b.Activity);c.setDailyCapacity(b.Capacity);g&&c.setDaysOffDates(b.DaysOffDates)}}};e.prototype.updateTeamCapacity=function(b){a.assertParamIsObject(b,"payload");this.setTeamDaysOffDates(b.TeamCapacity.TeamDaysOffDates);this.updateTeamMemberCapacityInfo(b.TeamCapacity.TeamMemberCapacityCollection,true)};e.prototype.getCurrentDateInIteration=function(){if(!this._currentDate)this._currentDate=this._rawCapacityData.CurrentDate>this.getIterationStartDate()?this._rawCapacityData.CurrentDate:this.getIterationStartDate();return this._currentDate};e.prototype.isCurrentIteration=function(){var a=this._rawCapacityData.CurrentDate;return this.getIterationStartDate()<=a&&a<=this.getIterationEndDate()};e.prototype.getIterationStartDate=function(){var a;if(!this._iterationStartDate)if(this._rawCapacityData.IterationStartDate)this._iterationStartDate=this._rawCapacityData.IterationStartDate;else{a=new Date(0);a.setHours(0,0,0,0);this._iterationStartDate=a}return this._iterationStartDate};e.prototype.getIterationEndDate=function(){var a;if(!this._iterationEndDate)if(this._rawCapacityData.IterationEndDate)this._iterationEndDate=this._rawCapacityData.IterationEndDate;else{a=new Date;a.setHours(0,0,0,0);a.setFullYear(a.getFullYear()+10);this._iterationEndDate=a}return this._iterationEndDate};e.prototype.hasIterationDates=function(){return this._rawCapacityData.IterationStartDate&&this._rawCapacityData.IterationEndDate};e.prototype.getTotalRemainingCapacity=function(){var a,e,d=0,b=0,c=this.getTeamMemberCapacityCollection();for(a=0,e=c.length;a<e;a+=1){b=c[a].getTotalRemainingCapacity();d+=b>0?b:0}return d};e.prototype.getTeamDaysOffDates=function(){var a;if(this._rawCapacityData.TeamCapacity.TeamDaysOffDates)a=$.extend(true,[],this._rawCapacityData.TeamCapacity.TeamDaysOffDates);else a=[];return a};e.prototype.setTeamDaysOffDates=function(d){a.assertParamIsArray(d,"value",false);var c=f(d);this._teamDaysOffCurrentDatesBreakdown=null;this._teamDaysOffTotalDatesBreakdown=null;c.sort(b.dateRangeStartDateCompare);this._rawCapacityData.TeamCapacity.TeamDaysOffDates=c;this._raiseTeamDaysOffChanged();this._raiseTeamCapacityChanged(true)};e.prototype.getWeekends=function(){return this._rawCapacityData.Weekends||[]};e.prototype.getTeamDaysOffCurrentDatesBreakdown=function(){if(!this._teamDaysOffCurrentDatesBreakdown)this._teamDaysOffCurrentDatesBreakdown=this._getDateBreakdown(this.getCurrentDateInIteration(),this._rawCapacityData.TeamCapacity.TeamDaysOffDates||[],[]);return this._teamDaysOffCurrentDatesBreakdown};e.prototype.getTeamDaysOffTotalDatesBreakdown=function(){if(!this._teamDaysOffTotalDatesBreakdown)this._teamDaysOffTotalDatesBreakdown=this._getDateBreakdown(this.getIterationStartDate(),this._rawCapacityData.TeamCapacity.TeamDaysOffDates||[],[]);return this._teamDaysOffTotalDatesBreakdown};e.prototype.getTeamMemberCapacityCollection=function(){var a,g,e=[],b,f;b=this._rawCapacityData.TeamCapacity.TeamMemberCapacityCollection;for(a=0,g=this._rawCapacityData.TeamCapacity.TeamMemberCapacityCollection.length;a<g;a+=1)e[a]=new d(this,b[a]);f=e.sort(function(e,d){var b=e.getTeamMemberDisplayName(),a=d.getTeamMemberDisplayName();return c.StringUtils.localeIgnoreCaseComparer(b,a)});return f};e.prototype.getTeamMemberCapacity=function(b){a.assertParamIsString(b,"displayName");return this._teamMemberCapacityMap[b]};e.prototype.isTeamMember=function(b){a.assertParamIsString(b,"displayName");return this._teamMemberCapacityMap.hasOwnProperty(b)};e.prototype.getActivityCapacity=function(a){return this._activityCapacity[this._convertActivity(a)]};e.prototype.getActivityValues=function(){return this._rawCapacityData.ActivityValues||[]};e.prototype.isActivityEnabled=function(){return Boolean(this._rawCapacityData.ActivityValues&&this._rawCapacityData.ActivityValues.length!==0)};e.prototype._normalizePayload=function(b){a.assertParamIsObject(b,"payload");if(b.IterationStartDate)b.IterationStartDate=c.DateUtils.shiftToUTC(b.IterationStartDate);if(b.IterationEndDate)b.IterationEndDate=c.DateUtils.shiftToUTC(b.IterationEndDate);b.CurrentDate=c.DateUtils.shiftToUTC(b.CurrentDate);this._shiftDaysOff(b,true)};e.prototype._shiftDaysOff=function(e,j){a.assertParamIsObject(e,"payload");var b,h,g=j?c.DateUtils.shiftToUTC:c.DateUtils.shiftToLocal,f=e.TeamCapacity.TeamMemberCapacityCollection,i=e.TeamCapacity.TeamDaysOffDates,d;for(b=0,h=f.length;b<h;b+=1){d=f[b].DaysOffDates;d&&this._shiftDateRanges(d,g)}this._shiftDateRanges(i,g)};e.prototype._shiftDateRanges=function(d,c){var b,e,a;for(b=0,e=d.length;b<e;b+=1){a=d[b];a.Start=c(a.Start);a.End=c(a.End)}};e.prototype._raiseTeamCapacityChanged=function(d){a.logTracePoint("TeamCapacity._raiseTeamCapacityChanged.start");a.assertParamIsBool(d,"triggerCascadingEvents");var b,g,f=this._events.getHandler(e.EVENT_TEAM_CAPACITY_CHANGED),c;f&&f(this);if(d){c=this.getTeamMemberCapacityCollection();for(b=0,g=c.length;b<g;b+=1)this._raiseTeamMemberCapacityChanged(c[b],false);this._raiseActivityCapacityChanged(this.getActivityValues(),true)}a.logTracePoint("TeamCapacity._raiseTeamCapacityChanged.complete")};e.prototype._raiseActivityCapacityChanged=function(b,g){a.assertParamIsArray(b,"activities");var d,h,c,f;this._updateActivityCapacity(b,g);c=this._events.getHandler(e.EVENT_ACTIVITY_CAPACITY_CHANGED);if(c){g&&c({activity:"",capacity:this.getActivityCapacity("")});for(d=0,h=b.length;d<h;d+=1){f=b[d];c({activity:f,capacity:this.getActivityCapacity(f)})}}};e.prototype._raiseTeamMemberCapacityChanged=function(b,c){a.assertParamIsNotNull(b,"teamMemberCapacity");a.assertParamIsBool(c,"triggerCascadingEvents");var d=this._events.getHandler(e.EVENT_TEAM_MEMBER_CAPACITY_CHANGED);d&&d(b);if(c){this._raiseTeamCapacityChanged(false);this._raiseActivityCapacityChanged([b.getActivity()])}};e.prototype._raiseTeamDaysOffChanged=function(){var a;a=this._events.getHandler(e.EVENT_TEAM_DAYS_OFF_CHANGED);a&&a(this)};e.prototype._getDateBreakdown=function(b,d,e){a.assertParamIsDate(b,"startDate");a.assertParamIsArray(d,"daysOffDateRanges1",false);a.assertParamIsArray(e,"daysOffDateRanges2",false);var c,f=this.getIterationEndDate(),g;c=h.getMergedDateRangeList(d,e,b,f);g=h.getDateBreakdown(b,f,c,this.getWeekends());return g};e.prototype._createDataMap=function(){var a,c,b=this._rawCapacityData.TeamCapacity.TeamMemberCapacityCollection;this._teamMemberCapacityMap=[];for(a=0,c=b.length;a<c;a+=1)this._teamMemberCapacityMap[b[a].DisplayName]=new d(this,b[a])};e.prototype._updateActivityCapacity=function(g,i){a.assertParamIsArray(g,"activities");var c,d,h=this.getTeamMemberCapacityCollection(),e,b,f={};if(i){b=this._convertActivity("");this._activityCapacity[b]=0;f[b]=true}for(c=0,d=g.length;c<d;c+=1){b=this._convertActivity(g[c]);this._activityCapacity[b]=0;f[b]=true}for(c=0,d=h.length;c<d;c+=1){e=h[c];b=this._convertActivity(e.getActivity());if(b in f)this._activityCapacity[b]+=e.getTotalRemainingCapacity()}};e.prototype._convertActivity=function(a){return!a?e.EMPTY_ACTIVITY:a};e._teamCapacity=null;e.EMPTY_ACTIVITY="_EMPTY";e.EVENT_TEAM_CAPACITY_CHANGED="event-team-capacity-changed";e.EVENT_TEAM_MEMBER_CAPACITY_CHANGED="event-team-member-capacity-changed";e.EVENT_ACTIVITY_CAPACITY_CHANGED="event-activity-capacity-changed";e.EVENT_TEAM_DAYS_OFF_CHANGED="event-team-days-off-changed";return e}();b.TeamCapacity=i;e.initClassPrototype(i,{_rawCapacityData:null,_originalPayload:null,_teamMemberCapacityMap:null,_activityCapacity:null,_teamDaysOffCurrentDatesBreakdown:null,_teamDaysOffTotalDatesBreakdown:null,_iterationStartDate:null,_iterationEndDate:null,_currentDate:null,_events:null});var g=function(){function b(a){this._rawAggregatedCapacity=a}b.prototype.getRawCapacity=function(){return this._rawAggregatedCapacity};b.prototype.getAggregatedValue=function(f,c){a.assertParamIsString(f,"fieldName");var b=this._rawAggregatedCapacity[f],d,e;if(b){c=this._convertFieldValue(c);if(c)d=b[c];else{d=0;for(e in b)if(b.hasOwnProperty(e))d+=b[e]}}return d||0};b.prototype.getAggregatedValues=function(b){a.assertParamIsString(b,"fieldName");var c=this._rawAggregatedCapacity[b];return $.extend({},c)};b.prototype.setAggregatedValue=function(c,e,d){a.assertParamIsString(c,"fieldName");a.assertParamIsNotUndefined(e,"fieldValue");a.assertParamIsNumber(d,"aggregatedValue");var b=this._rawAggregatedCapacity[c];if(!b){b={};this._rawAggregatedCapacity[c]=b}b[this._convertFieldValue(e)]=d};b.prototype._convertFieldValue=function(a){return a!==""&&a!==null?a:b.EMPTY_VALUE};b.EMPTY_VALUE="__empty";return b}();b.AggregatedCapacity=g;e.initClassPrototype(g,{_rawAggregatedCapacity:null});(function(b){function d(f,g,d){a.assertParamIsDate(f,"startDate");a.assertParamIsDate(g,"endDate");a.assertParamIsArray(d,"weekends",false);var b,h,c,e=0,i=f.getDay(),j=g.getDay();for(b=0,h=d.length;b<h;b+=1){c=d[b];if(i<=c&&j>=c)e+=1}return e}b._getWeekendsBetweenDaysOfWeek=d;function j(i,j,f,h){a.assertParamIsDate(i,"startDate");a.assertParamIsDate(j,"endDate");a.assertParamIsArray(f,"excludedRanges",false);a.assertParamIsArray(h,"weekends",false);var d,k,c=b.getWorkingDaysInfo(i,j,h),g,e=0;for(d=0,k=f.length;d<k;d+=1){g=f[d];e+=b.getWorkingDaysInfo(g.Start,g.End,h).totalWorkingDays}c.totalExcludedDays=e;c.workingDays=c.totalWorkingDays-e;return c}b.getDateBreakdown=j;function f(){return{totalDays:0,weekendDays:0,totalWorkingDays:0,totalExcludedDays:0,workingDays:0}}b.getEmptyDateBreakdown=f;function e(l,k,j,i){a.assertParamIsArray(l,"firstArray",false);a.assertParamIsArray(k,"secondArray",false);a.assertParamIsDate(j,"minimumDate");a.assertParamIsDate(i,"maximumDate");var h=0,n=l.length,g=0,m=k.length,b,c,e,d,f=[];e=l[h];d=k[g];while(h<n||g<m){if(e&&d&&e.Start<=d.Start||!d){b=e;h+=1;e=l[h]}else{b=d;g+=1;d=k[g]}b=this.normalizeForDateRange(b,j,i);if(b.Start>=j&&b.Start<=i&&b.End>=j&&b.End<=i){if(c&&(c.Start<=b.Start&&c.End>=b.Start||c.Start<=b.End&&c.End>=b.End)){b={Start:c.Start<b.Start?c.Start:b.Start,End:c.End>b.End?c.End:b.End};f[f.length-1]=b}else f[f.length]=b;c=b}}return f}b.getMergedDateRangeList=e;function g(b,d,c){a.assertParamIsObject(b,"dateRange");a.assertParamIsDate(d,"minimumDate");a.assertParamIsDate(c,"maximumDate");return b.Start<d&&b.End>c?{Start:d,End:c}:b.Start<d&&b.End>=d&&b.End<=c?{Start:d,End:b.End}:b.End>c&&b.Start>=d&&b.Start<=c?{Start:b.Start,End:c}:b}b.normalizeForDateRange=g;function i(b,d,g){a.assertParamIsDate(b,"startDate");a.assertParamIsDate(d,"endDate");a.assertParamIsArray(g,"weekends",false);var e=c.DateUtils.MILLISECONDS_IN_DAY,s=c.DateUtils.MILLISECONDS_IN_WEEK,f,k,l,i,o,r=0,q,p,j,m,n,h;if(b>d)return{totalDays:0,totalWorkingDays:0,weekendDays:0};f=Math.round((d.getTime()-b.getTime())/e)+1;k=b.getDay();l=d.getDay();if(f<=7&&k<=l)h=f-this._getWeekendsBetweenDaysOfWeek(b,d,g);else{i=7-k;q=this.getDSTAgnosticDate(b.getTime()+e*(i-1));i-=this._getWeekendsBetweenDaysOfWeek(b,q,g);m=this.getDSTAgnosticDate(b.getTime()+e*(7-k));j=l+1;p=this.getDSTAgnosticDate(d.getTime()-e*(j-1));j-=this._getWeekendsBetweenDaysOfWeek(p,d,g);n=this.getDSTAgnosticDate(d.getTime()-e*(l+1));if(m<n){o=Math.round((n.getTime()-m.getTime()+e)/s);r=o*7-o*g.length}h=i+r+j}return{totalDays:f,totalWorkingDays:h,weekendDays:f-h}}b.getWorkingDaysInfo=i;function h(c){a.assertParamIsNumber(c,"milliseconds");var b=new Date(c),d=b.getHours();if(d>=12)b.setHours(24,0,0,0);else d<12&&b.setHours(0,0,0,0);return b}b.getDSTAgnosticDate=h})(b.CapacityDateUtils||(b.CapacityDateUtils={}));var h=b.CapacityDateUtils;e.tfsModuleLoaded("TFS.Agile.Capacity.Models",b)});
// SIG // Begin signature block
// SIG // MIIaxQYJKoZIhvcNAQcCoIIatjCCGrICAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFG5ltFXx9lo4
// SIG // SfuWlXqDn8pMc1pkoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AABMoehNzLR0ezsAAAAAAEwwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMTExMTIy
// SIG // MTEzMVoXDTE1MDIxMTIyMTEzMVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpDMEY0LTMwODYtREVGODEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBALHY+hsGK3eo5JRdfA/meqaS7opUHaT5hHWFl8zL
// SIG // XJbQ13Ut2Qj7W9LuLSXGNz71q34aU+VXvmvov8qWCtxG
// SIG // 8VoePgLSsuAmjgBke748k/hYMnmH0hpdI7ycUcQPEPoE
// SIG // WLUWdm7svMblvvytrMFB26rOefUcsplBp3olK/+reA1Y
// SIG // OrFeUN5kTODKFSrfpun+pGYvWxAJCSYh1D8NL23S+HeQ
// SIG // A2zeFBKljOc2H/SHpbBBF2/jTXRmwv2icUY1UcxrF1Fj
// SIG // +hWUkppfSyi65hZFSekstf6Lh6/8pW1D3KYw+iko75sN
// SIG // LFyD3hKNarTbce9cFFoqIyj/gXBX8YwHmhPYKlMCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBS5Da2zTfTanxqyJyZV
// SIG // DSBE2Jji9DAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAJik4Gr+jt
// SIG // gs8dB37XKqckCy2vmlskf5RxDFWIJBpSFWPikE0FSphK
// SIG // nPvhp21oVYK5KeppqbLV4wza0dZ6JTd4ZxwM+9spWhqX
// SIG // OCo5Vkb7NYG55D1GWo7k/HU3WFlJi07bPBWdc1JL63sM
// SIG // OsItwbObUi3gNcW5wVez6D2hPETyIxYeCqpZNyfQlVJe
// SIG // qH8/VPCB4dyavWXVePb3TDm73eDWNw6RmoeMc+dxZFL3
// SIG // PgPYxs1yuDQ0mFuM0/UIput4xlGgDQ5v9Gs8QBpgFiyp
// SIG // BlKdHBOQzm8CHup7nLP2+Jdg8mXR0R+HOsF18EKNeu2M
// SIG // crJ7+yyKtJFHVOIuacwWVBpZMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAAMps1TISNcThVQABAAAAyjANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xNDA0
// SIG // MjIxNzM5MDBaFw0xNTA3MjIxNzM5MDBaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCWcV3tBkb6
// SIG // hMudW7dGx7DhtBE5A62xFXNgnOuntm4aPD//ZeM08aal
// SIG // IV5WmWxY5JKhClzC09xSLwxlmiBhQFMxnGyPIX26+f4T
// SIG // UFJglTpbuVildGFBqZTgrSZOTKGXcEknXnxnyk8ecYRG
// SIG // vB1LtuIPxcYnyQfmegqlFwAZTHBFOC2BtFCqxWfR+nm8
// SIG // xcyhcpv0JTSY+FTfEjk4Ei+ka6Wafsdi0dzP7T00+Lnf
// SIG // NTC67HkyqeGprFVNTH9MVsMTC3bxB/nMR6z7iNVSpR4o
// SIG // +j0tz8+EmIZxZRHPhckJRIbhb+ex/KxARKWpiyM/gkmd
// SIG // 1ZZZUBNZGHP/QwytK9R/MEBnAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUH17i
// SIG // XVCNVoa+SjzPBOinh7XLv4MwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1K2I0
// SIG // MjE4ZjEzLTZmY2EtNDkwZi05YzQ3LTNmYzU1N2RmYzQ0
// SIG // MDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAd1zr15E9zb17g9mFqbBDnXN8F8kP7Tbbx7UsG177
// SIG // VAU6g3FAgQmit3EmXtZ9tmw7yapfXQMYKh0nfgfpxWUf
// SIG // tc8Nt1THKDhaiOd7wRm2VjK64szLk9uvbg9dRPXUsO8b
// SIG // 1U7Brw7vIJvy4f4nXejF/2H2GdIoCiKd381wgp4Yctgj
// SIG // zHosQ+7/6sDg5h2qnpczAFJvB7jTiGzepAY1p8JThmUR
// SIG // dwmPNVm52IaoAP74MX0s9IwFncDB1XdybOlNWSaD8cKy
// SIG // iFeTNQB8UCu8Wfz+HCk4gtPeUpdFKRhOlludul8bo/En
// SIG // UOoHlehtNA04V9w3KDWVOjic1O1qhV0OIhFeezCCBbww
// SIG // ggOkoAMCAQICCmEzJhoAAAAAADEwDQYJKoZIhvcNAQEF
// SIG // BQAwXzETMBEGCgmSJomT8ixkARkWA2NvbTEZMBcGCgmS
// SIG // JomT8ixkARkWCW1pY3Jvc29mdDEtMCsGA1UEAxMkTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // MB4XDTEwMDgzMTIyMTkzMloXDTIwMDgzMTIyMjkzMlow
// SIG // eTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWlj
// SIG // cm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EwggEiMA0GCSqG
// SIG // SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCycllcGTBkvx2a
// SIG // YCAgQpl2U2w+G9ZvzMvx6mv+lxYQ4N86dIMaty+gMuz/
// SIG // 3sJCTiPVcgDbNVcKicquIEn08GisTUuNpb15S3GbRwfa
// SIG // /SXfnXWIz6pzRH/XgdvzvfI2pMlcRdyvrT3gKGiXGqel
// SIG // cnNW8ReU5P01lHKg1nZfHndFg4U4FtBzWwW6Z1KNpbJp
// SIG // L9oZC/6SdCnidi9U3RQwWfjSjWL9y8lfRjFQuScT5EAw
// SIG // z3IpECgixzdOPaAyPZDNoTgGhVxOVoIoKgUyt0vXT2Pn
// SIG // 0i1i8UU956wIAPZGoZ7RW4wmU+h6qkryRs83PDietHdc
// SIG // pReejcsRj1Y8wawJXwPTAgMBAAGjggFeMIIBWjAPBgNV
// SIG // HRMBAf8EBTADAQH/MB0GA1UdDgQWBBTLEejK0rQWWAHJ
// SIG // Ny4zFha5TJoKHzALBgNVHQ8EBAMCAYYwEgYJKwYBBAGC
// SIG // NxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQU/dExTtMm
// SIG // ipXhmGA7qDFvpjy82C0wGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwHwYDVR0jBBgwFoAUDqyCYEBWJ5flJRP8
// SIG // KuEKU5VZ5KQwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwDQYJKoZIhvcNAQEFBQADggIBAFk5
// SIG // Pn8mRq/rb0CxMrVq6w4vbqhJ9+tfde1MOy3XQ60L/svp
// SIG // LTGjI8x8UJiAIV2sPS9MuqKoVpzjcLu4tPh5tUly9z7q
// SIG // QX/K4QwXaculnCAt+gtQxFbNLeNK0rxw56gNogOlVuC4
// SIG // iktX8pVCnPHz7+7jhh80PLhWmvBTI4UqpIIck+KUBx3y
// SIG // 4k74jKHK6BOlkU7IG9KPcpUqcW2bGvgc8FPWZ8wi/1wd
// SIG // zaKMvSeyeWNWRKJRzfnpo1hW3ZsCRUQvX/TartSCMm78
// SIG // pJUT5Otp56miLL7IKxAOZY6Z2/Wi+hImCWU4lPF6H0q7
// SIG // 0eFW6NB4lhhcyTUWX92THUmOLb6tNEQc7hAVGgBd3TVb
// SIG // Ic6YxwnuhQ6MT20OE049fClInHLR82zKwexwo1eSV32U
// SIG // jaAbSANa98+jZwp0pTbtLS8XyOZyNxL0b7E8Z4L5UrKN
// SIG // MxZlHg6K3RDeZPRvzkbU0xfpecQEtNP7LN8fip6sCvsT
// SIG // J0Ct5PnhqX9GuwdgR2VgQE6wQuxO7bN2edgKNAltHIAx
// SIG // H+IOVN3lofvlRxCtZJj/UBYufL8FIXrilUEnacOTj5XJ
// SIG // jdibIa4NXJzwoq6GaIMMai27dmsAHZat8hZ79haDJLmI
// SIG // z2qoRzEvmtzjcT3XAH5iR9HOiMm4GPoOco3Boz2vAkBq
// SIG // /2mbluIQqBC0N1AI1sM9MIIGBzCCA++gAwIBAgIKYRZo
// SIG // NAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJbWlj
// SIG // cm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1
// SIG // MzA5WhcNMjEwNDAzMTMwMzA5WjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7d
// SIG // GE4kD+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr
// SIG // 6Hu97IkHD/cOBJjwicwfyzMkh53y9GccLPx754gd6udO
// SIG // o6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
// SIG // KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd+
// SIG // +NIT8wi3U21StEWQn0gASkdmEScpZqiX5NMGgUqi+YSn
// SIG // EUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68e
// SIG // eEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiAL
// SIG // AgMBAAGjggGrMIIBpzAPBgNVHRMBAf8EBTADAQH/MB0G
// SIG // A1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWzDzALBgNV
// SIG // HQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1Ud
// SIG // IwSBkDCBjYAUDqyCYEBWJ5flJRP8KuEKU5VZ5KShY6Rh
// SIG // MF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJ
// SIG // k/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQ
// SIG // ea0WoUqgpa1Mc1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BB
// SIG // hj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmww
// SIG // VAYIKwYBBQUHAQEESDBGMEQGCCsGAQUFBzAChjhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDANBgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wD
// SIG // RDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQSooxt
// SIG // YrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB
// SIG // 7uK+jwoFyI1I4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mR
// SIG // KiQicPv2/OR4mS4N9wficLwYTp2OawpylbihOZxnLcVR
// SIG // DupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPf
// SIG // wgphjvDXuBfrTot/xTUrXqO/67x9C0J71FNyIe4wyrt4
// SIG // ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGys
// SIG // OUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89D
// SIG // s+X57H2146SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BN
// SIG // Z8ifQv+AeSGAnhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU
// SIG // 2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LB
// SIG // J1S2sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJ
// SIG // Zr2dHYcSZAI9La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCl
// SIG // eKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
// SIG // mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6
// SIG // L54/LlUWa8kTo/0xggSvMIIEqwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIHIMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSxZKBYVdal
// SIG // QH7p59KkdWQCqrs1VTBoBgorBgEEAYI3AgEMMVowWKA+
// SIG // gDwAVABGAFMALgBBAGcAaQBsAGUALgBDAGEAcABhAGMA
// SIG // aQB0AHkALgBNAG8AZABlAGwAcwBfADIALgBqAHOhFoAU
// SIG // aHR0cDovL21pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEB
// SIG // BQAEggEAI7PF+MAbNy7e6rIuVTsgkgxGizPAmsPGVoiI
// SIG // QvxojAtFhas6smFpARsLsG+4C0WQ+2z0+ovv3gUCdZAi
// SIG // /xZ7ZcstmOLeO/Lyv5pFBe3CUFg0+etbgOaD8KVK9SPT
// SIG // Xg21GT5StCHq8w/CHwPWnM7YbCU6uo4AGf/ROKJHhlFT
// SIG // QvHalpm3qJkMLKthHM1Aphp8NGzmbM/HY+4YZg444ORb
// SIG // mmcCO0tMx2wF1VSsDOMUpPt57FsvEkVXU+bH+xZ4ScbO
// SIG // ileXEgQRo7pOYz8iy+UhNBsaCwZKt9HV/OLgklXpdjpu
// SIG // MmLJ8DSRXZ2pbGhB8336ZYvNoCK/piNxVkaiDtf7tKGC
// SIG // AigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCBjjB3
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhNaWNy
// SIG // b3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABMoehNzLR0
// SIG // ezsAAAAAAEwwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJ
// SIG // AzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0
// SIG // MDcyMzA5MDgwOFowIwYJKoZIhvcNAQkEMRYEFBGV2vB7
// SIG // GdIqtGGE9tZ5mHP0DOB7MA0GCSqGSIb3DQEBBQUABIIB
// SIG // ADYqqAaUHkB4m1ozsddl3TeZWfrfEgfv32LT3daDPWo1
// SIG // KHzJssZomum+xcNucUIICSF/VIou7cAjr1rtG+ZN9i3J
// SIG // XkYFojhqh9XMmOyzjxetJ+j/94u4g6Evj/GhMSEpumkm
// SIG // iP1PoU3qwCxmilcvj2mxaNTjidd5m2DRotZRx+2zFE4d
// SIG // ii8UHYjfFwOsx+O/2hvzAJjib3VRsXsXiFO1LcQuqSrl
// SIG // rBNXgGjf4dREY9aaEM1GPtpbbA1N7CSSgkrQNkRTKiSv
// SIG // 9JfWQfgJZbBa3cakD4+yK2jBPI/AWqnxOQY7I4mdPviF
// SIG // VX0W+rFwS/RyOEGGTs0ASd5lm0y/6ip1mWA=
// SIG // End signature block