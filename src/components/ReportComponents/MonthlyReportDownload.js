import jsPDF from "jspdf";
import "jspdf-autotable";

const downloadMonthlyReport = (totals, selectedMonth, logo, isPrint = false) => {
  const doc = new jsPDF();

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

  doc.setFontSize(18);
  doc.setFont("Helvetica", "bold"); 
  doc.setTextColor(0, 0, 0);
  doc.text(
    "Monthly Sales Summary Report - Aconex Computers",
    doc.internal.pageSize.getWidth() / 2,
    40,
    { align: "center" }
  );

  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Date: ${selectedMonth}`, 15, 50, { align: "left" });

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

  doc.setFontSize(10);
  doc.setFont("Helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  const finalY = doc.internal.pageSize.getHeight() - 30;
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const checkedDateText = `Checked Date: ${new Date().toLocaleDateString()}`;
  const textWidth = doc.getTextWidth(checkedDateText);

  doc.text("Signature: ____________________________", 15, finalY + 20);
  doc.text(checkedDateText, pageWidth - textWidth - 15, finalY + 20);

  if (isPrint) {
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  } else {
    doc.save(`${selectedMonth}_Monthly_Sales_Report.pdf`);
  }
};

export default downloadMonthlyReport;
