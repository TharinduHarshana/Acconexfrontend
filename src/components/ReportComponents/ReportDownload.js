import jsPDF from "jspdf";
import "jspdf-autotable";

const downloadReport = (totals, selectedDate, logo, isPrint = false) => {
  const doc = new jsPDF();

  // Add Logo at the top center
  const img = new Image();
  img.src = logo;
  doc.addImage(
    img,
    "PNG",
    doc.internal.pageSize.getWidth() / 2 - 25,
    10,
    50,
    20
  );

  // Report Header
  doc.setFontSize(18);
  doc.setFont("Helvetica", "bold"); // Make the title bold
  doc.setTextColor(0, 0, 0);
  doc.text(
    "Daily Sales Summary Report - Aconex Computers",
    doc.internal.pageSize.getWidth() / 2,
    40,
    { align: "center" }
  );

  // Date
  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Date: ${selectedDate}`, 15, 50, { align: "left" });

  // Sales Summary Table
  doc.autoTable({
    startY: 75,
    head: [
      [
        "Sell ID",
        "Total Sells (LKR)",
        "Total Cost (LKR)",
        "Total Profit (LKR)",
        "Total Loss (LKR)",
        "Total Items Count",
      ],
    ],
    body: [
      [
        totals.sellId,
        totals.totalSell,
        totals.totalCost,
        totals.totalProfit,
        totals.totalLoss,
        totals.totalItemsCount,
      ],
    ],
    theme: "striped",
    headStyles: { fillColor: [11, 2, 51] },
  });

  // Footer with Signature and Date
  doc.setFontSize(10);
  doc.setFont("Helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  const finalY = doc.internal.pageSize.getHeight() - 30;
  
  // Calculate the width for alignment
  const pageWidth = doc.internal.pageSize.getWidth();
  const checkedDateText = `Checked Date: ${new Date().toLocaleDateString()}`;
  const textWidth = doc.getTextWidth(checkedDateText);

  // Signature
  doc.text("Signature: ____________________________", 15, finalY + 20);

  // Checked Date aligned to the right, same line as Signature
  doc.text(checkedDateText, pageWidth - textWidth - 15, finalY + 20);

  if (isPrint) {
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  } else {
    doc.save(`${selectedDate}_Daily_Sales_Report.pdf`);
  }
};

export default downloadReport;
