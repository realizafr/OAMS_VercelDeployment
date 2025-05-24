import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './paymentInformation.css';
import gcashLogo from './assets/gcash.png';
import paymayaLogo from './assets/paymaya.png';
import bankLogo from './assets/bank.jpg';

function PaymentInformation() {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [history, setHistory] = useState([]);
  const applicationId = localStorage.getItem('application_id');

  useEffect(() => {
    fetch('http://localhost:5000/payment/methods')
      .then(res => res.json())
      .then(setMethods)
      .catch(() => setStatus('Unable to connect to payment server.'));

    // Fetch payment history
    if (applicationId) {
      fetch(`http://localhost:5000/payment/history/${applicationId}`)
        .then(res => res.json())
        .then(data => {
          setHistory(Array.isArray(data) ? data : []);
        })
        .catch(() => setHistory([]));
    }
  }, [applicationId]);

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
    setScreenshotUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    if (!selectedMethod || !reference || !amount) {
      setStatus('Please fill in all fields.');
      return;
    }
    try {
      // Submit payment details first
      const res = await fetch('http://localhost:5000/payment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id: applicationId,
          method: selectedMethod,
          reference_number: reference,
          amount
        })
      });
      const data = await res.json();
      setStatus(data.message || data.error);

      // Only upload screenshot if payment submission succeeded and screenshot is present
      if (res.ok && screenshot) {
        const formData = new FormData();
        formData.append('application_id', applicationId);
        formData.append('screenshot', screenshot);
        const uploadRes = await fetch('http://localhost:5000/payment/upload-screenshot', {
          method: 'POST',
          body: formData
        });
        if (uploadRes.ok) {
          setStatus(prev => prev + ', Screenshot Uploaded successfully.');
        } else {
          setStatus(prev => prev + ', but screenshot upload failed.');
        }
      }

      // Refresh payment history after submission
      if (applicationId) {
        fetch(`http://localhost:5000/payment/history/${applicationId}`)
          .then(res => res.json())
          .then(data => {
            setHistory(Array.isArray(data) ? data : []);
          })
          .catch(() => setHistory([]));
      }
    } catch (err) {
      setStatus('Failed to connect to server. Please try again later.');
    }
  };

  // Icon selection based on method type
  const getMethodIcon = (type) => {
    switch (type) {
      case 'GCash':
        return <img src={gcashLogo} alt="GCash" className="gcash-icon" />;
      case 'PayMaya':
        return <img src={paymayaLogo} alt="PayMaya Logo" className="method-icon" />;
      case 'Bank Transfer':
        return <img src={bankLogo} alt="Bank Logo" className="bank-icon" />;
      default:
        return <span role="img" aria-label="Payment" className="method-icon">💳</span>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="payment-container">
        <h2>Payment Information</h2>
        <div className="payment-card">
          <div className="payment-header">
            <div>
              <strong>Application Fee:</strong> ₱1,000.00
            </div>
            <span className="payment-status unpaid">Unpaid</span>
          </div>
          <h3>Payment Methods</h3>
          <div className="payment-methods">
            {methods.map((m, idx) => (
              <div
                key={idx}
                className={`payment-method ${selectedMethod === m.type ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedMethod(m.type);
                  setAmount(m.details.amount);
                }}
              >
                <div className="payment-method-title">
                  {getMethodIcon(m.type)}
                  {m.type}
                </div>
                <div className="payment-method-details">
                  {m.type === 'GCash' || m.type === 'PayMaya' ? (
                    <ul>
                      <li>Send money to: {m.details.number}</li>
                      <li>Account Name: {m.details.accountName}</li>
                      <li>Enter the amount: ₱{m.details.amount.toLocaleString()}</li>
                      <li>{m.details.instructions}</li>
                    </ul>
                  ) : (
                    <ul>
                      <li>Bank: {m.details.bank}</li>
                      <li>Account Name: {m.details.accountName}</li>
                      <li>Account Number: {m.details.accountNumber}</li>
                      <li>Amount: ₱{m.details.amount.toLocaleString()}</li>
                      <li>{m.details.instructions}</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="payment-warning">
            <strong>Important</strong>
            <br />
            After making your payment, please submit the payment details below. Your application status will be updated once your payment is verified.
          </div>
          <form className="payment-form" onSubmit={handleSubmit}>
            <label>
              Payment Method:
              <select value={selectedMethod} onChange={e => setSelectedMethod(e.target.value)}>
                <option value="">Select Method</option>
                {methods.map((m, idx) => (
                  <option key={idx} value={m.type}>{m.type}</option>
                ))}
              </select>
            </label>
            <label>
              Reference Number:
              <input
                type="text"
                value={reference}
                onChange={e => setReference(e.target.value)}
                placeholder="Enter reference number"
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="1000"
              />
            </label>
            <label>
              Payment Screenshot:
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
              />
            </label>
            {screenshotUrl && (
              <div className="payment-screenshot-preview">
                <img src={screenshotUrl} alt="Screenshot Preview" />
              </div>
            )}
            <button type="submit">Submit Payment</button>
          </form>
          {status && <div className="payment-status-message">{status}</div>}
        </div>

        <h3 style={{marginTop: 32}}>Payment History</h3>
        <div className="payment-history">
          {Array.isArray(history) && history.length === 0 ? (
            <div>No payment history found.</div>
          ) : (
            Array.isArray(history) && (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Reference #</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td>{new Date(item.created_at).toLocaleString()}</td>
                      <td>{item.method}</td>
                      <td>{item.reference_number}</td>
                      <td>₱{Number(item.amount).toLocaleString()}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentInformation;