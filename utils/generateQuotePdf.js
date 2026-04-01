function generateQuotePDF(quoteData) {
  if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
    throw new Error('jsPDF library not loaded. Make sure the CDN script is included.');
  }

  const { jsPDF: PDF } = window.jspdf;
  const doc = new PDF();

  const business = quoteData.business;
  const client = quoteData.client;
  const quote = quoteData.quote;
  const lineItems = quoteData.lineItems || [];

  const primaryColor = [2, 35, 72];
  const goldColor = [255, 200, 1];
  const textColor = [50, 50, 50];
  const lightGray = [245, 247, 250];

  let yPos = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...goldColor);
  doc.text('Devis', 15, yPos);

  doc.setFontSize(10);
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  yPos += 8;
  doc.text(`N° ${quote.number}`, 15, yPos);
  yPos += 5;
  doc.text(`Réalisé le ${quote.createdDate}`, 15, yPos);
  yPos += 5;
  doc.text(`Validité : ${quote.validityDate}`, 15, yPos);

  yPos = 20;
  const rightCol = 110;

  doc.setFillColor(...lightGray);
  doc.rect(rightCol - 5, yPos - 5, 90, 55, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Adressé à :', rightCol, yPos);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  yPos += 6;
  doc.text(client.name.toUpperCase(), rightCol, yPos);
  yPos += 5;

  const addressLines = [client.address, `${client.postalCode} ${client.city}`, 'France'];
  addressLines.forEach(line => {
    doc.text(line, rightCol, yPos);
    yPos += 5;
  });

  doc.text(client.email, rightCol, yPos);
  yPos += 5;
  doc.text(client.phone, rightCol, yPos);

  yPos = 60;

  doc.setFillColor(...lightGray);
  doc.rect(10, yPos - 5, 90, 40, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(business.name.toUpperCase(), 15, yPos);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  yPos += 5;
  doc.text(business.address, 15, yPos);
  yPos += 4;
  doc.text(`${business.postalCode} ${business.city}`, 15, yPos);
  yPos += 4;
  doc.text(business.country, 15, yPos);
  yPos += 4;
  doc.text(business.email, 15, yPos);
  yPos += 4;
  doc.text(business.phoneDisplay, 15, yPos);

  yPos = 110;

  if (quote.description) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text(quote.description, 15, yPos);
    yPos += 10;
  } else {
    yPos += 5;
  }

  const tableStartY = yPos;
  const colWidths = {
    service: 90,
    qty: 15,
    unitPrice: 25,
    totalHT: 25,
    tva: 20,
  };

  const tableStartX = 15;

  doc.setFillColor(...primaryColor);
  doc.rect(tableStartX, yPos, 180, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);

  doc.text('Service', tableStartX + 2, yPos + 5.5);
  doc.text('Qté.', tableStartX + colWidths.service + 2, yPos + 5.5);
  doc.text('PU HT', tableStartX + colWidths.service + colWidths.qty + 2, yPos + 5.5);
  doc.text(
    'Total HT',
    tableStartX + colWidths.service + colWidths.qty + colWidths.unitPrice + 2,
    yPos + 5.5
  );
  doc.text(
    'TVA',
    tableStartX + colWidths.service + colWidths.qty + colWidths.unitPrice + colWidths.totalHT + 2,
    yPos + 5.5
  );

  yPos += 8;

  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');

  lineItems.forEach((item, index) => {
    const bgColor = index % 2 === 0 ? [255, 255, 255] : [250, 250, 250];
    const rowHeight = item.description ? 15 : 8;

    doc.setFillColor(...bgColor);
    doc.rect(tableStartX, yPos, 180, rowHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(item.label, tableStartX + 2, yPos + 5);

    if (item.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      const descLines = doc.splitTextToSize(item.description, colWidths.service - 4);
      let descY = yPos + 8;
      descLines.forEach(line => {
        doc.text(line, tableStartX + 2, descY);
        descY += 3;
      });
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(String(item.qty), tableStartX + colWidths.service + 7, yPos + 5, { align: 'center' });
    doc.text(
      `${item.unitPrice.toFixed(2)} €`,
      tableStartX + colWidths.service + colWidths.qty + 20,
      yPos + 5,
      { align: 'right' }
    );
    doc.text(
      `${item.totalHT.toFixed(2)} €`,
      tableStartX + colWidths.service + colWidths.qty + colWidths.unitPrice + 22,
      yPos + 5,
      { align: 'right' }
    );
    doc.text(
      `${item.tva} %`,
      tableStartX +
        colWidths.service +
        colWidths.qty +
        colWidths.unitPrice +
        colWidths.totalHT +
        15,
      yPos + 5,
      { align: 'right' }
    );

    yPos += rowHeight;
  });

  yPos += 5;

  const totalsX = 140;
  const totalsLabelX = 110;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  doc.text('Total HT', totalsLabelX, yPos);
  doc.text(`${quote.totalHT.toFixed(2)} €`, totalsX, yPos, { align: 'right' });
  yPos += 6;

  doc.text('Total TVA', totalsLabelX, yPos);
  doc.text(`${quote.totalTVA.toFixed(2)} €`, totalsX, yPos, { align: 'right' });
  yPos += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Total TTC', totalsLabelX, yPos);
  doc.text(`${quote.totalTTC.toFixed(2)} €`, totalsX, yPos, { align: 'right' });

  yPos += 8;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text(`TVA non applicable, article ${business.tvaArticle}`, totalsLabelX, yPos);

  yPos += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);

  if (quote.notes && Array.isArray(quote.notes)) {
    quote.notes.forEach(note => {
      const lines = doc.splitTextToSize(note, 180);
      lines.forEach(line => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 15, yPos);
        yPos += 4;
      });
    });
  }

  yPos += 5;

  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...textColor);
  doc.text('Signature du client', 15, yPos);

  yPos += 25;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(120, 120, 120);
  const legalText = `${business.status} - N° Siret ${business.siret} - N° de TVA : ${business.tva} - Code NAF : ${business.naf}`;
  doc.text(legalText, 105, 290, { align: 'center' });

  if (business.certificationMention) {
    doc.text(business.certificationMention, 105, 293, { align: 'center' });
  }

  if (quoteData.includeCGV && business.cgv && Array.isArray(business.cgv)) {
    doc.addPage();
    yPos = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text('Conditions Générales de Vente - ClelimSerrurerie', 15, yPos);

    yPos += 15;

    business.cgv.forEach(item => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      doc.text(item.title, 15, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const contentLines = doc.splitTextToSize(item.content, 180);
      contentLines.forEach(line => {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 15, yPos);
        yPos += 5;
      });

      yPos += 5;
    });
  }

  return doc;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateQuotePDF };
}
