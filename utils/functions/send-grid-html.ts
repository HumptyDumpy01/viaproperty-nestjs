export function sendGridHtml(title: string, heading: string, children: string) {
  const SEND_GRID_HTML = `
         <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .email-header {
      background: #ff1102;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
    }
    .email-body h2 {
      font-size: 20px;
      margin-top: 0;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
    }
    .email-footer {
      background: #f1f1f1;
      padding: 10px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin: 10px 0;
      background: #ff1102;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .button:hover {
      background: #e71a0d;
    }
  </style>
</head>
<body style="font-family: 'Montserrat' sans-serif">
  <div class="email-container">
    <div class="email-header">
      <h1>Viaproperty</h1>
    </div>
    <div class="email-body">
      <h2>${heading}</h2>
      <div>
        ${children}
      </div>
    </div>
    <div class="email-footer">
      <p>&copy; ${new Date().getFullYear()} Nikolas Tuz PET Project - Viaproperty. All rights reserved.</p>
      <p>Want to build something great? <a href="https://www.linkedin.com/in/nikolas-tuz-037a432b3/">Let's talk!</a></p>
    </div>
  </div>
</body>
</html>
          `;
  return SEND_GRID_HTML;
}
