const docx = require('../build');

var doc = new docx.Document();

var textRun = new docx.TextRun("שלום עולם").rtl();
var paragraph = new docx.Paragraph().bidi();
paragraph.addRun(textRun);

doc.addParagraph(paragraph);

var exporter = new docx.LocalPacker(doc);
exporter.pack('My Document');

console.log('Document created successfully at project root!');
