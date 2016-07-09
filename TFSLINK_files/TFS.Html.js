//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
define(["require","exports","Presentation/Scripts/TFS/TFS","Presentation/Scripts/TFS/TFS.Core","Presentation/Scripts/TFS/TFS.Host"],function(m,d,e,i,k){var a;(function(e){var d,i,h,b,f,g;function c(c,a){if($.isArray(a))for(var b=0;b<a.length;b++)c[a[b].toUpperCase()]=0}function r(a){c(h,a)}function a(e,b){var a={};d[e.toUpperCase()]=a;c(a,b)}function n(b){if($.isArray(b))for(var c=0;c<b.length;c++)a(b[c])}function x(a){if($.isArray(a))for(var b=0;b<a.length;b++)i[a[b].toUpperCase()]=0}function m(){if(!d){d={};a("a",["charset","href","hreflang","name","rel","rev","shape","tabindex","type"]);a("blockquote",["cite"]);a("br",["clear"]);a("caption",["align"]);a("col",["align","char","charoff","span","valign","width"]);a("colgroup",["align","char","charoff","span","valign","width"]);a("del",["cite","datetime"]);a("dir",["compact"]);a("div",["align"]);a("dl",["compact"]);a("font",["color","face","size"]);a("h1",["align"]);a("h2",["align"]);a("h3",["align"]);a("h4",["align"]);a("h5",["align"]);a("h6",["align"]);a("hr",["align","size","width"]);a("img",["align","alt","border","height","hspace","ismap","longdesc","name","src","usemap","vspace","width","alt2","src2"]);a("ins",["cite","datetime"]);a("li",["type","value"]);a("map",["name"]);a("menu",["compact"]);a("ol",["compact","start","type"]);a("p",["align"]);a("pre",["width"]);a("q",["cite"]);a("table",["align","border","cellpadding","cellspacing","frame","rules","summary","width","caption"]);a("tbody",["align","char","charoff","valign"]);a("td",["abbr","align","axis","char","charoff","colspan","headers","height","nowrap","rowspan","scope","valign","width"]);a("tfoot",["align","char","charoff","valign"]);a("th",["abbr","align","axis","char","charoff","colspan","headers","height","nowrap","rowspan","scope","valign","width"]);a("thead",["align","char","charoff","valign"]);a("tr",["align","char","charoff","valign"]);a("ul",["compact","type"]);a("dd",[]);a("dt",[]);n(["abbr","acronym","address","b","bdo","big","center","cite","code","dfn","em","i"]);n(["kbd","s","samp","small","span","strike","strong","sub","sup","tt","u","var"])}}function w(){if(!i){i={};x(["script","style","option","select","textarea"])}}function q(){if(!h){h={};r(["dir","lang","title","style","id","class","contenteditable"])}}function p(){if(!b){b={};c(b,["src","href","cite","longdesc"]);c(b,["background-image","list-style-image"])}}function o(){if(!f){f={};f.DATA=function(b,a,c){return b&&b.toUpperCase()==="IMG"&&a&&a.toUpperCase()==="SRC"?c.toUpperCase().search("DATA:IMAGE/\\w+;")===0:false}}}function s(){if(!g){g={};c(g,["background","background-attachment","background-color","background-image","background-position","background-repeat","border","border-bottom","border-bottom-color","border-bottom-style","border-bottom-width","border-collapse","border-color","border-left","border-left-color","border-left-style","border-left-width","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-style","border-top-width","border-width","caption-side","clear","color","float","font","font-family","font-size","font-style","font-variant","font-weight","height","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","padding","padding-bottom","padding-left","padding-right","padding-top","table-layout","text-align","text-decoration","text-indent","text-transform","vertical-align","white-space","width","word-spacing"])}}function A(a,b){return a&&b?a.toUpperCase()===b.toUpperCase():false}e.areTagsEqual=A;function B(a){if(a){m();return a.toUpperCase()in d}return false}e.isAllowedTag=B;function C(a){if(a){w();return a.toUpperCase()in i}return false}e.isSpecialTag=C;function v(c,a){if(a){q();if(a.toUpperCase()in h)return true;if(c){m();var b=d[c.toUpperCase()];if(b)return a.toUpperCase()in b}}return false}e.isAllowedAttribute=v;function l(a){if(a){p();if(a.toUpperCase()in b)return true}return false}function j(g,e,a){var b,c,d;c=a.indexOf(":");if(c<0||k.urlHelper.isSafeProtocol(a))return true;o();d=a.substr(0,c);b=f[d.toUpperCase()];if($.isFunction(b))if(b(g,e,a)===true)return true;return false}function z(a){if(a){s();if(a.toUpperCase()in g)return true}return false}function u(b){var a=b;if(!a)return"";a=a.replace("&","&amp;");a=a.replace('"',"&quot;");a=a.replace(">","&gt;");a=a.replace("<","&lt;");return a}function t(d,b,a){a=a||'"';var c=$("<div bogusAttribute="+a+b+a+">");return c.attr("bogusAttribute")}function D(e,f){var d=[],a,b,c;$.each(f.split(";")||[],function(f,c){c=$.trim(c);if(c){a=c.split(":",2);b=$.trim(a[0]);a.length===2&&z(b)&&(!l(b)||j(e,b,$.trim(a[1])))&&d.push(c)}});c=d.join(";");return c?'style="'+u(c)+'"':""}function y(f,a,b,c,d,g){var e;if(l(a)){e=b.substr(c,d);return j(f,a,$.trim(t(a,e,g)))?b:""}else return a.toUpperCase()==="STYLE"?D(f,b.substr(c,d)):b}e.cleanAttribute=y})(a||(a={}));var f;(function(j){var f=/\S/g,e=/[\s|>]/g,g=/[^\w:]/g;function i(a){return a>="0"&&a<="9"||a>="A"&&a<="Z"||a>="a"&&a<="z"?true:false}function c(a,c){f.lastIndex=c;var b=f.exec(a);return b?b.index:a.length}function h(a,c){e.lastIndex=c;var b=e.exec(a);return b?b.index:a.length}function b(c,d,a){var b=c.indexOf(a,d);return b>=0?b+a.length:c.length}function d(b,a){g.lastIndex=a;var c=g.exec(b);return c?{offset:c.index,name:b.substr(a,c.index-a)}:{offset:b.length,name:b.substr(a,b.length-a)}}function k(f,n,r){if(typeof r==="undefined")r=false;var g=f.length,e=0,m,j,p,q,t,k,l,v,u,o,s;while(e<g){j=e;e=f.indexOf("<",e);if(e<0)e=g;if(e>j){n.writeText(f,j,e-j);continue}j=e++;m=f.charAt(e);if(e<g&&m==="!"){e++;if(e+1<g&&f.substr(e,2)==="--"){e+=2;e=b(f,e,"-->");continue}if(e+6<g&&f.substr(e,7)==="[CDATA["){e+=7;e=b(f,e,"]\]>");continue}e=b(f,e,">");continue}if(e<g&&m==="?"){e++;e=b(f,e,">");continue}t=false;if(e<g&&m==="/"){t=true;e++}e=c(f,e);k=d(f,e);e=k.offset;l=k.name;if(a.isSpecialTag(l)){e=b(f,e,">");while(e<g){e=b(f,e,"<");if(e+2<g&&f.substr(e,3)==="!--")e=b(f,e,"-->");else if(e<g&&f.charAt(e)==="/"){e++;e=c(f,e);k=d(f,e);e=k.offset;v=k.name;if(a.areTagsEqual(l,v)){e=b(f,e,">");break}}else if(e<g)e++}continue}if(!a.isAllowedTag(l))if(!r){e=b(f,e,">");continue}else{n.writeEncodedText(f,j,e-j);continue}n.writeTag(f,j,e-j,l,t);while(e<g){j=e;e=c(f,e);if(e<g&&f.charAt(e)==="/")e++;if(e<g&&f.charAt(e)===">"){e++;n.writeEndOfTag(f,j,e-j,l);break}if(e<g&&i(f.charAt(e))){k=d(f,e);e=k.offset;u=k.name;e=c(f,e);p=0;q=0;if(e<g&&f.charAt(e)==="="){e++;e=c(f,e);p=e;m=f.charAt(e);o=null;if(e<g&&(m==="'"||m==='"')){o=m;e++;p=e;while(e<g&&f.charAt(e)!==o)e++;q=e;if(e<g&&f.charAt(e)===o)e++}else{e=h(f,e);q=e}}if(a.isAllowedAttribute(l,u)){s=a.cleanAttribute(l,u,f.substr(j,e-j),p-j,q-p,o);s&&n.writeAttribute(s)}continue}if(e<g&&f.charAt(e)!==">")e++}}}j.parse=k})(f||(f={}));var c=function(){function a(a){this.text=a}a.prototype.render=function(a){a.append(this.text)};return a}();e.initClassPrototype(c,{text:null});var b=function(){function a(b,a){this.tag=b.toUpperCase();this.root=a===true}a._getEmptyTags=function(){if(!a._emptyTags){var b={};b.AREA=true;b.BASE=true;b.BASEFONT=true;b.BGSOUND=true;b.BR=true;b.COL=true;b.EMBED=true;b.FRAME=true;b.HR=true;b.IMG=true;b.INPUT=true;b.ISINDEX=true;b.LINK=true;b.META=true;b.PARAM=true;b.WBR=true;b.IFRAME=false;b.MARQUEE=false;a._emptyTags=b}return a._emptyTags};a.hasEndTag=function(c){var a=this._getEmptyTags(),b=true;if(c in a)b=!a[c];return b};a.canTagHaveChild=function(b){var a=this._getEmptyTags();return!(b in a)};a.prototype.getChildren=function(){if(!this._children)this._children=[];return this._children};a.prototype.getAttributes=function(){if(!this._attributes)this._attributes=[];return this._attributes};a.prototype.getHasClosingTag=function(){return this.empty===true?false:a.hasEndTag(this.tag)};a.prototype.getCanHaveChildren=function(){return this.tagClosed===true?false:a.canTagHaveChild(this.tag)};a.prototype.render=function(a){var b,d,e,c,f=false;if(this.tag){a.append("<");a.append(this.tag);e=this.getAttributes();for(b=0,d=e.length;b<d;b++){a.append(" ");a.append($.trim(e[b]))}}c=this.getChildren();if(c.length>0){f=true;this.tag&&a.append(">");for(b=0,d=c.length;b<d;b++)c[b].render(a)}if(this.tag)if(f){a.append("</");a.append(this.tag);a.append(">")}else if(!this.getHasClosingTag())a.append("/>");else{a.append("></");a.append(this.tag);a.append(">")}};return a}();e.initClassPrototype(b,{root:false,tag:null,empty:false,tagClosed:false,_tagUpper:null,_children:null,_attributes:null});var h=function(){function a(){this._strings=[]}a.prototype.append=function(b){var a=this._strings;if(b)a[a.length]=b;return this};a.prototype.clear=function(){this._strings=[];return this};a.prototype.toString=function(){return this._strings.join("")};return a}();e.initClassPrototype(h,{_strings:null});var g=function(){function a(){this.root=new b("",true);this.elements=[]}a.prototype.writeText=function(e,d,b){var a=this.elements;a[a.length]=new c(e.substr(d,b))};a.prototype.writeEncodedText=function(e,d,b){var a=this.elements;a[a.length]=new c(i.StringUtils.htmlEncode(e.substr(d,b)))};a.prototype.writeTag=function(m,l,k,h,i){var a,f,g=this.elements,e,d,j=h.toUpperCase();if(i===true){d=[];while(g.length>0){f=g.pop();if(f instanceof c)d[d.length]=f;else{a=f;if(a.tag===j&&!a.tagClosed)break;else{if(a.getCanHaveChildren()){e=f.getChildren();while(d.length>0)e[e.length]=d.pop()}d[d.length]=a;a=null}}}if(!a)a=new b(h);e=a.getChildren();while(d.length>0)e[e.length]=d.pop()}else a=new b(h);a.tagClosed=i;g[g.length]=a};a.prototype.writeEndOfTag=function(h,g,e,i){var a,d,c=this.elements,f=i.toUpperCase();if(e>1){d=h.substr(g,e);if(d.charAt(d.length-2)==="/")if(c.length>0){a=c[c.length-1];if(a instanceof b&&a.tag===f){a.empty=true;a.tagClosed=true}}}};a.prototype.writeAttribute=function(d){var c,a=this.elements;if(a.length>0){c=a[a.length-1];c instanceof b&&c.getAttributes().push(d)}};a.prototype.finish=function(){var b,f=this.elements,g=this.root,a=[],d,e;while(f.length>0){b=f.pop();if(b instanceof c)a[a.length]=b;else{if(b.getCanHaveChildren()){d=b.getChildren();while(a.length>0)d[d.length]=a.pop()}a[a.length]=b}}e=g.getChildren();while(a.length>0)e[e.length]=a.pop()};a.prototype.toString=function(){var a=new h;this.root.render(a);return a.toString()};return a}();e.initClassPrototype(g,{root:null,elements:null});(function(a){function b(b){var a=new g;f.parse(b,a);a.finish();return a.toString()}a.normalize=b;function c(b){var a=new g;f.parse(b,a,true);a.finish();return a.toString()}a.sanitize=c})(d.HtmlNormalizer||(d.HtmlNormalizer={}));var l=d.HtmlNormalizer,j=function(){function a(){}a._replaceSimpleTemplateTokens=function(g,h){var b=g,f=/\$\{([^\$\}]+)\}/ig,c,e,d;while((c=f.exec(b))!==null){e=c[1];d=a._getEncodedTextPropertyValue(h,e);b=a._replaceMatch(b,c,d);f.lastIndex=c.index+d.length}return b};a._replaceUnencodedTemplateTokens=function(g,h){var b=g,f=/\{\{html ([^\$\}]+)\}\}/ig,c,e,d;while((c=f.exec(b))!==null){e=c[1];d=a._getTextPropertyValue(h,e);b=a._replaceMatch(b,c,d);f.lastIndex=c.index+d.length}return b};a._replaceForEachTemplateTokens=function(p,q){var g=p,n=/\{\{each \s*([^ \}]+)\}\}((?:.|\r|\n)*)\{\{\/each\}\}/ig,j=/\$\{\$value(?:\.([^\}]+))?\}/ig,c,l,m,e,d,f,k,i,b,h,o;while((c=n.exec(g))!==null){l=c[1];m=c[2];e="";d=a._getPropertyValue(q,l);if($.isArray(d))for(h=0,o=d.length;h<o;h+=1){b=m;j.lastIndex=0;while((f=j.exec(b))!==null){k=f[1];i=a._getEncodedTextPropertyValue(d[h],k);b=a._replaceMatch(b,f,i);j.lastIndex=f.index+i.length}e+=b}g=a._replaceMatch(g,c,e);n.lastIndex=c.index+e.length}return g};a._replaceMatch=function(b,a,c){return b.substring(0,a.index)+c+b.substring(a.index+a[0].length)};a._getEncodedTextPropertyValue=function(d,c){var b=a._getPropertyValue(d,c);return b===undefined?"":i.StringUtils.htmlEncode(b.toString())};a._getTextPropertyValue=function(d,c){var b=a._getPropertyValue(d,c);return b===undefined?"":b.toString()};a._getPropertyValue=function(d,b){if(b===undefined||b.length===0)return d;var c=b.split("."),a=d;while(c.length>0&&a!==undefined)a=a[c.shift()];return a};a.tmpl=function(d,c){var b=d;b=a._replaceSimpleTemplateTokens(b,c);b=a._replaceUnencodedTemplateTokens(b,c);b=a._replaceForEachTemplateTokens(b,c);return b};return a}();d.TemplateEngine=j;e.tfsModuleLoaded("TFS.Html",d)});
// SIG // Begin signature block
// SIG // MIIamwYJKoZIhvcNAQcCoIIajDCCGogCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFAHAbwEzt5kG
// SIG // 7tfjjIWNeE0xK8FIoIIVejCCBLswggOjoAMCAQICEzMA
// SIG // AABa7S/05CCZPzoAAAAAAFowDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE0MDUyMzE3
// SIG // MTMxNVoXDTE1MDgyMzE3MTMxNVowgasxCzAJBgNVBAYT
// SIG // AlVTMQswCQYDVQQIEwJXQTEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MQ0wCwYDVQQLEwRNT1BSMScwJQYDVQQLEx5uQ2lwaGVy
// SIG // IERTRSBFU046QjhFQy0zMEE0LTcxNDQxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggEi
// SIG // MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzISLf
// SIG // atC/+ynJ1Wx6iamNE7yUtel9KWXaf/Qfqwx5YWZUYZYH
// SIG // 8NRgSzGbCa99KG3QpXuHX3ah0sYpx5Y6o18XjHbgt5YH
// SIG // D8diYbS2qvZGFCkDLiawHUoI4H3TXDASppv2uQ49UxZp
// SIG // nbtlJ0LB6DI1Dvcp/95bIEy7L2iEJA+rkcTzzipeWEbt
// SIG // qUW0abZUJpESYv1vDuTP+dw/2ilpH0qu7sCCQuuCc+lR
// SIG // UxG/3asdb7IKUHgLg+8bCLMbZ2/TBX2hCZ/Cd4igo1jB
// SIG // T/9n897sx/Uz3IpFDpZGFCiHHGC39apaQExwtWnARsjU
// SIG // 6OLFkN4LZTXUVIDS6Z0gVq/U3825AgMBAAGjggEJMIIB
// SIG // BTAdBgNVHQ4EFgQUvmfgLgIbrwpyDTodf4ydayJmEfcw
// SIG // HwYDVR0jBBgwFoAUIzT42VJGcArtQPt2+7MrsMM1sw8w
// SIG // VAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL2NybC5taWNy
// SIG // b3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljcm9z
// SIG // b2Z0VGltZVN0YW1wUENBLmNybDBYBggrBgEFBQcBAQRM
// SIG // MEowSAYIKwYBBQUHMAKGPGh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0VGltZVN0
// SIG // YW1wUENBLmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDAN
// SIG // BgkqhkiG9w0BAQUFAAOCAQEAIFOCkK6mTU5+M0nIs63E
// SIG // w34V0BLyDyeKf1u/PlTqQelUAysput1UiLu599nOU+0Q
// SIG // Fj3JRnC0ANHyNF2noyIsqiLha6G/Dw2H0B4CG+94tokg
// SIG // 0CyrC3Q4LqYQ/9qRqyxAPCYVqqzews9KkwPNa+Kkspka
// SIG // XUdE8dyCH+ZItKZpmcEu6Ycj6gjSaeZi33Hx6yO/IWX5
// SIG // pFfEky3bFngVqj6i5IX8F77ATxXbqvCouhErrPorNRZu
// SIG // W3P+MND7q5Og3s1C2jY/kffgN4zZB607J7v/VCB3xv0R
// SIG // 6RrmabIzJ6sFrliPpql/XRIRaAwsozEWDb4hq5zwrhp8
// SIG // QNXWgxYV2Cj75TCCBOwwggPUoAMCAQICEzMAAADKbNUy
// SIG // EjXE4VUAAQAAAMowDQYJKoZIhvcNAQEFBQAweTELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EwHhcNMTQwNDIyMTczOTAw
// SIG // WhcNMTUwNzIyMTczOTAwWjCBgzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjENMAsGA1UECxMETU9QUjEeMBwGA1UEAxMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMIIBIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAQ8AMIIBCgKCAQEAlnFd7QZG+oTLnVu3Rsew
// SIG // 4bQROQOtsRVzYJzrp7ZuGjw//2XjNPGmpSFeVplsWOSS
// SIG // oQpcwtPcUi8MZZogYUBTMZxsjyF9uvn+E1BSYJU6W7lY
// SIG // pXRhQamU4K0mTkyhl3BJJ158Z8pPHnGERrwdS7biD8XG
// SIG // J8kH5noKpRcAGUxwRTgtgbRQqsVn0fp5vMXMoXKb9CU0
// SIG // mPhU3xI5OBIvpGulmn7HYtHcz+09NPi53zUwuux5Mqnh
// SIG // qaxVTUx/TFbDEwt28Qf5zEes+4jVUqUeKPo9Lc/PhJiG
// SIG // cWURz4XJCUSG4W/nsfysQESlqYsjP4JJndWWWVATWRhz
// SIG // /0MMrSvUfzBAZwIDAQABo4IBYDCCAVwwEwYDVR0lBAww
// SIG // CgYIKwYBBQUHAwMwHQYDVR0OBBYEFB9e4l1QjVaGvko8
// SIG // zwTop4e1y7+DMFEGA1UdEQRKMEikRjBEMQ0wCwYDVQQL
// SIG // EwRNT1BSMTMwMQYDVQQFEyozMTU5NStiNDIxOGYxMy02
// SIG // ZmNhLTQ5MGYtOWM0Ny0zZmM1NTdkZmM0NDAwHwYDVR0j
// SIG // BBgwFoAUyxHoytK0FlgByTcuMxYWuUyaCh8wVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljQ29kU2lnUENB
// SIG // XzA4LTMxLTIwMTAuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNDb2RTaWdQQ0FfMDgtMzEt
// SIG // MjAxMC5jcnQwDQYJKoZIhvcNAQEFBQADggEBAHdc69eR
// SIG // Pc29e4PZhamwQ51zfBfJD+0228e1LBte+1QFOoNxQIEJ
// SIG // ordxJl7WfbZsO8mqX10DGCodJ34H6cVlH7XPDbdUxyg4
// SIG // Wojne8EZtlYyuuLMy5Pbr24PXUT11LDvG9VOwa8O7yCb
// SIG // 8uH+J13oxf9h9hnSKAoind/NcIKeGHLYI8x6LEPu/+rA
// SIG // 4OYdqp6XMwBSbwe404hs3qQGNafCU4ZlEXcJjzVZudiG
// SIG // qAD++DF9LPSMBZ3AwdV3cmzpTVkmg/HCsohXkzUAfFAr
// SIG // vFn8/hwpOILT3lKXRSkYTpZbnbpfG6PxJ1DqB5XobTQN
// SIG // OFfcNyg1lTo4nNTtaoVdDiIRXnswggW8MIIDpKADAgEC
// SIG // AgphMyYaAAAAAAAxMA0GCSqGSIb3DQEBBQUAMF8xEzAR
// SIG // BgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJk/IsZAEZ
// SIG // FgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBS
// SIG // b290IENlcnRpZmljYXRlIEF1dGhvcml0eTAeFw0xMDA4
// SIG // MzEyMjE5MzJaFw0yMDA4MzEyMjI5MzJaMHkxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xIzAhBgNVBAMTGk1pY3Jvc29mdCBD
// SIG // b2RlIFNpZ25pbmcgUENBMIIBIjANBgkqhkiG9w0BAQEF
// SIG // AAOCAQ8AMIIBCgKCAQEAsnJZXBkwZL8dmmAgIEKZdlNs
// SIG // PhvWb8zL8epr/pcWEODfOnSDGrcvoDLs/97CQk4j1XIA
// SIG // 2zVXConKriBJ9PBorE1LjaW9eUtxm0cH2v0l3511iM+q
// SIG // c0R/14Hb873yNqTJXEXcr6094CholxqnpXJzVvEXlOT9
// SIG // NZRyoNZ2Xx53RYOFOBbQc1sFumdSjaWyaS/aGQv+knQp
// SIG // 4nYvVN0UMFn40o1i/cvJX0YxULknE+RAMM9yKRAoIsc3
// SIG // Tj2gMj2QzaE4BoVcTlaCKCoFMrdL109j59ItYvFFPees
// SIG // CAD2RqGe0VuMJlPoeqpK8kbPNzw4nrR3XKUXno3LEY9W
// SIG // PMGsCV8D0wIDAQABo4IBXjCCAVowDwYDVR0TAQH/BAUw
// SIG // AwEB/zAdBgNVHQ4EFgQUyxHoytK0FlgByTcuMxYWuUya
// SIG // Ch8wCwYDVR0PBAQDAgGGMBIGCSsGAQQBgjcVAQQFAgMB
// SIG // AAEwIwYJKwYBBAGCNxUCBBYEFP3RMU7TJoqV4ZhgO6gx
// SIG // b6Y8vNgtMBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBB
// SIG // MB8GA1UdIwQYMBaAFA6sgmBAVieX5SUT/CrhClOVWeSk
// SIG // MFAGA1UdHwRJMEcwRaBDoEGGP2h0dHA6Ly9jcmwubWlj
// SIG // cm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL21pY3Jv
// SIG // c29mdHJvb3RjZXJ0LmNybDBUBggrBgEFBQcBAQRIMEYw
// SIG // RAYIKwYBBQUHMAKGOGh0dHA6Ly93d3cubWljcm9zb2Z0
// SIG // LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0Um9vdENlcnQu
// SIG // Y3J0MA0GCSqGSIb3DQEBBQUAA4ICAQBZOT5/Jkav629A
// SIG // sTK1ausOL26oSffrX3XtTDst10OtC/7L6S0xoyPMfFCY
// SIG // gCFdrD0vTLqiqFac43C7uLT4ebVJcvc+6kF/yuEMF2nL
// SIG // pZwgLfoLUMRWzS3jStK8cOeoDaIDpVbguIpLV/KVQpzx
// SIG // 8+/u44YfNDy4VprwUyOFKqSCHJPilAcd8uJO+IyhyugT
// SIG // pZFOyBvSj3KVKnFtmxr4HPBT1mfMIv9cHc2ijL0nsnlj
// SIG // VkSiUc356aNYVt2bAkVEL1/02q7UgjJu/KSVE+Traeep
// SIG // oiy+yCsQDmWOmdv1ovoSJgllOJTxeh9Ku9HhVujQeJYY
// SIG // XMk1Fl/dkx1Jji2+rTREHO4QFRoAXd01WyHOmMcJ7oUO
// SIG // jE9tDhNOPXwpSJxy0fNsysHscKNXkld9lI2gG0gDWvfP
// SIG // o2cKdKU27S0vF8jmcjcS9G+xPGeC+VKyjTMWZR4Oit0Q
// SIG // 3mT0b85G1NMX6XnEBLTT+yzfH4qerAr7EydAreT54al/
// SIG // RrsHYEdlYEBOsELsTu2zdnnYCjQJbRyAMR/iDlTd5aH7
// SIG // 5UcQrWSY/1AWLny/BSF64pVBJ2nDk4+VyY3YmyGuDVyc
// SIG // 8KKuhmiDDGotu3ZrAB2WrfIWe/YWgyS5iM9qqEcxL5rc
// SIG // 43E91wB+YkfRzojJuBj6DnKNwaM9rwJAav9pm5biEKgQ
// SIG // tDdQCNbDPTCCBgcwggPvoAMCAQICCmEWaDQAAAAAABww
// SIG // DQYJKoZIhvcNAQEFBQAwXzETMBEGCgmSJomT8ixkARkW
// SIG // A2NvbTEZMBcGCgmSJomT8ixkARkWCW1pY3Jvc29mdDEt
// SIG // MCsGA1UEAxMkTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNh
// SIG // dGUgQXV0aG9yaXR5MB4XDTA3MDQwMzEyNTMwOVoXDTIx
// SIG // MDQwMzEzMDMwOVowdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // n6Fssd/bSJIqfGsuGeG94uPFmVEjUK3O3RhOJA/u0afR
// SIG // TK10MCAR6wfVVJUVSZQbQpKumFwwJtoAa+h7veyJBw/3
// SIG // DgSY8InMH8szJIed8vRnHCz8e+eIHernTqOhwSNTyo36
// SIG // Rc8J0F6v0LBCBKL5pmyTZ9co3EZTsIbQ5ShGLieshk9V
// SIG // UgzkAyz7apCQMG6H81kwnfp+1pez6CGXfvjSE/MIt1Nt
// SIG // UrRFkJ9IAEpHZhEnKWaol+TTBoFKovmEpxFHFAmCn4Tt
// SIG // VXj+AZodUAiFABAwRu233iNGu8QtVJ+vHnhBMXfMm987
// SIG // g5OhYQK1HQ2x/PebsgHOIktU//kFw8IgCwIDAQABo4IB
// SIG // qzCCAacwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU
// SIG // IzT42VJGcArtQPt2+7MrsMM1sw8wCwYDVR0PBAQDAgGG
// SIG // MBAGCSsGAQQBgjcVAQQDAgEAMIGYBgNVHSMEgZAwgY2A
// SIG // FA6sgmBAVieX5SUT/CrhClOVWeSkoWOkYTBfMRMwEQYK
// SIG // CZImiZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJ
// SIG // bWljcm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9v
// SIG // dCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHmCEHmtFqFKoKWt
// SIG // THNY9AcTLmUwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwEwYDVR0lBAwwCgYIKwYBBQUHAwgw
// SIG // DQYJKoZIhvcNAQEFBQADggIBABCXisNcA0Q23em0rXfb
// SIG // znlRTQGxLnRxW20ME6vOvnuPuC7UEqKMbWK4VwLLTiAT
// SIG // UJndekDiV7uvWJoc4R0Bhqy7ePKL0Ow7Ae7ivo8KBciN
// SIG // SOLwUxXdT6uS5OeNatWAweaU8gYvhQPpkSokInD79vzk
// SIG // eJkuDfcH4nC8GE6djmsKcpW4oTmcZy3FUQ7qYlw/FpiL
// SIG // ID/iBxoy+cwxSnYxPStyC8jqcD3/hQoT38IKYY7w17gX
// SIG // 606Lf8U1K16jv+u8fQtCe9RTciHuMMq7eGVcWwEXChQO
// SIG // 0toUmPU8uWZYsy0v5/mFhsxRVuidcJRsrDlM1PZ5v6oY
// SIG // emIp76KbKTQGdxpiyT0ebR+C8AvHLLvPQ7Pl+ex9teOk
// SIG // qHQ1uE7FcSMSJnYLPFKMcVpGQxS8s7OwTWfIn0L/gHkh
// SIG // gJ4VMGboQhJeGsieIiHQQ+kr6bv0SMws1NgygEwmKkgk
// SIG // X1rqVu+m3pmdyjpvvYEndAYR7nYhv5uCwSdUtrFqPYmh
// SIG // dmG0bqETpr+qR/ASb/2KMmyy/t9RyIwjyWa9nR2HEmQC
// SIG // PS2vWY+45CHltbDKY7R4VAXUQS5QrJSwpXirs6CWdRrZ
// SIG // kocTdSIvMqgIbqBbjCW/oO+EyiHW6x5PyZruSeD3AWVv
// SIG // iQt9yGnI5m7qp5fOMSn/DsVbXNhNG6HY+i+ePy5VFmvJ
// SIG // E6P9MYIEjTCCBIkCAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBpjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUHGMvkM1dXu3vgec0V8Nl
// SIG // az0lWPgwRgYKKwYBBAGCNwIBDDE4MDagHIAaAFQARgBT
// SIG // AC4ASAB0AG0AbABfADIALgBqAHOhFoAUaHR0cDovL21p
// SIG // Y3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAEggEAYhdE
// SIG // UfmKw1ldNqUUC54Zg/Q7EKxQYyZkSGFiOf49L8XKg6zm
// SIG // lJ8AweNmNI40GgsZ8zmKx9ymlb+c4x5SegX7ZNFxygrj
// SIG // oEwW7hItv8e0IBV5fSma29DsfSkehqw7xnmD9b1PB+40
// SIG // JinVeWRJg+6C5ZSm/bYXhP2NE2ryZkjN4MCYycuSmZ60
// SIG // NN0l5GoDmqkXhrQq50jHfiOJr8cJDmeg5LXeRhmQr1TW
// SIG // +9lbe7BxOJ9gYdI3Dtvs4QUgUVJYGore/ldrmNxmGlOQ
// SIG // 18WI7USWLNvJ2XxIkTv9EgdJR6O1ADn2wXxfy8Rue0/K
// SIG // eab/4sgPw+Op5gAWf5/7pzBa2i6PpaGCAigwggIkBgkq
// SIG // hkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBQQ0ECEzMAAABa7S/05CCZPzoAAAAAAFow
// SIG // CQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG
// SIG // 9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MDcyMzA5MDkw
// SIG // NFowIwYJKoZIhvcNAQkEMRYEFLi4CQ1t+N8loX6e6xeQ
// SIG // 7I4X37EcMA0GCSqGSIb3DQEBBQUABIIBAEMjBYBS5kYJ
// SIG // RY3zsBDrKG9S9z5WJAH2oVe/opTNxWC4TX5t78Dw2W2+
// SIG // QVnL8wEeBhgAYGvAv48hRbdZpJ17urKlrcLu1Ff0TUHb
// SIG // 5Mnqu5Oa6I3aUjmBqqWJPvDqnKOvRjs7LEwae5DQHevk
// SIG // kmzTRKJWiot+IMEOl3qeASmOlwBT56ca6+ErTcj6Ev9l
// SIG // zzXIJCIXD36eUH1Y5yZzo9woQpUzrzvgKY8JBxaNrjPe
// SIG // TVQgbZvGdoJHbSsRbNYX3lt0Lxf91573ZbCPc3CYQdwA
// SIG // vXGInhIlvqumNDcbfyU2GhGuZQz3V/Y2TlYBdUKEzFSN
// SIG // NrZYmIzJ+Dh50ZsuQEIRoZI=
// SIG // End signature block