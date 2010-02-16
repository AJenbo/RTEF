// Danish Language File (UTF-8)
// Translation provided by Martin Vium

// Settings
var lang = "da"; // xhtml language
var lang_direction = "ltr"; // language direction:ltr=left-to-right,rtl=right-to-left

// Buttons
var lblSubmit			= "Gem"; // Button value for non-designMode() & non fullsceen RTE
var lblModeRichText		= "Skift til Grafisk visning"; // Label of the Show Design view link
var lblModeHTML			= "Skift til HTML visning"; // Label of the Show Code view link
var lblSave				= "Gem";
var lblPrint			= "Udskriv";
var lblSelectAll		= "Marker Alt";
var lblSpellCheck		= "Stavekontrol";
var lblCut				= "Klip";
var lblCopy				= "Kopier";
var lblPaste			= "Indsæt";
var lblPasteText		= "Indsæt fra normal tekst";
var lblPasteWord		= "Indsæt fra Word";
var lblUndo				= "Fortryd";
var lblRedo				= "Fortryd Fortryd";
var lblHR				= "Indsæt Vandret Streg";
var lblInsertChar		= "Indsæt Special Tegn";
var lblBold				= "Fed Skrift";
var lblItalic			= "Skrå Skrift";
var lblUnderline		= "Understregning";
var lblStrikeThrough	= "Gennemstregning";
var lblSuperscript		= "Hævet Skrift";
var lblSubscript		= "Sænket Skrift";
var lblAlgnLeft			= "Ventre Orienter";
var lblAlgnCenter		= "Centrer";
var lblAlgnRight		= "Højre Orienter";
var lblJustifyFull		= "Tilpas Bredde";
var lblOL				= "Tal Liste";
var lblUL				= "Uordnet Liste";
var lblOutdent			= "Tilbagejustering";
var lblIndent			= "Indjustering";
var lblTextColor		= "Tekst Farve";
var lblBgColor			= "Baggrunds Farve";
var lblSearch			= "Søg og Erstat";
var lblInsertLink		= "Indsæt Henvisning";
var lblUnLink			= "Fjern Henvisning";
var lblAddImage			= "Indsæt Billede";
var lblInsertTable		= "Indsæt Tabel";
var lblWordCount		= "Ordoptælling";
var lblUnformat			= "Fjern Formatering";
// Dropdowns
// Format Dropdown
var lblFormat			= "<option value=\"\" selected=\"selected\">Format</option>";
lblFormat				+= "<option value=\"&lt;h1&gt;\">Overskrift 1</option>";
lblFormat				+= "<option value=\"&lt;h2&gt;\">Overskrift 2</option>";
lblFormat				+= "<option value=\"&lt;h3&gt;\">Overskrift 3</option>";
lblFormat				+= "<option value=\"&lt;h4&gt;\">Overskrift 4</option>";
lblFormat				+= "<option value=\"&lt;h5&gt;\">Overskrift 5</option>";
lblFormat				+= "<option value=\"&lt;h6&gt;\">Overskrift 6</option>";
lblFormat				+= "<option value=\"&lt;p&gt;\">Paragraf</option>";
lblFormat				+= "<option value=\"&lt;address&gt;\">Adresse</option>";
lblFormat				+= "<option value=\"&lt;pre&gt;\">Maskintekst</option>";
// Font Dropdown
var lblFont				= "<option value=\"\" selected=\"selected\">Skrifttype</option>";
lblFont					+= "<option value=\"Arial, Helvetica, sans-serif\">Arial</option>";
lblFont					+= "<option value=\"Courier New, Courier, mono\">Courier New</option>";
lblFont					+= "<option value=\"Palatino Linotype\">Palatino Linotype</option>";
lblFont					+= "<option value=\"Times New Roman, Times, serif\">Times New Roman</option>";
lblFont					+= "<option value=\"Verdana, Arial, Helvetica, sans-serif\">Verdana</option>";
var lblApplyFont		= "Benyt skrift type";
// Size Dropdown
var lblSize				= "<option value=\"\">Skriftstørrelse</option>";
lblSize					+= "<option value=\"1\">1</option>";
lblSize					+= "<option value=\"2\">2</option>";
lblSize					+= "<option value=\"3\">3</option>";
lblSize					+= "<option value=\"4\">4</option>";
lblSize					+= "<option value=\"5\">5</option>";
lblSize					+= "<option value=\"6\">6</option>";
lblSize					+= "<option value=\"7\">7</option>";
//Size buttons
var lblIncreasefontsize		= "Øg skriftstrørelsen";
var lblDecreasefontsize		= "Nedjuster skriftstrørelsen";

// Alerts
var lblSearchConfirm	= "Søgeordet [SF] findes [RUNCOUNT] gang(e).\n\n"; // Leave in [SF], [RUNCOUNT] and [RW]
lblSearchConfirm		+= "Er du sikker på du vil erstatte disse ord med [RW] ?\n";
var lblSearchAbort		= "Handling annulleret.";
var lblSearchNotFound	= "blev ikke fundet.";
var lblCountTotal		= "Ordtæling";
var lblCountChar		= "Bogstaver tilbage";
var lblCountCharWarn	= "Advarsel! Din text er for lang og kan moske ikke gemmes korekt.";

// Dialogs
// Insert Link
var lblLinkBlank		= "nyt vindu (_blank)";
var lblLinkSelf			= "Samme ramme (_self)";
var lblLinkParent		= "en ramme op (_parent)";
var lblLinkTop			= "første ramme (_top)";
var lblLinkType			= "Henvisnings Type";
var lblLinkOldA			= "eksisterende anker";
var lblLinkNewA			= "nyt anker";
var lblLinkAnchors		= "Anker";
var lblLinkAddress		= "Adresse";
var lblLinkText			= "Henvisnings Tekst";
var lblLinkOpenIn		= "Åben Henvisning I";
var lblLinkVal0			= "Indsæt venligst en adresse.";
var lblLinkSubmit		= "OK";
var lblLinkCancel		= "Annuller";
var lblLinkRelative		= "ralativ";
var lblLinkEmail		= "email";
var lblLinkDefault		= "Uændret";
// Insert Image
var lblImageURL			= "Billede Adresse";
var lblImageAltText		= "Alternativ Tekst";
var lblImageVal0		= "Vær venlig at indtaste adressen til billedet.";
var lblImageSubmit		= "OK";
var lblImageCancel		= "Annuller";
// Insert Table
var lblTableRows		= "Rækker";
var lblTableColumns		= "Kolonner";
var lblTableWidth		= "Tabel Bredde";
var lblTablePx			= "pixels";
var lblTablePercent		= "procent";
var lblTableBorder		= "Kantens Tykkelse";
var lblTablePadding		= "Celle Indjustering";
var lblTableSpacing		= "Celle Margin";
var lblTableSubmit		= "OK";
var lblTableCancel		= "Annuller";
// Search and Replace
var lblSearchFind		= "Søg efter";
var lblSearchReplace	= "Erstat med";
var lblSearchMatch		= "Forskel på store og små bogstaver";
var lblSearchWholeWord	= "Søg kun efter hele ord";
var lblSearchVal0		= "Vær venlig at indtaste et søgeord.";
var lblSearchSubmit		= "OK";
var lblSearchCancel		= "Annuller";
// Paste As Plain Text
var lblPasteTextHint	= "Tip: Højreklik og vælg \"Indsæt\" eller brug genvestasterne Ctrl-V.";
var lblPasteTextVal0	= "Indtast tekst."
var lblPasteTextSubmit	= "OK";
var lblPasteTextCancel	= "Annuller";
// Paste As Plain Text
var lblPasteWordHint	= "Tip: Du skal indsætte HTML koden.";
var lblPasteWordVal0	= "Indtast tekst."
var lblPasteWordSubmit	= "OK";
var lblPasteWordCancel	= "Annuller";

// non-designMode
var lblAutoBR			= "Benyt automatiske linie skift";
var lblRawHTML			= "Benyt kun ren HTML";
var lblnon_designMode	= 'For at benytte den grafiske tekstredigering, kræves en browser baseret på <a href="http://www.mozilla.org/" target="_blank">Mozilla 1.3+</a> (fx. <a href="http://www.mozilla-europe.org/da/products/firefox/" target="_blank">Firefox</a>), <a href="http://www.apple.com/safari/download/" target="_blank">Safari 1.3+</a>, <a href="http://www.opera.com/" target="_blank">Opera 9+</a> eller <a href="http://www.microsoft.com/windows/products/winfamily/ie/default.mspx" target="_blank">MS IE5.5+</a>.';
