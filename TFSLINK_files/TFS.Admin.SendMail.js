//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
var __extends=this.__extends||function(b,a){for(var c in a)if(a.hasOwnProperty(c))b[c]=a[c];function d(){this.constructor=b}d.prototype=a.prototype;b.prototype=new d};define(["require","exports","Admin/Scripts/TFS.Admin.Common","Presentation/Scripts/TFS/TFS.UI.Controls.Common","Presentation/Scripts/TFS/Resources/TFS.Resources.Common","Presentation/Scripts/TFS/TFS.UI.Controls","Presentation/Scripts/TFS/TFS.Core","Presentation/Scripts/TFS/TFS.Diag","Presentation/Scripts/TFS/TFS","Presentation/Scripts/TFS/TFS.Core.Ajax","Presentation/Scripts/TFS/TFS.Host","Presentation/Scripts/TFS/TFS.OM","Presentation/Scripts/TFS/TFS.Core.Utils"],function(v,h,t,e,c,g,l,a,q,s,p,j,k){var b=l.delegate,i=p.TfsContext,n=p.runningDocumentsTable,d=function(){function b(a){this._options=$.extend({title:c.SendMailTitle,to:"",subject:"",body:"",useIdentityPickerForTo:false,ccSender:true,replyToSender:true,bodyAppendixText:null},a);this._initialize()}b.prototype.beginInitialize=function(f,e){a.assertParamIsFunction(f,"successCallback");var d=this._options,g=this._tfsContext.configuration.getMailSettings();if(!g||!g.enabled)if($.isFunction(e)){e({message:c.SendMailNotEnabled});return}!d.useIdentityPickerForTo&&this.setValue(b.TO_FIELD,d.to,true);this.setValue(b.SUBJECT_FIELD,d.subject,true);this.setValue(b.BODY_FIELD,d.body);this.initializeModelData(f,e)};b.prototype.initializeModelData=function(a){$.isFunction(a)&&a();this._trackDirtyState=true};b.prototype.setValue=function(c,d,e){a.assertParamIsString(c,"fieldName");var f=this._fieldValues[c];if(this._compareValues(f,d))return false;this._fieldValues[c]=d;switch(c){case b.SUBJECT_FIELD:case b.BODY_FIELD:this.setDirty(true)}!e&&this.validate();return true};b.prototype.getValue=function(b){a.assertParamIsString(b,"fieldName");return this._fieldValues[b]};b.prototype.isDirty=function(){return this._isDirty};b.prototype.getTitle=function(){return this._options.title};b.prototype.getBodyAppendixText=function(){return this._options.bodyAppendixText};b.prototype.useIdentityPickerForTo=function(){return this._options.useIdentityPickerForTo};b.prototype.validate=function(){var d=[],c=false,a;this._isValid=false;if(!this._options.useIdentityPickerForTo)c=k.parseEmailAddressesStringToArray(this.getValue(b.TO_FIELD)).length>0;else{a=this.getValue(b.IDENTITIES_FIELD);if(a)c=a.newUsers.length>0||a.existingUsers.length>0}!c&&d.push({});this._isValid=d.length===0;this._raiseModelValidated(d)};b.prototype.modelValidated=function(c){a.assertParamIsFunction(c,"handler");this._events.addHandler(b.EVENT_MODEL_VALIDATED,c)};b.prototype.getMessage=function(){var c=this._tfsContext.currentIdentity.id,a={to:this._jsonifyEmailRecipients(),subject:this.getValue(b.SUBJECT_FIELD),body:this.getValue(b.BODY_FIELD)};if(this._options.ccSender)a.cc={tfids:[c]};if(this._options.replyToSender)a.replyTo={tfids:[c]};return a};b.prototype.setDirty=function(b){a.assertParamIsBool(b,"isDirty");if(this._trackDirtyState)this._isDirty=b};b.prototype._initialize=function(){this._tfsContext=this._options.tfsContext||i.getDefault();this._events=new Sys.EventHandlerList;this._fieldValues={}};b.prototype._jsonifyEmailRecipients=function(){var d,a,c=[],e=[];if(this._options.useIdentityPickerForTo){a=this.getValue(b.IDENTITIES_FIELD);if(a){e=a.existingUsers;c=a.newUsers}}else{d=this.getValue(b.TO_FIELD);c=k.parseEmailAddressesStringToArray(d)}return{tfIds:e,emailAddresses:c}};b.prototype._raiseModelValidated=function(d){a.assertParamIsArray(d,"errors");var c=this._events.getHandler(b.EVENT_MODEL_VALIDATED);c&&c(d)};b.prototype._compareValues=function(b,a){return!b?a?false:true:!a?false:typeof b==="string"&&typeof a==="string"?l.StringUtils.localeComparer(b,a)===0:b===a};b.EVENT_MODEL_VALIDATED="model-validated";b.TO_FIELD="TFS.SendMail.To";b.SUBJECT_FIELD="TFS.SendMail.Subject";b.BODY_FIELD="TFS.SendMail.Body";b.IDENTITIES_FIELD="TFS.SendMail.Identitites";return b}();h.SendMailDialogModel=d;var m=function(d){__extends(c,d);function c(a){d.call(this,a);this._events=new Sys.EventHandlerList}c.prototype.initialize=function(){d.prototype.initialize.call(this);var f=this._element,a=$("<div>"),e;f.addClass(c.CONTROL_ROOT).append(a);e={allowArbitraryEmailAddresses:this._options.allowArbitraryEmailAddresses,allowFreeType:true,setFocusOnInitializeList:false,errorHandler:b(this,this._errorHandlerWrapper),constrainToTfsUsersOnly:true,errorOptions:{errorFieldId:c.VALIDATION_FIELD_IDENTITIES_ID}};this._adminPickerControl=g.BaseControl.createIn(t.IdentityPickerControl,a,e);this._registerEventHandlers()};c.prototype.getDefaultInput=function(){return this._adminPickerControl.getDefaultInput()};c.prototype.attachIdentitiesChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.addHandler(c.EVENT_IDENTITIES_CHANGED,b)};c.prototype.detachIdentitiesChanged=function(b){a.assertParamIsFunction(b,"handler");this._events.removeHandler(c.EVENT_IDENTITIES_CHANGED,b)};c.prototype.getSelectedIdentities=function(){return this._adminPickerControl.getPendingChanges()};c.prototype.getPendingUserInput=function(){return $.trim(this._adminPickerControl.getPendingUserInput())};c.prototype.getSelectedUserDisplayNames=function(){return this._adminPickerControl.getDisplayNames()};c.prototype.setInvalid=function(){var a=$(c.CONTROL_INPUT_SELECTOR,this._element);a.addClass("invalid")};c.prototype.setValid=function(){var a=$(c.CONTROL_INPUT_SELECTOR,this._element);a.removeClass("invalid")};c.prototype._errorHandlerWrapper=function(a){a&&$.isFunction(this._options.errorHandler)&&this._options.errorHandler(a)};c.prototype._registerEventHandlers=function(){a.assertIsObject(this._element);this._element.bind("identityListChanged",b(this,function(){this._raiseIdentitiesChanged(c.EVENT_IDENTITIES_CHANGED)}))};c.prototype._raiseIdentitiesChanged=function(){var a=this._events.getHandler(c.EVENT_IDENTITIES_CHANGED);a&&a()};c.prototype.saveEmailRecipientsToRegistry=function(c){var a=[],b=this._adminPickerControl.getPendingChanges(true);$.each(b.existingUsers,function(c,b){a.push(b)});$.each(b.newUsers,function(c,b){a.push({name:b})});a.length>0&&j.TfsTeamProjectCollection.getDefaultConnection().getService(j.WebSettingsService).beginWriteSetting(c,JSON.stringify(a))};c.prototype.readEmailRecipientsFromRegistry=function(a){var b=this;j.TfsTeamProjectCollection.getDefaultConnection().getService(j.WebSettingsService).beginReadSetting(a,1,function(c){var a=[];if(c.value){try{a=JSON.parse(c.value)}catch(d){}$.isArray(a)&&$.each(a,function(c,a){a&&a.name&&b._adminPickerControl.addResolvedIdentity(a.name,a.name,a.tfid)})}},function(){})};c._typeName="tfs.SendMail.IdentityPicker";c.IDENTITY_DATA_KEY="idData";c.CONTROL_ROOT="identity-picker";c.CONTROL_ROOT_SELECTOR=".identity-picker";c.CONTROL_INPUT_SELECTOR=".identity-input";c.VALIDATION_FIELD_IDENTITIES_ID="validation-field-identities";c.EVENT_IDENTITIES_CHANGED="event-identities-changed";c.ERROR_IDENTITY_RESOLUTION_FAILED="error-identity-resolution-failed";c.ERROR_UNKNOWN="error-unknown";return c}(g.BaseControl);h.SendMailIdentityPicker=m;var f=function(f){__extends(d,f);function d(a){f.call(this,a)}d.prototype.initializeOptions=function(a){f.prototype.initializeOptions.call(this,$.extend({coreCssClass:"message-form"},a))};d.prototype.initialize=function(){f.prototype.initialize.call(this);this._tfsContext=this._options.tfsContext||i.getDefault();this._decorate()};d.prototype.getDefaultFocusField=function(){return this._$defaultFocusField};d.prototype.setMessageFields=function(b){var c=this;a.assertParamIsObject(b,"message");var d=this._options;d.toVisible!==false&&o(this._$to,b.to);d.subjectVisible!==false&&o(this._$subject,b.subject);this._body.ready(function(){c._body.setValue(c._ensureMessageBodyStyled(b.body));c._raiseMessageBodyChangedEvent()})};d.prototype._decorate=function(){var h,f,j,a=this._options,i,l,k;h=$("<table />").appendTo(this._element);if(a.toVisible!==false){f=$("<tr />").appendTo(h);l=$("<label />").text(c.SendMailTo).appendTo($("<td class='label' />").appendTo(f));if(!a.useIdentityPickerForTo){this._$to=$("<input />").attr("type","text").val(a.to||"").appendTo($("<td />").appendTo(f)).attr("id",d.ID_TO).attr("spellcheck",false).focus();this._hookupChangeEvent(this._$to);if(a.toEnabled===false){this._$to.attr("disabled",true);this._$to.addClass("disabled")}else this._$defaultFocusField=this._$to;l.attr("for",d.ID_TO)}else{this._createUserPicker().appendTo($("<td />").appendTo(f)).attr("id",d.ID_TO);this._$defaultFocusField=this._element.find("input:not([disabled]).watermark");k=this._identityPickerControl.getDefaultInput();if(k){k.attr("id",d.ID_TO);l.attr("for",d.ID_TO)}}}if(a.subjectVisible!==false){f=$("<tr />").appendTo(h);$("<label />").text(c.SendMailSubject).appendTo($("<td class='label' />").appendTo(f)).attr("for",d.ID_SUBJECT);this._$subject=$("<input />").attr("type","text").val(a.subject||"").appendTo($("<td />").appendTo(f)).attr("id",d.ID_SUBJECT).attr("maxlength",d.SUBJECT_MAX_LENGTH);this._hookupChangeEvent(this._$subject);if(!this._$defaultFocusField)this._$defaultFocusField=this._$subject}f=$("<tr />").appendTo(h);j=$("<textarea />").attr("id",d.ID_BODY).val(this._ensureMessageBodyStyled(a.body)).appendTo($("<td colspan='2' class='body-container'/>").appendTo(f));$("<label />").appendTo(j).attr("for",d.ID_BODY).hide();if(a.bodyAppendixText){f=$("<tr />").appendTo(h);$("<span />").text("* "+a.bodyAppendixText).appendTo($("<td colspan='2' class='body-appendix'/>").appendTo(f))}i={blankPageUrl:this._tfsContext.configuration.getThemedFile("Email.htm"),height:a.height||250};if($.isFunction(a.change))i=$.extend({fireOnEveryChange:a.fireOnEveryChange,change:b(this,this._onBodyChanged)},i);this._body=g.Enhancement.enhance(e.RichEditor,j,i);if(!this._$defaultFocusField)this._$defaultFocusField=j};d.prototype._onBodyChanged=function(){this._raiseMessageBodyChangedEvent()};d.prototype._createUserPicker=function(){var a=$("<div>");this._identityPickerControl=g.BaseControl.createIn(m,a,{errorHandler:b(this,this._handleError),allowArbitraryEmailAddresses:!this._tfsContext.isHosted});this._identityPickerControl.attachIdentitiesChanged(b(this,this._raiseToIdentitiesChangedEvent));this._options.savedEmailRecipientsRegistryPath&&this._identityPickerControl.readEmailRecipientsFromRegistry(this._options.savedEmailRecipientsRegistryPath);return a};d.prototype._handleSendMailSuccess=function(){this._identityPickerControl&&this._options.savedEmailRecipientsRegistryPath&&this._identityPickerControl.saveEmailRecipientsToRegistry(this._options.savedEmailRecipientsRegistryPath)};d.prototype._ensureMessageBodyStyled=function(a){return l.StringUtils.format("<div style='font-size: 10pt; font-family: Tahoma, sans-serif;'>{0}</div>",a||"")};d.prototype._raiseMessageBodyChangedEvent=function(){this._options&&$.isFunction(this._options.change)&&this._options.change({fieldId:d.ID_BODY,fieldValue:this._body.getValue()})};d.prototype._raiseToIdentitiesChangedEvent=function(){this._options&&$.isFunction(this._options.change)&&this._options.change({fieldId:d.ID_TO,fieldValue:this._identityPickerControl.getSelectedIdentities()})};d.prototype._handleError=function(a){if(this._options&&$.isFunction(this._options.onError)){if(typeof a==="string")a={message:a};this._options.onError(a)}};d.prototype._hookupChangeEvent=function(c){a.assertParamIsObject(c,"$element");if($.isFunction(this._options.change))if(this._options.fireOnEveryChange)c.bind("keyup",b(this,this._options.change));else c.bind("change",b(this,this._options.change))};d.ID_TO="email-input-to";d.ID_FROM="email-input-from";d.ID_SUBJECT="email-input-subject";d.ID_BODY="email-input-body";d.SUBJECT_MAX_LENGTH=256;return d}(g.BaseControl);h.MessageForm=f;q.classExtend(f,i.ControlExtensions);function o(c,b){var a=$.trim(b);c.val(a||"")}var r=function(j){__extends(h,j);function h(a){j.call(this,a)}h.prototype.initializeOptions=function(a){j.prototype.initializeOptions.call(this,$.extend({width:800,minWidth:600,height:600,minHeight:400,resizable:true,buttons:this._getButtons(),title:a.model.getTitle(),beforeClose:b(this,this._beforeClose)},a))};h.prototype.initialize=function(){j.prototype.initialize.call(this);this._tfsContext=this._options.tfsContext||i.getDefault();a.assertIsObject(this._options.model,"options.model is not present");this._model=this._options.model;this._registerEvents();this._decorate()};h.prototype.onClose=function(a){this._runningDocumentEntry&&n.remove(this._runningDocumentEntry);j.prototype.onClose.call(this,a)};h.prototype.isDirty=function(){return true};h.prototype._decorate=function(){var a=this,d=this.getElement(),c=$("<div>").addClass("messagearea-container");d.addClass("send-mail-dialog");this._updateSendButton(false);this._messagePane=g.BaseControl.createIn(e.MessageAreaControl,c);d.append(c);this._longRunningOperation=new e.LongRunningOperation(this,{showDelay:0});this._longRunningOperation.beginOperation(function(){a._model.beginInitialize(b(a,a._modelInitialized),b(a,a._handleError))})};h.prototype._modelInitialized=function(){a.assert(this._longRunningOperation,"_longRunningOperation");var c=this,h,e;if(this._disposing)return;this._longRunningOperation.endOperation();h=this.getElement();e=$("<div class='message-form-container'/>");this._messageForm=g.BaseControl.createIn(f,e,{subject:this._model.getValue(d.SUBJECT_FIELD),body:this._model.getValue(d.BODY_FIELD),useIdentityPickerForTo:this._model.useIdentityPickerForTo(),height:395,bodyAppendixText:this._model.getBodyAppendixText(),fireOnEveryChange:false,savedEmailRecipientsRegistryPath:this._model._options.savedEmailRecipientsRegistryPath,change:function(b){if(b.target)switch(b.target.id){case f.ID_TO:c._model.setValue(d.TO_FIELD,b.target.value);break;case f.ID_SUBJECT:c._model.setValue(d.SUBJECT_FIELD,b.target.value);break;default:a.fail("Unknown email input element")}else if(b.fieldId===f.ID_BODY)c._model.setValue(d.BODY_FIELD,b.fieldValue);else b.fieldId===f.ID_TO&&c._model.setValue(d.IDENTITIES_FIELD,b.fieldValue)},onError:b(this,this._handleError)});h.append(e);this._runningDocumentEntry=n.add("SendMailDialog",this);this._initializationSucceeded=true;this.setFormFocusDelayed(this._messageForm.getDefaultFocusField())};h.prototype._beforeClose=function(){var a=true;if(this._sendingInProgress)a=false;else if(!this._initializationSucceeded||this._sendingSucceeded)a=true;else a=confirm(c.ConfirmToDiscardEditedEmail);this._disposing=a;return a};h.prototype._handleError=function(b){a.assert(this._longRunningOperation,"_longRunningOperation");if(this._disposing)return;this._longRunningOperation.endOperation();this._updateSendButton(false);b.message&&this._messagePane.setError({header:b.message})};h.prototype._clearErrors=function(){this._messagePane.clear()};h.prototype._registerEvents=function(){this._model.modelValidated(b(this,this._onModelValidated))};h.prototype._onModelValidated=function(b){a.assertParamIsArray(b,"errors");if(b.length>0){this._handleError(b[0]);this._updateSendButton(false)}else{this._clearErrors();this._updateSendButton(true)}};h.prototype._getButtons=function(){return[{id:"send-button",text:c.SendMailSendButton,click:b(this,this._onSendClicked)},{id:"cancel-button",text:c.CancelText,click:b(this,this._onCancelClicked)}]};h.prototype._onCancelClicked=function(){this.close()};h.prototype._onSendClicked=function(){a.logTracePoint("SendMailDialog.SendButtonClicked");var b=this,e,d;d=this._model.getMessage();if(!d.subject)if(!confirm(c.SendMailNoSubjectWarning))return;e=this._tfsContext.getActionUrl("sendMail","common",{area:"api"});this._longRunningOperation.beginOperation(function(){s.postMSJSON(e,{message:k.stringifyMSJSON(d)},function(c){b._longRunningOperation.endOperation();b._sendingSucceeded=true;b._sendingInProgress=false;b._model.setDirty(false);c.sendMailWarning&&c.sendMailWarning.length>0&&window.alert(c.sendMailWarning);b._messageForm._handleSendMailSuccess();b.close();a.logTracePoint("SendMailDialog.SendCompleted")},function(){b._longRunningOperation.endOperation();b._handleError({message:c.ErrorSendEmail});b._sendingInProgress=false;b._updateSendButton(true);b._updateCancelButton(true)})});this._sendingInProgress=true;this._updateSendButton(false);this._updateCancelButton(false)};h.prototype._updateSendButton=function(a){this._element.trigger(e.ModalDialog.EVENT_BUTTON_STATUS_CHANGE,{button:"send-button",enabled:a})};h.prototype._updateCancelButton=function(a){this._element.trigger(e.ModalDialog.EVENT_BUTTON_STATUS_CHANGE,{button:"cancel-button",enabled:a})};return h}(e.ModalDialog),u=function(){function b(){}b.sendMail=function(b,c){a.assertParamIsType(b,d,"model");e.Dialog.show(r,$.extend({model:b},c))};return b}();h.Dialogs=u;q.tfsModuleLoaded("TFS.Admin.SendMail",h)});
// SIG // Begin signature block
// SIG // MIIatwYJKoZIhvcNAQcCoIIaqDCCGqQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFCMqM7/IQvSi
// SIG // ThcbnaXOJ7TKF/7PoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggShMIIEnQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIG6MBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRoRSAAfsnC
// SIG // pA9WFxHoYM/JxX0t9zBaBgorBgEEAYI3AgEMMUwwSqAw
// SIG // gC4AVABGAFMALgBBAGQAbQBpAG4ALgBTAGUAbgBkAE0A
// SIG // YQBpAGwAXwAyAC4AagBzoRaAFGh0dHA6Ly9taWNyb3Nv
// SIG // ZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAH+cAxdWnO27
// SIG // tS//5IqjHJM9gg5H6YRxRLlrWF8Shn8bSEi45UI+PHZ2
// SIG // ll5zkpPsR2xDNoRNx6uABJ/45ahGPFMcwrFPGZr6tSmk
// SIG // Z9g1GGDvUVO/AoiDLJPWI+DX+zpAlu/qhm2WXBkSqWV7
// SIG // 033FV+gPFwd1FC1LwmaQ0K/OjF1v3lcA/LcIJqYSXc2T
// SIG // ZwhXclitKKDr5flLuM7zzku5SUnJrGHd2VozpzyXv5MI
// SIG // rGD3ND7TPKas1s6M/2OnljuyPlzPInCerI5QK5Xmwrrw
// SIG // sJdxJ+1GCrfVME+uVtm3nvw7bqOqEB7aVM00h3qI3qN4
// SIG // riXbvGYe8e+54KFxbECC8FGhggIoMIICJAYJKoZIhvcN
// SIG // AQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBAhMzAAAATKHoTcy0dHs7AAAAAABMMAkGBSsO
// SIG // AwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcB
// SIG // MBwGCSqGSIb3DQEJBTEPFw0xNDA3MjMwOTA4MDJaMCMG
// SIG // CSqGSIb3DQEJBDEWBBTNNUqz3ioND8+lwvg9w9lt4aEr
// SIG // tjANBgkqhkiG9w0BAQUFAASCAQAcG3UEE/cQxItbK/zb
// SIG // G8D2n5x3/e0niRw84O3T2vqI4DXS0bewB6uhY7fvpa7t
// SIG // BnD1trZLQ0b7R0x1wWWCRl5rln5Fw0md9h7ZHYQnXEel
// SIG // GQKe5GWRZ/2K874b+jGqrOIW3x2ZzznsUVPhsDm5OwOq
// SIG // ioPzjPAu2h+j9xn/3RyNvBWCEidpSMxGZ8fPUqvqcurB
// SIG // yC618AcIjUM55JqbB2HNlZqu0FsbLOrDUCOo1mK4Ik27
// SIG // XkYFzT84bLWc3+IsuetAXkxJ0lXMCULcn4xwmoNeN+I8
// SIG // BncLDf3JUEPsY3OI1yM2EW6hUufhj9mV4mCTQ+LQBFMN
// SIG // JjuKPXOR31186SWG
// SIG // End signature block