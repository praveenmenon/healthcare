'use strict';
var alexa = require('alexa-app'); //require alexa app

module.change_code = 1;  // Allow this module to be reloaded by hotswap when changed
var app = new alexa.app('HealthCare');

app.launch(function(req,res){
  var prompt = "Welcome. Let's get started. Are you a registered member of DocDock?"
 res.say(prompt).reprompt(prompt).shouldEndSession(false); 
});

 app.intent('RegisterIntent', {
    "slots":{"INPUT":"LITERAL"},
    'utterances':['{Yes, I am registered|INPUT}']
  },
  
  function(req,res) {
    var status = req.slot('INPUT')
    console.log(status)
    if (status == 'Yes, I am registered'){
      res.say('Great! Please tell me your login pin to authorize your account')
    }
    else {
        var prompt = ' I did not understand. please tell me again';
      res.say(prompt).reprompt(prompt).shouldEndSession(false);
      return true;
    }
  }
);
// ********************************************
app.intent('verifyLoginPin', {
  'slots': {
    'Digits':'AMAZON.FOUR_DIGIT_NUMBER'
  },'utterances':['{my pin is|Digits}']
  },function(req, res) {
   var pinSlot = req.slot('Digits')
   const pin = '1234'
    if (pinSlot == pin) {
    res.say('Hi John Smith. You have an appointment scheduled with your Primary Care Physician Dr. Richard Abrams. How may I help you?')
    }
    else
    {
      res.say("your login pin is wrong.tell me your correct login pin")
    }
     });   
    
// ****************************************
app.intent('appointment',{
  'slots': {
    'Status':'LITERAL',
    'Number':'AMAZON.NUMBER'
  },
  'utterances': ['{Can I know the appointment details please|Status}',
  '{Sure set a reminder one day prior to the appointment date|Status}',
    '{Yes please|Status}',
    '{Send the details to the number|Number}',
    '{Yes that is correct|Status}',
     '{No Thanks|Status}'
    ]
  },function(req,res){
    var status = req.slot('Status')
    console.log(status)
    switch(status){
    case 'Can I know the appointment details please':
    var prompt = "Sure, it seems that you have an appointment scheduled with Dr. Abrams on 25th of January at 4:30 PM. Do you want me to send a reminder to you?"
    res.say(prompt);
    break;
   case 'Sure set a reminder one day prior to the appointment date':
       res.say("Your reminder is set please check your Google calendar. Do you want me send you the appointment details to your mobile?")
      break;
    case 'Yes please':
        res.say("Do you want me to send the appointment details to the number 415 555 2671 or to another number Mr. Smith?")  
      break;
     case 'Send the details to the number 415 666 1425': 
        res.say("Let me confirm the number 415 666 1425 is correct, Mr. Smith.")
        break;
     case 'Yes that is correct':
         res.say("Thanks for the confirmation, I have sent you the appointment details to the provided mobile number. Is there anything that I can help you with Mr. Smith.")
         break;
     case 'No Thanks':
       res.say("It was nice talking to you Mr. Smith. Good Day.")    
      default:
           res.say("I, dont understand,come again")
      }
  });


module.exports = app;