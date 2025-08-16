# Email_Sender
Sends curated emails from your address to many people based on templates and variable data inside Google Sheets.

Instructions
1. Open Email Sender Spreadsheet: [https://docs.google.com/spreadsheets/d/14MEVZTWE9wdsxmjOI4Y_FqaTaz6sVmGO21nqvd4QFgI/edit?gid=0#gid=0](https://docs.google.com/spreadsheets/d/1JFyUnpN1s4Cvfxn5NVnQJFx1j9f1GIRhB0etxGNw1-Q/edit?usp=sharing)
2. Make your own copy to Google Drive
3. Edit Templates in the Templates Sheet in HTML format.
Basically, you need to make any HTML type document with variable entries in <?= senderData.VARIABLE ?>
Choose VARIABLE from this list: toEmail, toName, subject, fromName, template, value1, ..., value10
4. Go to List Sheet and fill out the table with desired data (make sure to fill "toEmail" field).
5. Select any range (continuous) that contains rows with data you want to use to send emails in batches
6. Click "Send Email" button at the top.
See History Sheet updated with information about sent emails.
