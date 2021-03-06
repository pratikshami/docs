//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
var __extends=this.__extends||function(b,a){for(var c in a)if(a.hasOwnProperty(c))b[c]=a[c];function d(){this.constructor=b}d.prototype=a.prototype;b.prototype=new d};define(["require","exports","Presentation/Scripts/TFS/TFS","Presentation/Scripts/TFS/TFS.Core","Presentation/Scripts/TFS/TFS.Core.Ajax","Presentation/Scripts/TFS/TFS.Diag","Presentation/Scripts/TFS/TFS.OM","Presentation/Scripts/TFS/TFS.Core.Utils","Presentation/Scripts/TFS/TFS.Host","WorkItemTracking/Scripts/TFS.WorkItemTracking","WorkItemTracking/Scripts/TFS.WorkItemTracking.Controls","Presentation/Scripts/TFS/Generated/TFS.Server.WebAccess.Constants"],function(E,b,q,c,k,a,d,p,f,l,y,v){var t=d.TeamAwarenessService,e=f.TfsContext.getDefault(),n=false,i=f.ActionManager;function r(){var b=e.navigation,c=b.currentController,a=b.currentAction;return d.FeatureAvailabilityService.isFeatureEnabled(v.FeatureAvailabilityFlags.WebAccessAsync)&&c.toLowerCase()==="backlogs"&&(a.toLowerCase()==="backlog"||a.toLowerCase()==="index"||a.toLowerCase()==="iteration")}b.IsWebAccessAsyncEnabled=r;var h=function(){function a(){}a.EVALUATE_MEMBERSHIP="TFS.Agile.Backlogs.EvaluateMembership";a.ACTION_ITEM_OPEN="item-open";a.CHANGE_TEAM_WORK_IN_PROGRESS_LIMIT="TFS.Agile.Boards.ChangeWipLimit";return a}();b.Actions=h;var o=function(){function a(){}a.MEMBERSHIP_EVALUATED="TFS.Agile.Backlog.MembershipEvaluated";a.BACKLOG_QUERY_SAVE_COMPLETED="TFS.Agile.Backlog.BacklogQuerySaveCompleted";return a}();b.Notifications=o;i.registerActionWorker(h.ACTION_ITEM_OPEN,function(b){a.assertParamIsObject(b,"actionArgs");a.assertParamIsNotNull(b.id,"actionArgs.id");i.performAction(y.WorkItemActions.ACTION_WORKITEM_OPEN,{id:b.id,options:b.options})},i.MaxOrder);function w(b){a.assertParamIsObject(b.workItem,"actionArgs.workItem");a.assertParamIsFunction(b.sendResult,"actionArgs.sendResult");b.sendResult(true)}function u(g,b){a.assertParamIsObject(b,"args");var e=b.change,c,d;if(e===l.WorkItemChangeType.SaveCompleted){a.assertParamIsObject(b.workItem,"args.workItem");c=b.workItem;d={workItem:c,sendResult:function(b){a.assertParamIsBool(b,"isMember");f.notificationService.fire(o.MEMBERSHIP_EVALUATED,g,{workItem:c,isMember:b})}};f.ActionManager.performAction(h.EVALUATE_MEMBERSHIP,d)}}function s(){f.ActionManager.registerActionWorker(h.EVALUATE_MEMBERSHIP,w,f.ActionManager.MaxOrder);d.TfsTeamProjectCollection.getDefaultConnection().getService(l.WorkItemStore).workItemManager.attachWorkItemChanged(u)}var j,x=function(b){__extends(a,b);function a(){b.call(this)}a.prototype.getContext=function(){if(!j)j=p.parseJsonIsland($(document),".agile-context");return j};a.prototype.enableMembershipTracking=function(){if(n)return;s();n=true};return a}(d.CollectionLevelTfsService);b.AgileContext=x;var g=function(){function a(){this._setupConfigurationData()}a.getInstance=function(){if(!a._backlogContext)a._backlogContext=new a;return a._backlogContext};a.prototype._setupConfigurationData=function(a){this._filterState=undefined;if(!a){var b=$(".backlog-context");if(b.length>0){a=p.parseMSJSON(b.html(),false).backlogContext;b.empty()}}if(a){var f=d.TfsTeamProjectCollection.getConnection(e).getService(d.ProjectProcessConfigurationService),c=f.getProcessSettings();this.hub=a.hubCategoryRefName?c.getCategoryForCategoryRefName(a.hubCategoryRefName):null;this.filter=a.filterCategoryRefName?c.getCategoryForCategoryRefName(a.filterCategoryRefName):null;this.requirementCategory=a.requirementCategory;this.portfolios=a.portfolios;this.isBacklog=a.isBacklog}};a.prototype.setBacklogContextData=function(a){this._setupConfigurationData(a)};a.prototype.getBacklogFilterState=function(){if(this._filterState!==undefined)return this._filterState;if(!this.filter){this._filterState=0;return this._filterState}var a=this.hub.compare(this.filter);if(a===0)this._filterState=0;else if(a===1)this._filterState=1;else this._filterState=2;return this._filterState};a.prototype.isHubContext=function(a){return c.StringUtils.ignoreCaseComparer(this.hub.category,a.category)===0};a.prototype.isFilterContext=function(a){return this.filter?c.StringUtils.ignoreCaseComparer(this.filter.category,a.category)===0:false};a.prototype.isInFilteredView=function(b){var f=this.hub,e=this.filter,d=this.getBacklogFilterState();if(this.isHubContext(b)||this.isFilterContext(b))return true;if(d===1){var a=this.hub;while(a){if(c.StringUtils.ignoreCaseComparer(a.category,b.category)===0)return true;if(this.isFilterContext(a))return false;a=a.child}}else if(d===2){var a=this.hub;while(a){if(c.StringUtils.ignoreCaseComparer(a.category,b.category)===0)return true;if(this.isFilterContext(a))return false;a=a.parent}}return false};a.prototype.getNumberOfBacklogLevels=function(){if(!this.filter)return 1;var d=this.hub.compare(this.filter),a=d===1?this.hub:this.filter,e=d===1?this.filter:this.hub,b=1;while(a&&c.StringUtils.ignoreCaseComparer(a.category,e.category)!==0){b++;a=a.child}return b};a.prototype.isInPortfolios=function(a){return $.inArray(a,this.portfolios)===-1?false:true};a.prototype.isPortfolioInContext=function(){var f=d.TfsTeamProjectCollection.getConnection(e).getService(d.ProjectProcessConfigurationService),b=f.getProcessSettings();if(!this.filter)return $.inArray(this.hub,b.portfolioBacklogs)===-1?false:true;var c=this.hub.compare(this.filter),a=c===1?this.hub:this.filter,g=c===1?this.filter:this.hub;while(a&&a!==g){if($.inArray(a,b.portfolioBacklogs)!==-1)return true;a=a.child}return false};a.prototype.isFiltered=function(){return this.filter};return a}();b.BacklogContext=g;var m=function(){function b(){}b.prototype._getStateNameTypeMap=function(d){a.assertIsObject(this._processSettings,"Ensure that _beginGetSettings has been called before this function");var b={};this._processSettings.allBacklogs&&$.each(this._processSettings.allBacklogs,function(){c.StringUtils.ignoreCaseComparer(d,this.category)===0&&$.each(this.states,function(){b[this.value]=this.type})});return b};b.prototype._beginGetSettings=function(f){var b=this;a.assertParamIsFunction(f,"callback");var c,h,i,j=function(){b._processSettings&&g.getInstance()&&b._teamSettings&&f()};if(this._processSettings&&this._teamSettings)f();else{c=d.TfsTeamProjectCollection.getConnection(e);h=c.getService(d.ProjectProcessConfigurationService);i=c.getService(t);i.beginGetTeamSettings(function(a){b._teamSettings=a;j()});h.beginGetProcessSettings(function(a){b._processSettings=a;j()})}};b.prototype.evaluate=function(c,b){var d=this;a.assertParamIsObject(c,"workItem");a.assertParamIsFunction(b,"callback");this._beginGetSettings(function(){if(d._isValid(c))b(true);else b(false)})};b.prototype._isValid=function(){a.fail("_isValid should be overriden by derived classes")};b.prototype._isTeamFieldValid=function(d){a.assertParamIsString(d,"fieldValue");a.assertIsObject(this._teamSettings,"Ensure that _beginGetSettings has been called before this function");var e=this._teamSettings.teamFieldValues,b=false;$.each(e,function(g,a){var e=a.value,f=e+"\\";b=l.Field.compareValues(d,e,true);if(!b&&a.includeChildren)b=c.StringUtils.startsWith(d,f,c.StringUtils.ignoreCaseComparer);if(b)return false});return b};return b}();b.BaseBacklogMembershipEvaluator=m;q.initClassPrototype(m,{_processSettings:null,_backlogContext:null,_teamSettings:null});(function(b){function f(c){a.assertParamIsString(c,"actionName");return e.getActionUrl(c,b.CONTROLLER_NAME,{area:"api"})}b._getActionUrl=f;b.CONTROLLER_NAME="Backlog";function d(f,d,e){a.assertParamIsArray(f,"fields");a.assertParamIsFunction(d,"successCallback");a.assertParamIsFunction(e,"errorCallback");var h=b._getActionUrl("ProductBacklogQuery"),c=g.getInstance();k.getMSJSON(h,{fields:f,hubCategoryRefName:c&&c.hub?c.hub.category:null,filterCategoryRefName:c&&c.filter?c.filter.category:null},function(a){d(a.wiql)},e)}b.beginGetProductBacklogQuery=d;function c(f,e,c,d){a.assertParamIsArray(f,"fields");a.assertParamIsString(e,"iterationId");a.assertParamIsFunction(c,"successCallback");a.assertParamIsFunction(d,"errorCallback");var g=b._getActionUrl("IterationBacklogQuery");k.getMSJSON(g,{fields:f,iterationId:e},function(a){c(a.wiql)},d)}b.beginGetIterationBacklogQuery=c})(b.BacklogQueryManager||(b.BacklogQueryManager={}));var A=b.BacklogQueryManager;(function(c){function b(g,c,d,f){a.assertParamIsFunction(d,"successCallback");a.assertParamIsFunction(f,"errorCallback");var b={};if(g)b.hubPluralName=g;if(c)b.filterPluralName=c;k.getMSJSON(e.getActionUrl("backlogPayload","backlog",{area:"api"}),b,d,f)}c.beginGetBacklogPayload=b})(b.BacklogHelpers||(b.BacklogHelpers={}));var C=b.BacklogHelpers;(function(d){function i(e,d,g){a.assertParamIsString(e,"actionName");a.assertParamIsString(d,"iterationPath");a.assertParamIsString(g,"backlogIteration");var i=f.TfsContext.getDefault();d=d.replace(g,"");d=d.replace(/^\\/,"");return!d?c.StringUtils.ignoreCaseComparer(e,"board")===0||c.StringUtils.ignoreCaseComparer(e,"taskboard")===0?b("board"):b("backlog"):h(e,d.split("\\"))}d.generateIterationLink=i;function j(f,b){a.assertParamIsString(f,"action");a.assertParamIsObject(b,"context");var d=e.getActionUrl(null,"backlogs");a.assertIsString(b.hub,"context.hub should always be set");d+="#_a="+f+"&hub="+b.hub;if(b.filter&&c.StringUtils.localeIgnoreCaseComparer(b.filter,b.hub)!==0)d+="&filter="+b.filter;return d}d.getAsyncBacklogLink=j;function b(f,e){a.assertParamIsString(f,"action");var b=g.getInstance(),d=[];if(b&&b.hub&&b.hub.plural){d.push(b.hub.plural);if(e)c.StringUtils.localeIgnoreCaseComparer(e,b.hub.plural)!==0&&d.push(e);else b.filter&&b.filter.plural&&d.push(b.filter.plural)}return h(f,d)}d.generateBacklogLink=b;function h(b,a){return a&&a.length>0?e.getActionUrl(b,"backlogs",{parameters:a}):e.getActionUrl(b,"backlogs")}})(b.LinkHelpers||(b.LinkHelpers={}));var D=b.LinkHelpers;(function(a){a[a.NotFiltered=0]="NotFiltered";a[a.DrillDown=1]="DrillDown";a[a.DrillUp=2]="DrillUp"})(b.BacklogFilterState||(b.BacklogFilterState={}));var B=b.BacklogFilterState;(function(a){a.AGILE_AREA="Microsoft.VisualStudio.Service.Agile";a.PRODUCTBACKLOG_FEATURE="ProductBacklog";a.PRODUCTBACKLOG_SWITCH_PROPERTY="Switch"})(b.CustomerIntelligenceConstants||(b.CustomerIntelligenceConstants={}));var z=b.CustomerIntelligenceConstants;q.tfsModuleLoaded("TFS.Agile",b)});
// SIG // Begin signature block
// SIG // MIIapQYJKoZIhvcNAQcCoIIaljCCGpICAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFKLR3xSKw4BC
// SIG // gnHktFLH2TWcmw2xoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSPMIIEiwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGoMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSmwuqrujMU
// SIG // WRveASfMCq2SgQqlsTBIBgorBgEEAYI3AgEMMTowOKAe
// SIG // gBwAVABGAFMALgBBAGcAaQBsAGUAXwAyAC4AagBzoRaA
// SIG // FGh0dHA6Ly9taWNyb3NvZnQuY29tMA0GCSqGSIb3DQEB
// SIG // AQUABIIBAAOSwDXbp+q1Qft82i5s5OjO9q9dSG6w63c7
// SIG // RPrzudJuePl7Ci3TAA4bDVQdWK8X/FbD4jQv3+5GYlTk
// SIG // Ys4HNVqtNO1y09H+gn+3/J6yV4C2Q9xkpEAuVAxLE0EB
// SIG // DP1NwZ122dTuEV42jSbxMboL61bFi9oN7HQcXMGZpI6u
// SIG // 9GvJhASgsaF22GzcAkJuWFIZi1ANMtNkVAMuiYEIX4TU
// SIG // 4/By8ajFlZQVxtdJMoOg8IZHBCj8j9eC7AqcOMAir2v7
// SIG // ypnjCh3kHZRpa0knTyKGQCuSTyshvRBO0gCLe3l21jIE
// SIG // usKIW5zcZf6h7raMbVv1Uu0p6Iwce1oudo8iPgx8y5Gh
// SIG // ggIoMIICJAYJKoZIhvcNAQkGMYICFTCCAhECAQEwgY4w
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBAhMzAAAATKHoTcy0
// SIG // dHs7AAAAAABMMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0B
// SIG // CQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0x
// SIG // NDA3MjMwOTA4MDhaMCMGCSqGSIb3DQEJBDEWBBSOJEJQ
// SIG // 5L+JKmD4196Xq/sDkXL8sDANBgkqhkiG9w0BAQUFAASC
// SIG // AQAFko35ekQ6OUcN4lxVtdiC9eiJapYOmyDVdxUVRF9U
// SIG // 10yhnbIEOm38TxAxfiL2vTNWrrCZ8OCczrv5FBjOFPKZ
// SIG // IilEaVmGPIbAeJA8PnwPC1G6xgZ9W4py8rwnSezwyWrf
// SIG // 7JguQl6A3EbCQrq+vGY2xBmmcI1L5YgrClaYEm+KOOwM
// SIG // 3rBOBHa6U1ZVtNgKD5ddNfiBtJ6CDw0+8t7+JiLjH8G3
// SIG // wt+3ya47Um3s5/XxP1JgVtbQAx6zfBRxu3yVifkglg6J
// SIG // mYNxMROOEw5Jj2nKuBMB8bkOtL0Amb1UnBnAIM8aJnEG
// SIG // UxmxukRFY3mBRb282/xBv7sB3PTK2Mldr+xQ
// SIG // End signature block
