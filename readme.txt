Introduction

RTEF User InterfaceRichtext Editor: Fork (RTEF) is an open source, multilingual and cross-browser WYSIWYG editor. RTEF is based on the designMode() functionality introduced in Internet Explorer 5, and implemented in Mozilla 1.3+ using the Mozilla Rich Text Editing API.

It works with, Internet Explorer 5.5+/Mozilla 1.3+/Firefox 0.6.1+/Netscape 7.1+/Safari 1.3+ and Opera 9+. All other browsers will display a standard textarea box instead.

RTEF was originally known as RTE (Revamped), an enhancement release to Kevin Roth's Cross browser Richtext Editor (a former public domain and open source project). Upon a realease in 5/2006, Kevin's project was branded under a Creative Commons License, Thus rendering it closed source (unless someone paid a nominal fee to Kevin).

It was decided that a fork needed to be created in order to keep RTE open source and free. By doing so, RTEF has an advantage in that users can freely make and share enhancements. With that said, enjoy!

The current version has been released under the MIT License.
The MIT License

Copyright (c) 2006 Timothy Bell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYright HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Whats New

0.007:
Updated German translation.
Fixed FF3 issue.

0.006:
Arabic translation.
Updated German translation.
Updated Russian translation.
Updated Polish translation.
Updated Danish translation.
Updated Dutch translation.
Updated Portuguese translation.
Updated Swedish translation.
Updated Spanish translation.
Updated Italian translation.
Updated French translation.
Lang file clean up.
Right to left text suppor.
Font color picker fixed.
Paist directly "in paist from Word" (you had to paist HTML code before).

0.005:
Enhanced support and bug fixes for the Safari and Opera web browser.
Better compression of the richtext_compressed.js file.
All languaches converted to UTF-8.
All source converted to XHTML 1.0 Transitional.
Speed up load time.
Formated and colored HTML view.
New GUI code.
Output ID changed from [name]+'hdn' to [name].
Faster resize code.
Read only mode has been removed.
Made code generated with Gecko more compatible with IE.
Lots of small bug fixes.
Fixed relative paths for all browsers.

Download:
http://rtef.info/rtef_v0.007_20081020.zip

Support:
http://rtef.info/deluxebb/
Contributors
Multilingual : Names of the contributors can be found in each language file
Safari, Opera Support and relative paths - Anders Jenbo
Backward Compatibility - Craig Morey
Full screen mode - fills up the entire browser window (with or without auto resize) - Timothy Bell
Print function (prints content window) - Timothy Bell
Special characters - Timothy Bell
Cleaner user interface (looks the same in IE as it does in Mozilla) - Anders Jenbo
Proper clean-up of dialogs (color palette and popups) - Timothy Bell
Table Guidelines (shows dashed guidelines for tables that have a border equal to zero) - dannyuk1982(nickname) and Timothy Bell
Enhanced Insert Link Pop-up - allows you to add or link to anchors/bookmarks. - Timothy Bell, Tom Bovingdon, Rob Rix and Anders Jenbo
Enhanced Insert Image Pop-up - allows you to add alternative text to images upon insertion. - Rolf Cleis and Anders Jenbo
Search And Replace - Timothy Bell and Rolf Cleis
Improved non-designMode() interface - Craig Morey
UTF-8 Support - Timothy Bell
Word Counter - mharrisonline (nickname)
UnFormat HTML - mharrisonline (nickname)
Paste as Plain Text - mharrisonline (nickname)
Paste as Word - ndtreviv (nickname), mharrisonline (nickname)
Rewrite of trim() function - function went from around 25 lines of code to 3 - Timothy Bell
rteSafe Function - Provides a javascript based function to escape html for safe use in editor - Erel Segal
Added right-to-left feature/variable - display content right-to-left (pop-ups still in left-to-right) - Erel Segal

Issues:
Localization Updates - The folowing still needs translation.

    Hebrew
    lblUnLink = "Remove link"
    lblApplyFont = "Apply selected font"
    lblIncreasefontsize = "Increase Font Size"
    lblDecreasefontsize = "Decrease Font Size"
    lblLinkBlank = "new window (_blank)"
    lblLinkSelf = "same frame (_self)"
    lblLinkParent = "parent frame (_parent)"
    lblLinkTop = "first frame (_top)"
    lblLinkRelative = "relative"
    lblLinkEmail = "email"
    lblLinkDefault = "Default"

    Czech, Norwegian, Slovakian:
    lblPasteText = "Paste as Plain Text"
    lblPasteWord = "Paste From Word"
    lblUnLink = "Remove link"
    lblWordCount = "Word Count"
    lblUnformat = "Unformat"
    lblApplyFont = "Apply selected font"
    lblIncreasefontsize = "Increase Font Size"
    lblDecreasefontsize = "Decrease Font Size"
    lblCountTotal = "Word Count"
    lblCountChar = "Available Characters"
    lblCountCharWarn = "Warning! Your content is too long and may not save correctly."
    lblLinkBlank = "new window (_blank)"
    lblLinkSelf = "same frame (_self)"
    lblLinkParent = "parent frame (_parent)"
    lblLinkTop = "first frame (_top)"
    lblLinkRelative = "relative"
    lblLinkEmail = "email"
    lblLinkDefault = "Default"
    lblPasteTextHint = "Hint: To paste you can either right-click and choose \"Paste\" or use the key combination of Ctrl-V."
    lblPasteTextVal0 = "Please enter text."

    Simplified Chinese:
    lblLinkBlank = "new window (_blank)"
    blPasteWordHint = "Hint: To paste you can either right-click and choose \"Paste\" or use the key combination of Ctrl-V."
    lblPasteWordVal0 = "Please enter text."

Also see source files for a TODO list
