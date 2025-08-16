var CONF;
function onOpen() {
  var ui = SpreadsheetApp.getUi();  //For convenience
  ui.createMenu('Send Email').addItem('Send Email','slctsender').addToUi();
}

function slctsender(){
  //Spreadsheet navigation
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  CONF = ui.alert('Confirm to Send Selected', '',ui.ButtonSet.YES_NO);//Add Alert that asks Confirm Yes or No
  if (CONF != ui.Button.YES) {
    return;//Don't execute the function if the answer is not YES
  }

  //Date
  var date = Utilities.formatDate(new Date(), "GMT+6", 'MMMM dd, yyyy [HH:mm:ss]');

  //Sheets by names
  var listSheet = ss.getSheetByName('List');
  var templatesSheet = ss.getSheetByName('Templates');
  var historySheet = ss.getSheetByName('History');

  //Email contents
  var senderData = senderClass();

  var range =  listSheet.getActiveRange();//Gets active range

  //Main for loop that sends emails for every row in the Tutors Active Sheet
  for(var i=0; i<range.getNumRows();i++){
    //Transfers data from row to an array named 'data'
    var data = listSheet.getRange(range.getRow()+i, 1, 1, listSheet.getLastColumn()).getValues()[0];
    senderData.toEmail=   data[0];
    senderData.toName=    data[1];
    senderData.subject=   data[2];
    senderData.fromName=  data[3];
    senderData.template=  data[4];
    senderData.value1=    data[5];
    senderData.value2=    data[6];
    senderData.value3=    data[7];
    senderData.value4=    data[8];
    senderData.value5=    data[9];
    senderData.value6=    data[10];
    senderData.value7=    data[11];
    senderData.value8=    data[12];
    senderData.value9=    data[13];
    senderData.value10=   data[14];

    senderData.template=  templatesSheet.getRange(senderData.template,2).getValue();
    var temp = HtmlService.createTemplate(senderData.template);
    temp.senderData=senderData;
    var message = temp.evaluate().getContent();
    
    MailApp.sendEmail({ 
    to: senderData.toEmail
    , subject: senderData.subject
    , htmlBody: message
    
    });
    //Emails History
    historySheet.getRange(historySheet.getLastRow()+1,1).setValue(senderData.toEmail);
    historySheet.getRange(historySheet.getLastRow(),2).setValue(senderData.toName);
    historySheet.getRange(historySheet.getLastRow(),3).setValue(senderData.subject);
    historySheet.getRange(historySheet.getLastRow(),4).setValue(senderData.fromEmail);
    historySheet.getRange(historySheet.getLastRow(),5).setValue(date);
  }
  return;
}

function senderClass(){
  var senderData = {//senderClassData class
      toEmail : null 
    , toName: null
    , subject: null
    , fromName: null
    , template: null
    , value1: null
    , value2: null
    , value3: null
    , value4: null
    , value5: null
    , value6: null
    , value7: null
    , value8: null
    , value9: null
    , value10: null  
    , fromEmail: Session.getActiveUser().getEmail()
  }; 
  return senderData;
}
