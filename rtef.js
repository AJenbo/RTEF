/**
 * Cross browser function to handle events
 */
if(typeof(addEvent) == "undefined") {
	function addEvent(obj, evType, fn, useCapture) {
		if (obj.addEventListener){
			obj.addEventListener(evType, fn, useCapture);
			return true;
		} else if(obj.attachEvent) {
			var r = obj.attachEvent("on"+evType, fn);
			return r;
		}
	}
}

var rtef = {};

//Public
rtef.rtefPath = '';
rtef.defaultcss = '';
rtef.colorpallet = [];
rtef.config = {};

//Privat
rtef.rtefs = [];
rtef.browser = '';
rtef.browserVersion = 0;

//TODO this still needs lots of work
rtef.toggleHTMLSrc = function(rtefName) {
	//switch betwean code editing and visual editing
	rtef.closeTools();
	//contributed by Bob Hutzel (thanks Bob!)
	var rtefIrame = document.getElementById('iframe_'+rtefName);
	var rtefInput = document.getElementById(rtefName);
	var rtefStatusbar = document.getElementById("_xtSrc"+rtefName);
	var rtefStatusicon = document.getElementById("imgSrc"+rtefName);
	var rtefDocument = returnRTE(rtefName).document;
	var htmlSrc;
	//TODO
	//if(rtef.browser == 'webkit') stripSafarijunk(rtefName);
	//TODO
	//stripGuidelines(rtefName);	// Removes Table Guidelines
	if(rtef.config[rtefName].htmlMode == false) {
		//We are going in to HTML mode
		rtefStatusbar.innerHTML = lblModeRichText;
		rtefStatusicon.src = imagesPath+'design.gif';
		//TODO
		//stripGuidelines(rtefName);
		if(isSafari)stripSafarijunk(rtefName);
		if(buttons) {
			showHideElement("buttons_" + rtefName, "hide", true);
			resizeRTE(rtefName);
		}
		setHiddenVal(rtefName);
		rtefDocument.body.innerHTML = formathtml(rtefInput.value);
		if(isIE) {
			// This resets the undo/redo buffer.
			document.getElementById(rtefName).value = returnRTE(rtefName).document.body.innerHTML;
		}
		rtef.switchLinks(rtefName, "design");
		rtef.config[rtefName].htmlMode == true;
	} else {
		//we going in to design mode
		obj_height = parseInt(rtefIrame.style.height);
		rtefStatusbar.innerHTML = lblModeHTML;
		rtefStatusicon.src = imagesPath+'code.gif';
		if(buttons) {
			showHideElement("buttons_" + rtefName, "show", true);
			resizeRTE(rtefName);
		}
		if(isIE) {
/* TPOST MODIFICATION - applet */
		    var htmlSrc = rtefDocument.body.innerText.replace(/[\r\n]/g, '').replace(/\s/g, ' ');
		    htmlSrc = unfillPlaceholders(htmlSrc);
			rtefDocument.body.innerHTML = htmlSrc;
			// ORIGINAL
			//rtefDocument.body.innerHTML = rtefDocument.body.innerText.replace(/[\r\n]/g, '').replace(/\s/g, ' ');
/* END MODIFICATION */
		} else {
			htmlSrc = rtefDocument.body.ownerDocument.createRange();
			htmlSrc.selectNodeContents(rtefDocument.body);
/* TPOST MODIFICATION - applet */
			htmlSrc = htmlSrc.toString();
			htmlSrc = unfillPlaceholders(htmlSrc);
			htmlSrc = htmlSrc.replace(/\s/g, ' ');
			rtefDocument.body.innerHTML = htmlSrc;
			// ORIGINAL
			//rtefDocument.body.innerHTML = htmlSrc.toString().replace(/\s/g, ' ');
/* END MODIFICATION */
		}
//		rtefDocument.body.innerHTML = replaceSpecialChars(rtefDocument.body.innerHTML);
		//TODO
		//showGuidelines(rtefName);
		//needed for editing some attributes
		if(isSafari)applySafarijunk(rtefName);
		// (IE Only)This prevents an undo operation from displaying a pervious HTML mode
		if(isIE) {
			document.getElementById(rtefName).value = returnRTE(rtefName).document.body.innerHTML;
		}
	//	rtef.returnFrameDocument(rtefName).document
		rtef.switchLinks(rtefName, "html");
		rtef.config[rtefName].htmlMode == false;
	}
}

rtef.switchLinks = function(rtefName, title) {
	//disable or enable the css files loaded in the iframe
	var linkNodes = rtef.returnFrameDocument(rtefName).document.getElementsByTagName("link");
	for (i = 0; i < linkNodes.length; i++) {
		if(linkNodes[i].getAttribute("title") == title) {
			linkNodes[i].disabled = true;
		} else {
			linkNodes[i].disabled = false;
		}
	}
}

//Sync rtef.value with iframe
rtef.parse = function(rtefName) {
	if(rtef.browser == 'webkit') rtef.returnFrameDocument(rtefName).focus();
	//TODO stop it from switching back to design view
	//if viewing source, switch back to design view
	if(document.getElementById(rtefName).className == 'html') {
		rtef.toggleHTMLSrc(rtefName);
	}
	setHiddenVal(rtefName);
}

//update all RTEFs
rtef.updateAll = function() {
	rtef.closeTools();
	for(var i=0; i<rtef.rtefs.length; i++) {
		rtef.parse(rtef.rtefs[i]);
	}
}

rtef.init = function() {
	var ua = navigator.userAgent.toLowerCase();
	var	incompatibleBrowser = false;
	if(ua.indexOf('opera') != -1) {
		rtef.browser = 'opera';
	} else if(ua.indexOf('msie') != -1 && ua.indexOf('webtv') == -1) {
		//MSIE must be after opera
		rtef.browser = 'msie';
	} else if(ua.indexOf('webkit') != -1) {
		rtef.browser = 'webkit';
		//iPhone supports all the script but the user is not given any keyboard and there is no real selection on it either
		incompatibleBrowser = (ua.indexOf("iphone") != -1);
	} else if(ua.indexOf('gecko') != -1) {
		//Gecko must be after webkit
		rtef.browser = 'gecko';
	}
	
	rtef.browserVersion = parseFloat(ua.substring(ua.lastIndexOf(rtef.browser)+rtef.browser.length+1));
	
	/* RTEF 007 broak IE5, hopfully 008 wount.
	if(rtef.browser == 'msie' && rtef.browserVersion < 5.5)
		incompatibleBrowser = true;
	} else 
	*/
	//Safari 1.2 thinks it has designMode
	if(rtef.browser == 'webkit' && rtef.browserVersion < 312)
		incompatibleBrowser = true;
	/*
	else if(rtef.browser == 'opera' && rtef.browserVersion < 9)
		incompatibleBrowser = true;
	*/
	
	//Abort if browser does not work with RTEF
	if(!document.getElementById || !document.designMode || incompatibleBrowser)
		return false;
	
	var i;
	//Attach stylesheet for the RTEF-UI
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = rtef.rtefPath + 'rtef.css';
	document.getElementsByTagName('head')[0].appendChild(link);
	
	//Get array of textarea that needs to be replaced with RTEF's
	var textareaArray = [];
	var tagArray = document.getElementsByTagName('textarea');
	for(i=0; i<tagArray.length; i++) {
		if(tagArray[i].className && /RTEF/.test(tagArray[i].className)) {
			textareaArray[textareaArray.length] = tagArray[i];
		}
	}
	
	//Set any parent form of a RTEF to fire rtef.updateAll() on submit
	var forms = [];
	var n;
	var skip;
	for(i=0; i<textareaArray.length; i++) {
		skip = false;
		var rtefParent = textareaArray[i];
		while ((rtefParent.tagName != 'FORM') && (rtefParent.tagName != 'BODY')) {
		  rtefParent = rtefParent.parentNode;
		}
		if(rtefParent.tagName == 'FORM') {
			for(n=0; n<forms.length; n++) {
				if(forms[i] == rtefParent) {
					skip = true;
					continue;
				}
			}
			if(!skip) {
				forms[forms.length] = rtefParent;
				addEvent(rtefParent, 'submit', function() {rtef.updateAll();});
			}
		}
		rtef.replaceTextarea(textareaArray[i]);
	}
	
	//Preload design mode image
	rtef.rtefs.designImage = new Image();
	rtef.rtefs.designImage.src = rtef.rtefPath+'images/design.gif';
	
	//TODO look in to using this for button up down in IE6 (eginxrte)
	/*
	if(browser == 'msie' && browserVersion < 7) {
		document.onmouseover = raiseButton;
		document.onmouseout  = normalButton;
		document.onmousedown = lowerButton;
		document.onmouseup   = raiseButton;
	}
	*/
	
	//TODO
	/*
	Code that might be used to resize with
	function() {
		$('textarea.resizable:not(.processed)').each(function() {
			var textarea = $(this).addClass('processed'), staticOffset = null;
			
			$(this).wrap('<div class="resizable-textarea"></div>')
			.parent().append($('<div class="grippie"></div>').mousedown(startDrag));
			
			var grippie = $('div.grippie', $(this).parent())[0];
			grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';
			
			function startDrag(e) {
				staticOffset = textarea.height() - Drupal.mousePosition(e).y;
				textarea.css('opacity', 0.25);
				$(document).mousemove(performDrag).mouseup(endDrag);
				return false;
			}
			
			function performDrag(e) {
				textarea.height(Math.max(32, staticOffset + Drupal.mousePosition(e).y) + 'px');
				return false;
			}
			
			function endDrag(e) {
				$(document).unmousemove(performDrag).unmouseup(endDrag);
				textarea.css('opacity', 1);
			}
		});
	} 
	*/
};

rtef.closeTools = function() {
	//TODO
}

//used at load to size the iframe to the content div and to resize in fullscreen mode
rtef.resize = function(rtefName) {
	var buttonsHeight = 0, totalHeight;
	
	if(document.getElementById('buttons_'+rtefName)) {
		buttonsHeight = document.getElementById('buttons_'+rtefName).offsetHeight;
	}
	
	document.getElementById('iframe_'+rtefName).style.top = buttonsHeight+'px';
	
	if(!rtef.config[rtefName].fullscreen) {
		var totalHeight = document.getElementById('rtef_'+rtefName).offsetHeight;
	} else if(document.documentElement && document.documentElement.clientHeight) {
		var totalHeight = document.documentElement.clientHeight;
	} else {
		var totalHeight = document.body.clientHeight;
	}
	if(rtef.browser == 'webkit' || rtef.browser == 'opera') {
		totalHeight = totalHeight-2;
	}
	document.getElementById('iframe_'+rtefName).style.height = Math.max(totalHeight-buttonsHeight, 0)+'px';
}

rtef.insertButton = function(name, image, command, id) {
	//Insert a button in the tool bar
	var img = '<img';
	if(id != null) {
		img += ' id="'+id+'"';
	}
	img += ' onmousemove="return false" src="'+rtef.rtefPath+'images/'+image+'" alt="'+name+'" title="'+name+'" onmousedown="'+command+';';
	if(rtef.browser == 'msie' && rtef.browserVersion < 7) {
		img += 'this.className=\'rteImgDn\';';
	}
	img += 'return false"';
	if(rtef.browser == 'msie' && rtef.browserVersion < 7) {
		img += ' onmouseover="this.className=\'rteImgUp\'" onmouseout="this.className=\'\'"';
	}
	img += ' />';
	
	return img;
}

rtef.command = function(rtefName, command, option) {
	//Fire execCommands apropiratly
	rtef.closeTools();
	//function to perform command
	var rtefDocument = returnFrameDocument(rtefName);
	try {
		rtefDocument.focus();
		rtefDocument.document.execCommand(command, false, option);
		rtefDocument.focus();
	} catch(e) {
	}
}

rtef.openTool = function(rtefName, tool, width, heigh) {
	//TODO no done yet
	return false;
}

rtef.toggleSelection = function(rtefName) {
	//TODO no done yet
	return false;
}

rtef.getText = function(rtefName) {
	//TODO no done yet
	return false;
}

rtef.insertHTML = function(rtefName) {
	//TODO no done yet
	return false;
}

rtef.selectFont = function(rtefName, selecter) {
	// function to handle font changes
	var idx = selecter.selectedIndex;
	// First one is always a label
	if(idx != 0) {
		var selected = selecter.options[idx].value;
		var cmd = selecter.id.replace('_'+rtefName, '');
		rtef.command(rtefName, cmd, selected);
		selecter.selectedIndex = 0;
	}
}

rtef.replaceTextarea = function(textarea) {
	if(textarea.id) {
		rtefName = textarea.id;
	} else {
		rtefName = textarea.name;
	}
	
	rtef.rtefs[rtef.rtefs.length] = rtefName;
	
	//Set up config
	if(!rtef.config[rtefName]) {
		rtef.config[rtefName] = {};
	}
	
	if(!rtef.config[rtefName].cssfile) {
		rtef.config[rtefName].cssfile = rtef.defaultcss;
	}
	
	if(!rtef.config[rtefName].width) {
		if(textarea.style.width) {
			rtef.config[rtefName].width = textarea.style.width;
		} else {
			rtef.config[rtefName].width = textarea.clientWidth+'px';
		}
	}
	
	if(!rtef.config[rtefName].height) {
		if(textarea.style.height) {
			rtef.config[rtefName].height = textarea.style.height;
		} else {
			rtef.config[rtefName].height = textarea.clientHeight+'px';
		}
	}
	
	rtef.config[rtefName].readonly = textarea.readOnly ? true : false;
	
	rtef.config[rtefName].buttons = typeof(rtef.config[rtefName].buttons) == 'undefined' ? true : rtef.config[rtefName].buttons;
	if(rtef.config[rtefName].buttons) {
		rtef.config[rtefName].print = typeof(rtef.config[rtefName].print) == 'undefined' ? true : rtef.config[rtefName].print;
		rtef.config[rtefName].undo = typeof(rtef.config[rtefName].undo) == 'undefined' ? true : rtef.config[rtefName].undo;
		rtef.config[rtefName].redo = typeof(rtef.config[rtefName].redo) == 'undefined' ? true : rtef.config[rtefName].redo;
		rtef.config[rtefName].cut = typeof(rtef.config[rtefName].cut) == 'undefined' ? true : rtef.config[rtefName].cut;
		rtef.config[rtefName].copy = typeof(rtef.config[rtefName].copy) == 'undefined' ? true : rtef.config[rtefName].copy;
		rtef.config[rtefName].paste = typeof(rtef.config[rtefName].paste) == 'undefined' ? true : rtef.config[rtefName].paste;
		rtef.config[rtefName].pastetext = typeof(rtef.config[rtefName].pastetext) == 'undefined' ? true : rtef.config[rtefName].pastetext;
		rtef.config[rtefName].pasteword = typeof(rtef.config[rtefName].pasteword) == 'undefined' ? true : rtef.config[rtefName].pasteword;
		rtef.config[rtefName].selectall = typeof(rtef.config[rtefName].selectall) == 'undefined' ? true : rtef.config[rtefName].selectall;
		rtef.config[rtefName].unformat = typeof(rtef.config[rtefName].unformat) == 'undefined' ? true : rtef.config[rtefName].unformat;
		rtef.config[rtefName].bold = typeof(rtef.config[rtefName].bold) == 'undefined' ? true : rtef.config[rtefName].bold;
		rtef.config[rtefName].italic = typeof(rtef.config[rtefName].italic) == 'undefined' ? true : rtef.config[rtefName].italic;
		rtef.config[rtefName].underline = typeof(rtef.config[rtefName].underline) == 'undefined' ? true : rtef.config[rtefName].underline;
		rtef.config[rtefName].strikethrough = typeof(rtef.config[rtefName].strikethrough) == 'undefined' ? true : rtef.config[rtefName].strikethrough;
		rtef.config[rtefName].increasefontsize = typeof(rtef.config[rtefName].increasefontsize) == 'undefined' ? true : rtef.config[rtefName].increasefontsize;
		rtef.config[rtefName].decreasefontsize = typeof(rtef.config[rtefName].decreasefontsize) == 'undefined' ? true : rtef.config[rtefName].decreasefontsize;
		rtef.config[rtefName].superscript = typeof(rtef.config[rtefName].superscript) == 'undefined' ? true : rtef.config[rtefName].superscript;
		rtef.config[rtefName].subscript = typeof(rtef.config[rtefName].subscript) == 'undefined' ? true : rtef.config[rtefName].subscript;
		rtef.config[rtefName].left_just = typeof(rtef.config[rtefName].left_just) == 'undefined' ? true : rtef.config[rtefName].left_just;
		rtef.config[rtefName].centre = typeof(rtef.config[rtefName].centre) == 'undefined' ? true : rtef.config[rtefName].centre;
		rtef.config[rtefName].right_just = typeof(rtef.config[rtefName].right_just) == 'undefined' ? true : rtef.config[rtefName].right_just;
		rtef.config[rtefName].justifyfull = typeof(rtef.config[rtefName].justifyfull) == 'undefined' ? true : rtef.config[rtefName].justifyfull;
		rtef.config[rtefName].textcolor = typeof(rtef.config[rtefName].textcolor) == 'undefined' ? true : rtef.config[rtefName].textcolor;
		rtef.config[rtefName].bgcolor = typeof(rtef.config[rtefName].bgcolor) == 'undefined' ? true : rtef.config[rtefName].bgcolor;
		rtef.config[rtefName].formatBlock = typeof(rtef.config[rtefName].formatBlock) == 'undefined' ? true : rtef.config[rtefName].formatBlock;
		rtef.config[rtefName].fontName = typeof(rtef.config[rtefName].fontName) == 'undefined' ? true : rtef.config[rtefName].fontName;
		rtef.config[rtefName].fontSize = typeof(rtef.config[rtefName].fontSize) == 'undefined' ? true : rtef.config[rtefName].fontSize;
		rtef.config[rtefName].numbered_list = typeof(rtef.config[rtefName].numbered_list) == 'undefined' ? true : rtef.config[rtefName].numbered_list;
		rtef.config[rtefName].list = typeof(rtef.config[rtefName].list) == 'undefined' ? true : rtef.config[rtefName].list;
		rtef.config[rtefName].outdent = typeof(rtef.config[rtefName].outdent) == 'undefined' ? true : rtef.config[rtefName].outdent;
		rtef.config[rtefName].indent = typeof(rtef.config[rtefName].indent) == 'undefined' ? true : rtef.config[rtefName].indent;
		rtef.config[rtefName].hr = typeof(rtef.config[rtefName].hr) == 'undefined' ? true : rtef.config[rtefName].hr;
		rtef.config[rtefName].special_char = typeof(rtef.config[rtefName].special_char) == 'undefined' ? true : rtef.config[rtefName].special_char;
		rtef.config[rtefName].hyperlink = typeof(rtef.config[rtefName].hyperlink) == 'undefined' ? true : rtef.config[rtefName].hyperlink;
		rtef.config[rtefName].unlink = typeof(rtef.config[rtefName].unlink) == 'undefined' ? true : rtef.config[rtefName].unlink;
		rtef.config[rtefName].image = typeof(rtef.config[rtefName].image) == 'undefined' ? true : rtef.config[rtefName].image;
		rtef.config[rtefName].insert_table = typeof(rtef.config[rtefName].insert_table) == 'undefined' ? true : rtef.config[rtefName].insert_table;
		rtef.config[rtefName].replace = typeof(rtef.config[rtefName].replace) == 'undefined' ? true : rtef.config[rtefName].replace;
	}
	
	var rtefHtml = '';
	
	if(rtef.config[rtefName].buttons) {
		rtefHtml += '<div class="buttons" id="buttons_'+rtefName+'"';
		if(rtef.browser == 'msie') rtefHtml += ' unselectable="on"';
		rtefHtml += '>';
		if(rtef.config[rtefName].print) if(rtef.browser != 'opera') rtefHtml += rtef.insertButton(rtef.local.lblPrint, "print.gif", "rtef.print('"+rtefName+"')");
		if(rtef.config[rtefName].undo) rtefHtml += rtef.insertButton(rtef.local.lblUndo, "undo.gif", "rtef.command('"+rtefName+"','Undo')");
		if(rtef.config[rtefName].redo) rtefHtml += rtef.insertButton(rtef.local.lblRedo, "redo.gif", "rtef.command('"+rtefName+"','Redo')");
		if(rtef.config[rtefName].cut) if(rtef.browser != 'opera' && rtef.browser != 'gecko') rtefHtml += rtef.insertButton(rtef.local.lblCut, "cut.gif", "rtef.command('"+rtefName+"', 'Cut')");
		if(rtef.config[rtefName].copy) if(rtef.browser != 'opera' && rtef.browser != 'gecko') rtefHtml += rtef.insertButton(rtef.local.lblCopy, "copy.gif", "rtef.command('"+rtefName+"', 'Copy')");
		if(rtef.config[rtefName].paste) if(rtef.browser == 'msie') rtefHtml += rtef.insertButton(rtef.local.lblPaste, "paste.gif", "rtef.command('"+rtefName+"','Paste')");
		if(rtef.config[rtefName].pastetext) rtefHtml += rtef.insertButton(rtef.local.lblPasteText, "pastetext.gif", "rtef.openTool('"+rtefName+"', 'text', 355, 395)");
		if(rtef.config[rtefName].pasteword) rtefHtml += rtef.insertButton(rtef.local.lblPasteWord, "pasteword.gif", "rtef.openTool('"+rtefName+"', 'word', 355, 395)");
		if(rtef.config[rtefName].selectall) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblSelectAll, "selectall.gif", "rtef.toggleSelection('"+rtefName+"')");
		if(rtef.config[rtefName].unformat) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblUnformat, "unformat.gif", "rtef.command('"+rtefName+"', 'RemoveFormat'); rtef.command('"+rtefName+"', 'JustifyNone'); rtef.command('"+rtefName+"', 'FormatBlock', '<p>')");
			else rtefHtml += rtef.insertButton(rtef.local.lblUnformat, "unformat.gif", "rtef.insertHTML(rtef.getText('"+rtefName+"'))");
		if(rtef.config[rtefName].bold) rtefHtml += rtef.insertButton(rtef.local.lblBold, "bold.gif", "rtef.command('"+rtefName+"', 'Bold')");
		if(rtef.config[rtefName].italic) rtefHtml += rtef.insertButton(rtef.local.lblItalic, "italic.gif", "rtef.command('"+rtefName+"', 'Italic')");
		if(rtef.config[rtefName].underline) rtefHtml += rtef.insertButton(rtef.local.lblUnderline, "underline.gif", "rtef.command('"+rtefName+"', 'Underline')");
		if(rtef.config[rtefName].strikethrough) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblStrikeThrough,"strikethrough.gif","rtef.command('"+rtefName+"', 'StrikeThrough')");
			else rtefHtml += rtef.insertButton(rtef.local.lblStrikeThrough,"strikethrough.gif","rtef.insertHTML('<strike>'+rtef.getText('"+rtefName+"')+'</strike>')");
		if(rtef.config[rtefName].increasefontsize) if(rtef.browser != 'msie' && rtef.browser != 'webkit') rtefHtml += rtef.insertButton(rtef.local.lblIncreasefontsize, "increasefontsize.gif", "rtef.command('"+rtefName+"', 'IncreaseFontSize')");
		if(rtef.config[rtefName].decreasefontsize) if(rtef.browser != 'msie' && rtef.browser != 'webkit') rtefHtml += rtef.insertButton(rtef.local.lblDecreasefontsize, "decreasefontsize.gif", "rtef.command('"+rtefName+"', 'DecreaseFontSize')");
		if(rtef.config[rtefName].superscript) rtefHtml += rtef.insertButton(rtef.local.lblSuperscript, "superscript.gif", "rtef.command('"+rtefName+"', 'Superscript')");
		if(rtef.config[rtefName].subscript) rtefHtml += rtef.insertButton(rtef.local.lblSubscript, "subscript.gif", "rtef.command('"+rtefName+"', 'Subscript')");
		if(rtef.config[rtefName].left_just) rtefHtml += rtef.insertButton(rtef.local.lblAlgnLeft, "left_just.gif", "rtef.command('"+rtefName+"', 'JustifyLeft')");
		if(rtef.config[rtefName].centre) rtefHtml += rtef.insertButton(rtef.local.lblAlgnCenter, "centre.gif", "rtef.command('"+rtefName+"', 'JustifyCenter')");
		if(rtef.config[rtefName].right_just) rtefHtml += rtef.insertButton(rtef.local.lblAlgnRight, "right_just.gif", "rtef.command('"+rtefName+"', 'JustifyRight')");
		if(rtef.config[rtefName].justifyfull) rtefHtml += rtef.insertButton(rtef.local.lblJustifyFull, "justifyfull.gif", "rtef.command('"+rtefName+"', 'JustifyFull')");
		if(rtef.config[rtefName].textcolor) rtefHtml += rtef.insertButton(rtef.local.lblTextColor, "textcolor.gif", "rtef.openTool('"+rtefName+"', 'ForeColor')", "ForeColor_"+rtefName);
		if(rtef.config[rtefName].bgcolor) rtefHtml += rtef.insertButton(rtef.local.lblBgColor, "bgcolor.gif", "rtef.openTool('"+rtefName+"', 'hilitecolor')", "hilitecolor_"+rtefName);
		if(rtef.config[rtefName].formatBlock) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) {
				rtefHtml += '<select id="FormatBlock_'+rtefName+'" onchange="rtef.selectFont(\''+rtefName+'\', this)">';
				rtefHtml += rtef.local.lblFormat;
				rtefHtml += '</select>';
			}
		if(rtef.config[rtefName].fontName) { if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += '<select id="FontName_'+rtefName+'" onchange="rtef.selectFont(\''+rtefName+'\', this);">';
			else rtefHtml += '<select id="FontName_'+rtefName+'">';
			rtefHtml += rtef.local.lblFont;
			rtefHtml += '</select>';
			if(rtef.browser == 'webkit' && rtef.browserVersion < 522) rtefHtml += rtef.insertButton(rtef.local.lblApplyFont,"applyfont.gif","selectFont('"+rtefName+"', 'FontName_"+rtefName+"')");
		}
		if(rtef.config[rtefName].fontSize) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) {
			rtefHtml += '<select id="FontSize_'+rtefName+'" onchange="rtef.selectFont(\''+rtefName+'\', this)">';
			rtefHtml += rtef.local.lblSize;
			rtefHtml += '</select>';
		}
		if(rtef.config[rtefName].numbered_list) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblOL,"numbered_list.gif","rtef.command('"+rtefName+"','InsertOrderedList', '')");
		if(rtef.config[rtefName].list) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblUL,"list.gif","rtef.command('"+rtefName+"','InsertunOrderedList', '')");
		if(rtef.config[rtefName].outdent) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblOutdent,"outdent.gif","rtef.command('"+rtefName+"','Outdent')");
		if(rtef.config[rtefName].indent) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblIndent,"indent.gif","rtef.command('"+rtefName+"','Indent')");
		if(rtef.config[rtefName].hr) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblHR,"hr.gif","rtef.command('"+rtefName+"','InsertHorizontalRule', '')");
			else rtefHtml += rtef.insertButton(rtef.local.lblHR,"hr.gif","insertHTML('<hr /><br />')");
		if(rtef.config[rtefName].special_char) rtefHtml += rtef.insertButton(rtef.local.lblInsertChar,"special_char.gif","rtef.openTool('"+rtefName+"','char', 445, 112)");
		if(rtef.config[rtefName].hyperlink) rtefHtml += rtef.insertButton(rtef.local.lblInsertLink,"hyperlink.gif","rtef.openTool('"+rtefName+"','link', 510, 180)");
		if(rtef.config[rtefName].unlink) if(!(rtef.browser == 'webkit' && rtef.browserVersion < 522)) rtefHtml += rtef.insertButton(rtef.local.lblUnLink,"unlink.gif","rtef.command('"+rtefName+"','Unlink')");
		if(rtef.config[rtefName].image) rtefHtml += rtef.insertButton(rtef.local.lblAddImage,"image.gif","rtef.openTool('"+rtefName+"','image', 750, 512)");
		if(rtef.config[rtefName].insert_table) rtefHtml += rtef.insertButton(rtef.local.lblInsertTable,"insert_table.gif","rtef.openTool('"+rtefName+"','table', 450, 155)");
		if(rtef.config[rtefName].replace) rtefHtml += rtef.insertButton(rtef.local.lblSearch,"replace.gif","rtef.openTool('"+rtefName+"','replace', 535, 175)");
		if(rtef.config[rtefName].countWords) rtefHtml += rtef.insertButton(rtef.local.lblWordCount,"word_count.gif","countWords('"+rtefName+"')");
		if(rtef.config[rtefName].spellcheck) if(rtef.browser == 'msie') rtefHtml += '<img src="'+rtef.rtefPath+'images/spellcheck.gif" alt="'+rtef.local.lblSpellCheck+'" title="'+rtef.local.lblSpellCheck+'" onmousedown="checkspell();this.className=\'rteImgDn\'" onmouseover="this.className=\'rteImgUp\'" onmouseout="this.className=\'\'" />';
	
		rtefHtml += '</div>';
	}
	
	//blank.html is needed for passing security in IE under some settings
	rtefHtml += '<iframe onfocus="rtef.closeTools();" src="' + rtef.rtefPath + 'blank.htm" id="iframe_'+rtefName+'" frameborder="0" style="top:0px;height:';
	if(rtef.config[rtefName].buttons) {
		rtefHtml += parseInt(rtef.config[rtefName].height)-26+'px';
	} else {
		rtefHtml += rtef.config[rtefName].height;
	}
	rtefHtml += '"></iframe>';
	rtefHtml += '<input class="wysiwyg" type="hidden" value="" name="'+rtefName+'" id="'+rtefName+'" />';
	
    var rtefNode = document.createElement('div');
    rtefNode.id = 'rtef_' + rtefName;
    rtefNode.className = 'rtefDiv';
    rtefNode.style.width = rtef.config[rtefName].width;
    rtefNode.style.height = rtef.config[rtefName].height;
    rtefNode.style.position = 'relative';
    rtefNode.innerHTML = rtefHtml;
	
	// Add the Rich Text Editor and delete the textarea
	textarea.parentNode.insertBefore(rtefNode, textarea);
	textarea.parentNode.removeChild(textarea);
	
	//Erly resize
	rtef.resize(rtefName);
	
	//Old versions of safari needs to fire it via setTimeout, but a delay of 0 works
	setTimeout("rtef.enableDesignMode('"+rtefName+"', '"+textarea.value.replace(/\s/g, ' ').replace(/'/g, '&#39;')+"')", 0);
	rtef.config[rtefName].htmlMode = false;
};


rtef.print = function(rtefName) {
	//Print the content of the RTEF iFrame
	rtef.closeTools();
	if(rtef.browser == 'msie') {
		rtef.command(rtefName, 'Print');
	} else {
		rtef.returnFrameDocument(rtefName).print();
	}
}

rtef.returnFrameDocument = function(rtefName) {
	if(document.getElementById('iframe_'+rtefName).contentWindow) {
		return document.getElementById('iframe_'+rtefName).contentWindow;
	} else {
		return frames['iframe_'+rtefName];
	}
};

//Fire execCommands apropiratly at a target window
rtef.command = function(rtefName, command, option) {
	rtef.closeTools();
	var rtefDocument = rtef.returnFrameDocument(rtefName);
	rtefDocument.focus();
	rtefDocument.document.execCommand(command, false, option);
	rtefDocument.focus();
}

rtef.geckoKeyPress = function(evt) {
	// function to add bold, italic, and underline shortcut commands to gecko RTEs
	// contributed by Anti Veeranna (thanks Anti!)
	var rtefName = evt.target.id;
	if (evt.ctrlKey) {
		var key = String.fromCharCode(evt.charCode).toLowerCase();
		var cmd = '';
		switch (key) {
			case 'b': cmd = "bold"; break;
			case 'i': cmd = "italic"; break;
			case 'u': cmd = "underline"; break;
			//To more resembel IE -- Anders Jenbo 14/11/07
			case 'k': cmd = "link"; break;
		}
		if (cmd) {
			if(cmd == 'link')
				rtef.openTool(rtefName,'link');
			else
				rtef.command(rtefName, cmd, null);
			// stop the event bubble
			evt.preventDefault();
			evt.stopPropagation();
		}
	}
};

rtef.local = {};

//Write the content of the iframe and make it editable
rtef.enableDesignMode = function(rtefName, html) {
	var frameHtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
	frameHtml += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="'+ rtef.local.lang +'" dir="'+ rtef.local.direction +'" id="'+ rtefName +'">';
	frameHtml += '<head>';
	frameHtml += '<title>'+rtefName+'</title>';
	frameHtml += '<meta name="generator" content="RTEF 0.008 (WYSIWYG editor)">';
	frameHtml += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	frameHtml += '<meta http-equiv="Content-Language" content="' + rtef.local.lang + '" />';
	if(rtef.config[rtefName].cssfile !== '') {
		frameHtml += '<style type="text/css">@charset "utf-8"; .object {background-color:#c0c0c0; background-image:url(\''+rtef.rtefPath+'images/object.gif\'); background-position:center; background-repeat:no-repeat;}</style>';
		frameHtml += '<link type="text/css" href="' + rtef.config[rtefName].cssfile + '" rel="stylesheet" title="design" />';
	} else {
		frameHtml += '<style type="text/css">@charset "utf-8"; .object {background-color:#c0c0c0; background-image:url(\''+rtef.rtefPath+'images/object.gif\'); background-position:center; background-repeat:no-repeat;} body {background:#FFFFFF;margin:8px;padding:0px;}</style>';
	}
	frameHtml += '<link type="text/css" href="' + rtef.rtefPath + 'html.css" rel="stylesheet" title="html" />';
	frameHtml += '</head><body style="overflow-y:scroll">'+html+'</body></html>';
	
	//Enable designmode
	var rtefDocument = rtef.returnFrameDocument(rtefName).document;
	rtefDocument.open("text/html", "replace");
	rtefDocument.write(frameHtml);
	rtefDocument.close();
	
	if(rtefDocument.designMode) {
		rtefDocument.designMode = "On";
	} else {
		document.getElementById('iframe_'+rtefName).contentDocument.designMode = "on";
	}
	
	if(rtef.browser == 'msie') {
		rtef.command(rtefName, "LiveResize", true);
	}
	
	if(rtef.browser == 'gecko') {
		//attach a keyboard handler for gecko browsers to make keyboard shortcuts work
		rtefDocument.addEventListener("keypress", rtef.geckoKeyPress, true);
		rtefDocument.addEventListener("focus", function () { rtef.closeTools(); }, false);
		//this is the old way to disable CSS styleing it was replaced by styleWithCSS but i don't know in what version this was changed - Anders Jenbo
		rtef.command(rtefName, "useCSS", true);
		rtef.command(rtefName, "styleWithCSS", false);
	}
	//TODO
//	showGuidelines(rtefName);
	
	//Switch html styling off (we start in design mode)
	rtef.switchLinks(rtefName, "html");
	
	addEvent(rtef.returnFrameDocument(rtefName), 'load', function() {
		//Make sure that html styling is off
		rtef.switchLinks(rtefName, "html");
		rtef.resize(rtefName);
	});
	
	//TODO
	//needed for editing some attributes
//if(rtef.browser == 'webkit') applySafarijunk(rtefName);
};

addEvent(window, 'load', function() {rtef.init();});
