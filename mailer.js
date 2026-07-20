import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error) => {
  if (error) {
    console.log("❌ VERIFY FAILED:", error.message);
  } else {
    console.log("✅ Gmail connected! Ready to send emails.");
  }
});

// ─────────────────────────────────────────────
// EMAIL 1 → EMPLOYEE CONFIRMATION
// ─────────────────────────────────────────────
const employeeMailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; background:#f0f2f5; }
    .wrapper { max-width:660px; margin:30px auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.12); }
    .header { background: linear-gradient(135deg, #1a237e, #283593); padding:30px; text-align:center; }
    .header h1 { color:#fff; font-size:24px; letter-spacing:1px; margin-bottom:6px; }
    .header p  { color:#9fa8da; font-size:13px; }
    .greeting { padding:24px 30px 10px; }
    .greeting p { color:#444; font-size:14px; line-height:1.7; }
    .table-wrap { padding:10px 30px 24px; }
    table { width:100%; border-collapse:collapse; border-radius:8px; overflow:hidden; }
    thead tr { background:#1a237e; }
    thead th { color:#fff; padding:11px 14px; text-align:left; font-size:13px; }
    tbody tr:nth-child(even) { background:#e8eaf6; }
    tbody tr:nth-child(odd)  { background:#f5f5f5; }
    tbody td { padding:10px 14px; font-size:13px; color:#333; border-bottom:1px solid #e0e0e0; }
    tbody td:first-child { font-weight:bold; color:#1a237e; width:40px; text-align:center; }
    .badge { display:inline-block; background:#e8f5e9; color:#2e7d32; padding:6px 18px; border-radius:20px; font-size:13px; font-weight:bold; border:1px solid #a5d6a7; }
    .status-wrap { padding:0 30px 24px; }
    .footer { background: linear-gradient(135deg, #1a237e, #283593); padding:24px 30px; text-align:center; }
    .footer .co-name { color:#fff; font-size:16px; font-weight:bold; letter-spacing:1px; margin-bottom:8px; }
    .footer p { color:#9fa8da; font-size:12px; line-height:1.8; }
    .footer .divider { border:none; border-top:1px solid #3949ab; margin:12px auto; width:60%; }
    .footer .note { color:#7986cb; font-size:11px; margin-top:10px; }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <h1>🚖 Cab Booking Confirmed</h1>
    <p>Your ride has been successfully scheduled</p>
  </div>
  <div class="greeting">
    <p>Dear <strong>${data.empName}</strong>,</p>
    <p style="margin-top:10px;">
      We are pleased to confirm your cab booking with <strong>Pooja Travels</strong>.
      Please find your booking details below and keep this email for reference.
    </p>
  </div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Sr.</th><th>Details</th><th>Information</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td>  <td>Employee Name</td>           <td>${data.empName}</td></tr>
        <tr><td>2</td>  <td>Cell No.</td>                <td>${data.cellNo}</td></tr>
        <tr><td>3</td>  <td>Pick Up Address</td>         <td>${data.pickupAddress}</td></tr>
        <tr><td>4</td>  <td>Date &amp; Time of Pick Up</td><td>${data.pickupDateTime}</td></tr>
        <tr><td>5</td>  <td>Drop Address</td>            <td>${data.dropAddress}</td></tr>
        <tr><td>6</td>  <td>Date &amp; Time of Drop</td>   <td>${data.dropDateTime}</td></tr>
        <tr><td>7</td>  <td>Car Type</td>                <td>${data.carType}</td></tr>
        <tr><td>8</td>  <td>Remarks</td>                 <td>${data.remarks || 'None'}</td></tr>
      </tbody>
    </table>
  </div>
  <div class="status-wrap">
    <span class="badge">✔ Booking Confirmed</span>
    <p style="margin-top:14px; color:#666; font-size:13px;">For any changes or queries, please contact us immediately.</p>
  </div>
  <div class="footer">
    <p class="co-name">🏢 Pooja Travels Pvt. Ltd.</p>
    <hr class="divider"/>
    <p>📍 Office No. 194, Vishnu Nagar Society, L.U. Gadkari Marg, Chembur, Mumbai-400 074</p>
    <p>📞 9594917750 / 9702909087 &nbsp;|&nbsp; ✉ poojatravels111@gmail.com</p>
    <p>GSTIN: 27AICPT7468H1ZP</p>
    <p class="note">This is an auto-generated email. Please do not reply directly.</p>
  </div>
</div>
</body>
</html>`;

// ─────────────────────────────────────────────
// EMAIL 2 → ADMIN NOTIFICATION
// ─────────────────────────────────────────────
const adminMailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; background:#f0f2f5; }
    .wrapper { max-width:660px; margin:30px auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.12); }
    .header { background: linear-gradient(135deg, #e65100, #bf360c); padding:30px; text-align:center; }
    .header h1 { color:#fff; font-size:22px; letter-spacing:1px; margin-bottom:6px; }
    .header p  { color:#ffccbc; font-size:13px; }
    .body { padding:24px 30px; }
    .body p { color:#444; font-size:14px; margin-bottom:16px; line-height:1.6; }
    table { width:100%; border-collapse:collapse; }
    thead tr { background:#e65100; }
    thead th { color:#fff; padding:11px 14px; text-align:left; font-size:13px; }
    tbody tr:nth-child(even) { background:#fff3e0; }
    tbody tr:nth-child(odd)  { background:#fafafa; }
    tbody td { padding:10px 14px; font-size:13px; color:#333; border-bottom:1px solid #e0e0e0; }
    tbody td:first-child { font-weight:bold; color:#e65100; width:200px; }
    .footer { background: linear-gradient(135deg, #e65100, #bf360c); padding:24px 30px; text-align:center; }
    .footer .co-name { color:#fff; font-size:15px; font-weight:bold; margin-bottom:8px; }
    .footer p { color:#ffccbc; font-size:12px; line-height:1.8; }
    .footer .divider { border:none; border-top:1px solid #ff7043; margin:12px auto; width:60%; }
    .footer .note { color:#ffab91; font-size:11px; margin-top:10px; }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <h1>🔔 New Cab Booking Request</h1>
    <p>Please review and arrange the vehicle accordingly</p>
  </div>
  <div class="body">
    <p>A new cab booking has been submitted. Details are as follows:</p>
    <table>
      <thead>
        <tr><th>Field</th><th>Value</th></tr>
      </thead>
      <tbody>
        <tr><td>Employee Name</td>           <td>${data.empName}</td></tr>
        <tr><td>Cell No.</td>                <td>${data.cellNo}</td></tr>
        <tr><td>Employee Email</td>         <td>${data.employeeEmail}</td></tr>
        <tr><td>Pick Up Address</td>        <td>${data.pickupAddress}</td></tr>
        <tr><td>Pick Up Date &amp; Time</td><td>${data.pickupDateTime}</td></tr>
        <tr><td>Drop Address</td>           <td>${data.dropAddress}</td></tr>
        <tr><td>Drop Date &amp; Time</td>   <td>${data.dropDateTime}</td></tr>
        <tr><td>Car Type</td>                <td>${data.carType}</td></tr>
        <tr><td>Remarks</td>                 <td>${data.remarks || 'None'}</td></tr>
        <tr><td>Submitted At</td>           <td>${new Date().toLocaleString('en-IN')}</td></tr>
      </tbody>
    </table>
  </div>
  <div class="footer">
    <p class="co-name">🏢 Pooja Travels — Admin Portal</p>
    <hr class="divider"/>
    <p>📍 Office No. 194, Vishnu Nagar Society, L.U. Gadkari Marg, Chembur, Mumbai-400 074</p>
    <p>📞 9594917750 / 9702909087 &nbsp;|&nbsp; ✉ poojatravels111@gmail.com</p>
    <p class="note">Internal use only. Do not forward this email.</p>
  </div>
</div>
</body>
</html>`;

export const sendBookingEmails = async (data) => {
  // Mail 1 → Employee
  await transporter.sendMail({
    from: `"Pooja Travels" <${process.env.EMAIL_USER}>`,
    to: data.employeeEmail,
    subject: '🚖 Cab Booking Confirmed – Pooja Travels',
    html: employeeMailTemplate(data),
  });

  // Mail 2 → Admin
  await transporter.sendMail({
    from: `"Pooja Travels Booking System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Falls back to yourself if ADMIN_EMAIL isn't configured yet
    subject: `🔔 New Booking – ${data.empName} | ${data.pickupDateTime}`,
    html: adminMailTemplate(data),
  });

  console.log('✅ Both emails sent successfully');
};