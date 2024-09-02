import logo from  '../../../images/icon.jpg'
const printBill = (invoiceNo, cashier, date, paymentMethod, billItems, total, tendered, balance,customerName,disc) => {
    // Validate and escape inputs to prevent HTML injection
    const escapeHtml = (unsafe) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };
  
    const formatCurrency = (amount) => {
      if (typeof amount === 'number') {
          return `Rs ${amount.toFixed(2)}`;
      } else {
          return 'Invalid amount';
      }
  };

  // Convert tendered amount to a number if it's not already
  tendered = Number(tendered);
  tendered = parseFloat(tendered) || 0;
  disc = parseFloat(disc) || 0;
    
    // Construct the bill content
    let billContent = `
      <html>
        <head>
          <title>Bill</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5; /* Background color for the whole print */
              color: #333;
            }
            .bill-container {
              background-color: #fff; /* Background color for the bill container */
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ccc;
              max-width: 700px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .bill-header {
              text-align: center;
              margin-bottom: 20px;

            }
            .bill-header img {
              max-width: 100px;
              margin-bottom: 10px;
            }
            .bill-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              fontSize: 12 ;
            }
            .bill-info span {
              display: block;
            }
            .bill-items {
              margin-bottom: 20px;
            }
            .bill-total {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                fontSize: 12 ;
            }
            .bill-footer {
              text-align: center;
              margin-top: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                table-layout: fixed;
                word-wrap: break-word;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
                background-color: rgb(11, 2, 51);
                color: aliceblue;                
            }
            th:nth-child(1),
            td:nth-child(1) {
            width: 35%;
            }
                th:nth-child(2),
                td:nth-child(2) {
                width: 10%;
            }
                th:nth-child(4),
                td:nth-child(4) {
                width: 10%;
            }
                        
          </style>
        </head>
        <body>
          <div class="bill-container">
            <div class="bill-header">
              <img src="${logo}" alt="Acconex Computers Logo">
              <h1>Acconex Computers</h1>
              <p style={{ textAlign: 'center', fontSize: 11 }} >124/1/1, Anagarika Dharmapala MW, Matara </p>
              <p>Mob; 071-7314099.</p>
              <hr>
            </div>
            <div class="bill-info">
              <span>Invoice No:</span><span>${escapeHtml(invoiceNo)}</span>
            </div>
            <div class="bill-info">
              <span>Cashier:</span><span>${escapeHtml(cashier)}</span>
            </div>
            <div class="bill-info">
              <span>Date:</span><span>${escapeHtml(date)}</span>
            </div>
            <div class="bill-info">
              <span>Payment Method:</span><span>${escapeHtml(paymentMethod)}</span>
            </div>
            <br/><hr><br/>
            <div class="bill-items">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style={{ width: '20px' }}>Qnt</th>
                    <th>Price</th>
                    <th style={{ width: '30px' }}>Dis</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${billItems.map(item => `
                    <tr>
                      <td>${escapeHtml(item.product)}</td>
                      <td>${escapeHtml(item.quantity.toString())}</td>
                      <td>${formatCurrency(item.price)}</td>
                      <td>${(item.discount) || 0}</td>
                      <td>${formatCurrency((item.price * item.quantity) - item.discount)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <br/><hr><br/>
            <div class="bill-total">
              <span>Total:</span><span> ${formatCurrency(total)}</span>
            </div>
            <div class="bill-total">
              <span>Discount:</span><span> ${formatCurrency(disc)}</span>
            </div>
            <div class="bill-total">
              <span>Tendered:</span><span> ${formatCurrency(tendered)}</span>
            </div>
            <div class="bill-total">
            <span>Balance:</span><span>  ${formatCurrency(balance)}</span>
          </div>
            <div class="bill-footer">
            <p>Thank You Ms/Mr ${customerName ? `, ${escapeHtml(customerName)}` : ''}! Come Again.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  
    // Open the print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(billContent);
    printWindow.document.close();
    printWindow.print();

  };
  
  export default printBill;
  