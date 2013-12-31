/*
 * jquery.selectBoxIt.js 2.0.0
 * Author: @gregfranko
 */
(function(e){"use strict";e(window.jQuery,window,document)})(function(e,t,n,r){"use strict";e.widget("selectBox.selectBoxIt",{VERSION:"2.0.0",options:{showEffect:"none",showEffectOptions:{},showEffectSpeed:"medium",hideEffect:"none",hideEffectOptions:{},hideEffectSpeed:"medium",showFirstOption:!0,defaultText:"",defaultIcon:"",downArrowIcon:"",theme:"twitterbootstrap",keydownOpen:!0,isMobile:function(){var e=navigator.userAgent||navigator.vendor||t.opera;return/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/.test(e)},nostyle:!1},_create:function(){var t=this;return t.originalElem=t.element[0],t.selectBox=t.element,t.selectItems=t.element.find("option"),t.firstSelectItem=t.element.find("option").slice(0,1),t.currentFocus=0,t.blur=!0,t.documentHeight=e(n).height(),t.textArray=[],t.currentIndex=0,t.flipped=!1,t._createDiv()._createUnorderedList()._replaceSelectBox()._eventHandlers(),t.originalElem.disabled&&t.disable&&t.disable(),t._ariaAccessibility&&t._ariaAccessibility(),t._mobile&&t._mobile(),t.options.theme==="twitterbootstrap"?t._twitterbootstrap():this.options.theme==="jqueryui"?t._jqueryui():t._addClasses(),t.selectBox.trigger("create"),t},_createDiv:function(){var t=this;return t.divText=e("<span/>",{id:(t.originalElem.id||"")&&t.originalElem.id+"SelectBoxItText","class":"selectboxit-text",unselectable:"on",text:t.firstSelectItem.text()}).attr("data-val",t.originalElem.value),t.divImage=e("<i/>",{id:(t.originalElem.id||"")&&t.originalElem.id+"SelectBoxItDefaultIcon","class":"selectboxit-default-icon",unselectable:"on"}),t.div=e("<span/>",{id:(t.originalElem.id||"")&&t.originalElem.id+"SelectBoxIt","class":"selectboxit "+(t.selectBox.attr("class")||""),style:t.selectBox.attr("style"),name:t.originalElem.name,tabindex:t.selectBox.attr("tabindex")||"0",unselectable:"on"}).append(t.divImage).append(t.divText),t.divContainer=e("<span/>",{id:(t.originalElem.id||"")&&t.originalElem.id+"SelectBoxItContainer","class":"selectboxit-container"}).append(t.div),t},_createUnorderedList:function(){var t=this,n,r="",i="",s,o="",u=e("<ul/>",{id:(t.originalElem.id||"")&&t.originalElem.id+"SelectBoxItOptions","class":"selectboxit-options",tabindex:-1});return t.options.showFirstOption||(t.selectItems=t.selectBox.find("option").slice(1)),t.selectItems.each(function(u){n=e(this).prop("disabled"),s=e(this).data("icon")||"",e(this).parent().is("optgroup")?(r="selectboxit-optgroup-option",e(this).index()===0?i='<div class="selectboxit-optgroup-header" data-disabled="true">'+e(this).parent().first().attr("label")+"</div>":i=""):r="",o+=i+'<li id="'+u+'" data-val="'+this.value.replace(/\"/g,"&quot;")+'" data-disabled="'+n+'" class="'+r+" selectboxit-option"+(e(this).attr("class")||"")+'" style="'+(e(this).attr("style")||"")+'"><a class="selectboxit-option-anchor"><i class="selectboxit-option-icon '+s+'"></i>'+e(this).text()+"</a></li>",t.textArray[u]=e(this).text(),this.selected&&(t.divText.text(e(this).text()),t.currentFocus=u)}),t.options.defaultText&&t.divText.text(t.options.defaultText),t.selectBox.data("text")&&(t.divText.text(t.selectBox.data("text")),t.options.defaultText=t.selectBox.data("text")),u.append(o),t.list=u,t.divContainer.append(t.list),t.listItems=t.list.find("li"),t.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass("ui-state-disabled"),t.currentFocus===0&&!t.options.showFirstOption&&t.listItems.eq(0).hasClass("ui-state-disabled")&&(t.currentFocus=+t.listItems.not(".ui-state-disabled").first().attr("id")),t.divImage.addClass(t.selectBox.data("icon")||t.options.defaultIcon||t.listItems.eq(t.currentFocus).find("i").attr("class")),t},_replaceSelectBox:function(){var t=this;t.selectBox.css("display","none").after(t.divContainer);var n=t.div.height();return t.downArrow=e("<i/>",{id:(t.originalElem.id||"")&&t.originalElem.id+"SelectBoxItArrow","class":"selectboxit-arrow",unselectable:"on"}),t.downArrowContainer=e("<span/>",{id:(t.originalElem.id||"")&&t.originalElem.id+"SelectBoxItArrowContainer","class":"selectboxit-arrow-container",unselectable:"on"}).append(t.downArrow),t.div.append(this.options.nostyle?t.downArrow:t.downArrowContainer),t.options.nostyle||(t.downArrowContainer.css({height:n+"px"}),t.divText.css({"line-height":t.div.css("height"),"max-width":t.div.outerWidth()-(t.downArrowContainer.outerWidth()+t.divImage.outerWidth())}),t.divImage.css({"margin-top":n/4})),t},_scrollToView:function(e){var t=this,n=t.list.scrollTop(),r=t.listItems.eq(t.currentFocus).height(),i=t.listItems.eq(t.currentFocus).position().top,s=t.list.height();return e==="search"?s-i<r?t.list.scrollTop(n+(i-(s-r))):i<-1&&t.list.scrollTop(i-r):e==="up"?i<-1&&t.list.scrollTop(n-Math.abs(t.listItems.eq(t.currentFocus).position().top)):e==="down"&&s-i<r&&t.list.scrollTop(n+(Math.abs(t.listItems.eq(t.currentFocus).position().top)-s+r)),t},_callbackSupport:function(t){var n=this;return e.isFunction(t)&&t.call(n,n.div),n},open:function(e){var t=this;t._dynamicPositioning&&t._dynamicPositioning();if(!this.list.is(":visible")){t.selectBox.trigger("open");switch(t.options.showEffect){case"none":t.list.show(),t._scrollToView("search");break;case"show":t.list.show(t.options.showEffectSpeed,function(){t._scrollToView("search")});break;case"slideDown":t.list.slideDown(t.options.showEffectSpeed,function(){t._scrollToView("search")});break;case"fadeIn":t.list.fadeIn(t.options.showEffectSpeed),t._scrollToView("search");break;default:t.list.show(t.options.showEffect,t.options.showEffectOptions,t.options.showEffectSpeed,function(){t._scrollToView("search")})}}return t._callbackSupport(e),t},close:function(e){var t=this;if(t.list.is(":visible")){t.selectBox.trigger("close");switch(t.options.hideEffect){case"none":t.list.hide(),t._scrollToView("search");break;case"hide":t.list.hide(t.options.hideEffectSpeed);break;case"slideUp":t.list.slideUp(t.options.hideEffectSpeed);break;case"fadeOut":t.list.fadeOut(t.options.hideEffectSpeed);break;default:t.list.hide(t.options.hideEffect,t.options.hideEffectOptions,t.options.hideEffectSpeed,function(){t._scrollToView("search")})}}return t._callbackSupport(e),t},_eventHandlers:function(){var t=this,n=38,r=40,i=13,s=8,o=9,u=32,a=27;return this.div.bind({"click.selectBoxIt":function(){t.div.focus(),t.originalElem.disabled||(t.selectBox.trigger("click"),t.list.is(":visible")?t.close():t.open())},"mousedown.selectBoxIt":function(){e(this).data("mdown",!0)},"blur.selectBoxIt":function(){t.blur&&(t.selectBox.trigger("blur").trigger("focusout"),t.list.is(":visible")&&t.close())},"focus.selectBoxIt":function(){var n=e(this).data("mdown");e(this).removeData("mdown"),n||t.selectBox.trigger("tab-focus"),t.list.is(":visible")||t.selectBox.trigger("focus").trigger("focusin")},"keydown.selectBoxIt":function(e){var u=e.keyCode;switch(u){case r:e.preventDefault(),t.moveDown&&(t.options.keydownOpen?t.list.is(":visible")?t.moveDown():t.open():t.moveDown()),t.options.keydownOpen&&t.open();break;case n:e.preventDefault(),t.moveUp&&(t.options.keydownOpen?t.list.is(":visible")?t.moveUp():t.open():t.moveUp()),t.options.keydownOpen&&t.open();break;case i:e.preventDefault(),t.list.is(":visible")&&t.close(),(!t.options.showFirstOption&&t.div.text()===t.firstSelectItem.text()&&t.currentFocus===0||t.options.showFirstOption&&t.options.defaultText||!t.options.showFirstOption&&!t.listItems.eq(0).not("[data-disabled='true']"))&&t.selectBox.val(t.listItems.eq(t.currentFocus).attr("data-val")).trigger("change",!0),t.selectBox.trigger("enter");break;case o:t.selectBox.trigger("tab-blur");break;case s:e.preventDefault(),t.selectBox.trigger("backspace");break;case a:t.close();break;default:}},"keypress.selectBoxIt":function(e){var n=e.charCode||e.keyCode,r=String.fromCharCode(n);n===u&&e.preventDefault(),t.search&&t.search(r,!0,"")},"mouseenter.selectBoxIt":function(){t.selectBox.trigger("mouseenter")},"mouseleave.selectBoxIt":function(){t.selectBox.trigger("mouseleave")}}),t.list.bind({"mouseover.selectBoxIt":function(){t.blur=!1},"mouseout.selectBoxIt":function(){t.blur=!0},"focusin.selectBoxIt":function(){t.div.focus()}}).delegate("li","click.selectBoxIt",function(){e(this).data("disabled")||(t.originalElem.value=e(this).attr("data-val"),t.currentFocus=+this.id,t.close(),t.originalElem.value!==t.divText.attr("data-val")&&t.selectBox.trigger("change",!0),t.selectBox.trigger("option-click"))}).delegate("li","focus.selectBoxIt",function(){e(this).data("disabled")||(t.originalElem.value=e(this).attr("data-val"),t.originalElem.value!==t.divText.attr("data-val")&&t.selectBox.trigger("change",!0))}),t.selectBox.bind({"change.selectBoxIt":function(e,n){if(!n){var r=t.list.find('li[data-val="'+t.originalElem.value+'"]');r.length&&(t.listItems.eq(t.currentFocus).removeClass(t.focusClass),t.currentFocus=+r.attr("id"))}t.divText.text(t.listItems.eq(t.currentFocus).find("a").text()).attr("data-val",t.originalElem.value),t.listItems.eq(t.currentFocus).find("i").attr("class")&&t.divImage.attr("class",t.listItems.eq(t.currentFocus).find("i").attr("class")).addClass("selectboxit-default-icon"),t.selectBox.trigger("changed")},"disable.selectBoxIt":function(){t.div.addClass("ui-state-disabled")},"enable.selectBoxIt":function(){t.div.removeClass("ui-state-disabled")}}),t},_addClasses:function(t,n,r,i,s){var o=this,u=t||"selectboxit-focus",a=n||"selectboxit-hover",f=i||"selectboxit-btn",l=s||"selectboxit-dropdown";return o.focusClass=u,o.downArrow.addClass(o.selectBox.data("downarrow")||o.options.downArrowIcon||r),o.div.addClass(i),o.list.addClass(s),o.listItems.bind({"focus.selectBoxIt":function(){e(this).addClass(u)},"blur.selectBoxIt":function(){e(this).removeClass(u)}}),o.selectBox.bind({"open.selectBoxIt":function(){o.div.removeClass(a).add(o.listItems.eq(o.currentFocus)).addClass(u)},"blur.selectBoxIt":function(){o.div.removeClass(u)},"mouseenter.selectBoxIt":function(){o.div.addClass(a)},"mouseleave.selectBoxIt":function(){o.div.removeClass(a)}}),o.listItems.bind({"mouseenter.selectBoxIt":function(){o.listItems.removeClass(u),e(this).addClass(a)},"mouseleave.selectBoxIt":function(){e(this).removeClass(a)}}),o.options.nostyle||(o.options.theme==="twitterbootstrap"&&!o.option("downArrowIcon").length?o.downArrow.css({"margin-top":o.downArrowContainer.height()/2}):o.downArrow.css({"margin-top":o.downArrowContainer.height()/3})),e(".selectboxit-option-icon").not(".selectboxit-default-icon").css("margin-top",o.downArrowContainer.height()/4),o},_jqueryui:function(){var e=this;return e._addClasses("ui-state-focus","ui-state-hover","ui-icon ui-icon-triangle-1-s","ui-widget ui-state-default","ui-widget ui-widget-content"),e},_twitterbootstrap:function(){var e=this;return e._addClasses("active","","caret","btn","dropdown-menu"),e},destroy:function(t){var n=this;return n._destroySelectBoxIt(),e.Widget.prototype.destroy.call(n),n._callbackSupport(t),n},_destroySelectBoxIt:function(){var e=this;return e.div.unbind(".selectBoxIt").undelegate(".selectBoxIt"),e.divContainer.remove(),e.selectBox.trigger("destroy").show(),e},refresh:function(e){var t=this;return t._destroySelectBoxIt()._create()._callbackSupport(e),t.selectBox.trigger("refresh"),t},_applyNativeSelect:function(){var e=this,t;e.selectBox.css({display:"block",width:e.div.outerWidth(),height:e.div.outerHeight(),opacity:"0",position:"absolute",top:e.div.offset().top,bottom:e.div.offset().bottom,left:e.div.offset().left,right:e.div.offset().right}).bind({changed:function(){t=e.selectBox.find("option").filter(":selected"),e.divText.text(t.text()),e.list.find('li[data-val="'+t.val()+'"]').find("i").attr("class")&&e.divImage.attr("class",e.list.find('li[data-val="'+t.val()+'"]').find("i").attr("class")).addClass("selectboxit-default-icon")}})}})});jQuery(function(){jQuery.selectBox.selectBoxIt.prototype.moveDown=function(e){var t=this;t.currentFocus+=1;var n=t.listItems.eq(t.currentFocus).data("disabled"),r=t.listItems.eq(t.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;if(t.currentFocus===t.listItems.length)t.currentFocus-=1;else{if(n&&r){t.listItems.eq(t.currentFocus-1).blur(),t.moveDown();return}n&&!r?t.currentFocus-=1:(t.listItems.eq(t.currentFocus-1).blur().end().eq(t.currentFocus).focus(),t._scrollToView("down"),t.selectBox.trigger("moveDown"))}return t._callbackSupport(e),t},jQuery.selectBox.selectBoxIt.prototype.moveUp=function(e){var t=this;t.currentFocus-=1;var n=t.listItems.eq(t.currentFocus).data("disabled"),r=t.listItems.eq(t.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;if(t.currentFocus===-1)t.currentFocus+=1;else{if(n&&r){t.listItems.eq(t.currentFocus+1).blur(),t.moveUp();return}n&&!r?t.currentFocus+=1:(t.listItems.eq(this.currentFocus+1).blur().end().eq(t.currentFocus).focus(),t._scrollToView("up"),t.selectBox.trigger("moveUp"))}return t._callbackSupport(e),t}});jQuery(function(){jQuery.selectBox.selectBoxIt.prototype._setCurrentSearchOption=function(e){var t=this;return(e!==0||!!t.options.showFirstOption)&&t.listItems.eq(e).data("disabled")!==!0&&(t.divText.text(t.textArray[e]),t.listItems.eq(t.currentFocus).blur(),t.currentIndex=e,t.currentFocus=e,t.listItems.eq(t.currentFocus).focus(),t._scrollToView("search"),t.selectBox.trigger("search")),t},jQuery.selectBox.selectBoxIt.prototype._searchAlgorithm=function(e,t){var n=this,r=!1,i,s,o;for(i=e,o=n.textArray.length;i<o;i+=1){for(s=0;s<o;s+=1)n.textArray[s].search(t)!==-1&&(r=!0,s=o);r||(n.currentText=n.currentText.charAt(n.currentText.length-1).replace(/[|()\[{.+*?$\\]/g,"\\$0"),t=new RegExp(n.currentText,"gi"));if(n.currentText.length<3){t=new RegExp(n.currentText.charAt(0),"gi");if(n.textArray[i].charAt(0).search(t)!==-1)return n._setCurrentSearchOption(i),n.currentIndex+=1,!1}else if(n.textArray[i].search(t)!==-1)return n._setCurrentSearchOption(i),!1;if(n.textArray[i].toLowerCase()===n.currentText.toLowerCase())return n._setCurrentSearchOption(i),n.currentText="",!1}return!0},jQuery.selectBox.selectBoxIt.prototype.search=function(e,t,n){var r=this;t?r.currentText+=e.replace(/[|()\[{.+*?$\\]/g,"\\$0"):r.currentText=e.replace(/[|()\[{.+*?$\\]/g,"\\$0");var i=new RegExp(r.currentText,"gi"),s=r._searchAlgorithm(r.currentIndex,i);return s&&r._searchAlgorithm(0,i),r._callbackSupport(n),r}});