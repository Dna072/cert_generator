import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';


// Embed the Times Roman font

var existingPdfBytes;
const globalPdfDoc = await PDFDocument.create()

//const page = pdfDoc.addPage()
fs.readFile('ges_berekum.pdf', null, (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    //console.log(data)

    //existingPdfBytes = data
    console.log('Type:', typeof(data))
    generateCerts(data)
  });

async function generateCerts(data){
    const pdfDoc = await PDFDocument.load(data)
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()

    var name = 'Derrick Nii Adjei Adjei';

    // Draw a string of text diagonally across the first page
    firstPage.drawText('Derrick Nii Adjei Adjei'.toUpperCase(), {
        x: width/2 - 220,
        y: height / 2,
        size: 40,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    //const pdfBytes = await pdfDoc.save()
    const [certPage] = await globalPdfDoc.copyPages(pdfDoc, [0])
    globalPdfDoc.addPage(certPage)
    const pdfBytes = await globalPdfDoc.save()
    fs.writeFile('test.pdf', pdfBytes, callback);
}

var callback = (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  }