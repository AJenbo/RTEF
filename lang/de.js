// German Language File
// Translation provided by Rolf Cleis, www.cleis.net
// Revised by Anders Jenbo
// Revised by Oliver Liermann

// Settings
var lang = "de"; // xhtml language
var lang_direction = "ltr"; // language direction:ltr=left-to-right,rtl=right-to-left

// Buttons
var lblSubmit			= "Senden"; // Button value for non-designMode() & non fullsceen RTE
var lblModeRichText		= "zum Layout-Modus wechseln"; // Label of the Show Design view link
var lblModeHTML			= "zum HTML-Modus wechseln"; // Label of the Show Code view link
var lblSave				= "Speichern";
var lblPrint			= "Drucken";
var lblSelectAll		= "Alles aus-/abwählen";
var lblSpellCheck		= "Rechtschreibung";
var lblCut				= "Ausschneiden";
var lblCopy				= "Kopieren";
var lblPaste			= "Einfügen";
var lblPasteText		= "als normaler Text einsetzen";
var lblPasteWord		= "Von Word einsetzen";
var lblUndo				= "Rückgängig";
var lblRedo				= "Wiederherstellen";
var lblHR				= "horizontale Trennlinie";
var lblInsertChar		= "Sonderzeichen einfügen";
var lblBold				= "Fett";
var lblItalic			= "Kursiv";
var lblUnderline		= "Unterstrichen";
var lblStrikeThrough	= "Durchgestrichen";
var lblSuperscript		= "Hochgestellt";
var lblSubscript		= "Tiefgestellt";
var lblAlgnLeft			= "Linksbündig";
var lblAlgnCenter		= "Zentriert";
var lblAlgnRight		= "Rechtsbündig";
var lblJustifyFull		= "Blocksatz";
var lblOL				= "Geordnete Liste";
var lblUL				= "Ungeordnete Liste";
var lblOutdent			= "Text-Negativeinzug";
var lblIndent			= "Texteinzug";
var lblTextColor		= "Textfarbe";
var lblBgColor			= "Hintergrundfarbe";
var lblSearch			= "Suchen und Ersetzen";
var lblInsertLink		= "Hyperlink einfügen";
var lblUnLink			= "Link entfernen";
var lblAddImage			= "Bild einfügen";
var lblInsertTable		= "Tabelle einfügen";
var lblWordCount		= "Wörter zählen";
var lblUnformat			= "Formatierung entfernen";

// Dropdowns
// Format Dropdown
var lblFormat			= "<option value=\"\" selected=\"selected\">Format</option>";
lblFormat				+= "<option value=\"&lt;h1&gt;\">Überschrift 1</option>";
lblFormat				+= "<option value=\"&lt;h2&gt;\">Überschrift 2</option>";
lblFormat				+= "<option value=\"&lt;h3&gt;\">Überschrift 3</option>";
lblFormat				+= "<option value=\"&lt;h4&gt;\">Überschrift 4</option>";
lblFormat				+= "<option value=\"&lt;h5&gt;\">Überschrift 5</option>";
lblFormat				+= "<option value=\"&lt;h6&gt;\">Überschrift 6</option>";
lblFormat				+= "<option value=\"&lt;p&gt;\">Absatz</option>";
lblFormat				+= "<option value=\"&lt;address&gt;\">Addresse</option>";
lblFormat				+= "<option value=\"&lt;pre&gt;\">Vorformatiert</option>";
// Font Dropdown
var lblFont				= "<option value=\"\" selected=\"selected\">Schriftart</option>";
lblFont					+= "<option value=\"Arial, Helvetica, sans-serif\">Arial</option>";
lblFont					+= "<option value=\"Courier New, Courier, mono\">Courier New</option>";
lblFont					+= "<option value=\"Palatino Linotype\">Palatino Linotype</option>";
lblFont					+= "<option value=\"Times New Roman, Times, serif\">Times New Roman</option>";
lblFont					+= "<option value=\"Verdana, Arial, Helvetica, sans-serif\">Verdana</option>";
var lblApplyFont		= "vorgewählte Schriftart anwenden";
// Size Dropdown
var lblSize				= "<option value=\"\">Größe</option>";
lblSize					+= "<option value=\"1\">1</option>";
lblSize					+= "<option value=\"2\">2</option>";
lblSize					+= "<option value=\"3\">3</option>";
lblSize					+= "<option value=\"4\">4</option>";
lblSize					+= "<option value=\"5\">5</option>";
lblSize					+= "<option value=\"6\">6</option>";
lblSize					+= "<option value=\"7\">7</option>";
//Size buttons
var lblIncreasefontsize		= "Schriftart-Größe erhöhen";
var lblDecreasefontsize		= "Schriftart-Größe vermindern";
// Alerts
var lblSearchConfirm	= "Ihr Suchausdruck [SF] wurde [RUNCOUNT] mal gefunden.\n\n"; // Leave in [SF], [RUNCOUNT] and [RW]
lblSearchConfirm		+= "Sind Sie sicher dass Sie alle gefundenen Einträge mit [RW] ersetzen wollen?\n";
var lblSearchAbort		= "Funktion wurde abgebrochen.";
var lblSearchNotFound	= "wurde nicht gefunden.";
var lblCountTotal		= "Wörter zählen";
var lblCountChar		= "Verfügbare Buchstaben";
var lblCountCharWarn	= "Achtung! Ihr Inhalt ist zu lang und wird vieleicht nicht korrekt gespeichert.";
// Dialogs
// Insert Link
var lblLinkBlank		= "neuem Fenster (_blank)";
var lblLinkSelf			= "selben Fenster (_self)";
var lblLinkParent		= "übergeordneten Frame (_parent)";
var lblLinkTop			= "erste Frame (_top)";
var lblLinkType			= "Hyperlink-Typ";
var lblLinkOldA			= "bestehender Anker";
var lblLinkNewA			= "neuer Anker";
var lblLinkAnchors		= "Anker";
var lblLinkAddress		= "Addresse";
var lblLinkText			= "Link-Text";
var lblLinkOpenIn		= "Link öffnen in";
var lblLinkVal0			= "Bitte geben Sie eine Adresse ein.";
var lblLinkSubmit		= "OK";
var lblLinkCancel		= "Abbrechen";
var lblLinkRelative		= "relativ";
var lblLinkEmail		= "Email";
var lblLinkDefault		= "Rückstellung";
// Insert Image
var lblImageURL			= "Bild-Adresse";
var lblImageAltText		= "Alternativtext";
var lblImageVal0		= "Bitte geben Sie eine Bild-Adresse ein.";
var lblImageSubmit		= "OK";
var lblImageCancel		= "Abbrechen";
// Insert Table
var lblTableRows		= "Zeilen";
var lblTableColumns		= "Spalten";
var lblTableWidth		= "Tabellenbreite";
var lblTablePx			= "Pixel";
var lblTablePercent		= "Prozent";
var lblTableBorder		= "Rahmenbreite";
var lblTablePadding		= "Zellabstand außen";
var lblTableSpacing		= "Zellabstand innen";
var lblTableSubmit		= "OK";
var lblTableCancel		= "Abbrechen";
// Search and Replace
var lblSearchFind		= "Suchen nach";
var lblSearchReplace	= "Ersetzen durch";
var lblSearchMatch		= "Groß-/Kleinschreibung beachten";
var lblSearchWholeWord	= "Ganzes Wort";
var lblSearchVal0		= "Bitte geben Sie einen Suchtext ein.";
var lblSearchSubmit		= "OK";
var lblSearchCancel		= "Abbrechen";
// Paste As Plain Text
var lblPasteTextHint	= "Hinweis: Sie können recht-klicken und \"Einfügen\" wählen oder die Tastenkombination Strg+V benutzen.";
var lblPasteTextVal0	= "Bitte Text eingeben.";
var lblPasteTextSubmit	= "OK";
var lblPasteTextCancel	= "Abbrechen";
// Paste from Word
var lblPasteWordHint	= "Hinweis: Sie können recht-klicken und \"Einfügen\" wählen oder die Tastenkombination Strg+V benutzen.";
var lblPasteWordVal0	= "Bitte Text eingeben.";
var lblPasteWordSubmit	= "OK";
var lblPasteWordCancel	= "Abbrechen";

// non-designMode
var lblAutoBR			= "Automatischer Zeilenumbruch";
var lblRawHTML			= "Nur Reines HTML verwenden";
var lblnon_designMode	= 'Um diesen Rich Text Editor verwenden zu können, benötigen Sie einen <a href="http://www.mozilla.org/" target="_blank">Mozilla 1.3+</a> Browser (z.B., <a href="http://www.getfirefox.com/" target="_blank">Firefox</a>), <a href="http://www.apple.com/safari/download/" target="_blank">Safari 1.3+</a>, <a href="http://www.opera.com/" target="_blank">Opera 9+</a> oder <a href="http://www.microsoft.com/windows/products/winfamily/ie/default.mspx" target="_blank">MS IE5.5+</a>.';