import jsPDF from 'jspdf';

const downloadReport = (totals, selectedDate, logo) => {
  const doc = new jsPDF();

  // Add Logo
  const img = new Image();
  img.src = logo;
  doc.addImage(img, 'JPEG', 15, 10, 50, 20);

  // Report Header
  doc.setFontSize(18);
  doc.text('Daily Sales Report', 70, 30);
  doc.setFontSize(12);
  doc.text(`Date: ${selectedDate}`, 15, 40);
  doc.text(`Acconex Computers`, 15, 50);
  doc.text(`124/1/1, Anagarika Dharmapala MW, Matara`, 15, 60);
  doc.text(`Mob: 071-7314099`, 15, 70);

  // Sales Data
  doc.setFontSize(14);
  doc.text('Sales Summary:', 15, 90);

  doc.setFontSize(12);
  doc.text(`Sell ID: ${totals.sellId}`, 15, 100);
  doc.text(`Total Sells (LKR): ${totals.totalSell}`, 15, 110);
  doc.text(`Total Cost (LKR): ${totals.totalCost}`, 15, 120);
  doc.text(`Total Profit (LKR): ${totals.totalProfit}`, 15, 130);
  doc.text(`Total Loss (LKR): ${totals.totalLoss}`, 15, 140);
  doc.text(`Total Items Count: ${totals.totalItemsCount}`, 15, 150);

  // Footer
  doc.setFontSize(10);
  doc.text(`Signature: ____________________________`, 15, 170);
  doc.text(`Checked Date: ${new Date().toLocaleDateString()}`, 15, 180);

  // Download the PDF
  doc.save('Daily_Sales_Report.pdf');
};

export default downloadReport;
