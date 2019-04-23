// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
var https = require( 'https' );

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to FIRST Updates Now For Alexa! What team would you like to know more about?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const FallbackIntentRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'
    },
    handle(handlerInput) {
        const speechText = 'Sorry, I dont understand. Try asking about a specific team number.';
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
function httpGet() {
  return new Promise(((resolve, reject) => {
    const X_TBA_AUTH_KEY_init = '?X-TBA-Auth-Key=';
    const X_TBA_AUTH_KEY = 'PUT YOUR AUTH KEY HERE';
    const teamKey = 'frc' + global.teamNumber;
    var url = 'https://www.thebluealliance.com/api/v3/team/' + teamKey + X_TBA_AUTH_KEY_init + X_TBA_AUTH_KEY;
    
    const getInfo = https.get(url, (response) => {
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
          resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    getInfo.end();
  }));
}
function httpGetExtras() {
  return new Promise(((resolve, reject) => {
    const X_TBA_AUTH_KEY_init = '?X-TBA-Auth-Key=';
    const X_TBA_AUTH_KEY = 'PUT YOUR AUTH KEY HERE';
    const teamKey = 'frc' + global.teamNumber;
    var url = 'https://www.thebluealliance.com/api/v3/team/' + teamKey + global.extras + X_TBA_AUTH_KEY_init + X_TBA_AUTH_KEY;
    
    const getInfo = https.get(url, (response) => {
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    getInfo.end();
  }));
}
function httpGetEvents(eventKey) {
  return new Promise(((resolve, reject) => {
    const X_TBA_AUTH_KEY_init = '?X-TBA-Auth-Key=';
    const X_TBA_AUTH_KEY = 'PUT YOUR AUTH KEY HERE';
    var url = 'https://www.thebluealliance.com/api/v3/event/' + eventKey + '/simple' + X_TBA_AUTH_KEY_init + X_TBA_AUTH_KEY;
    
    const getInfo = https.get(url, (response) => {
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    getInfo.end();
  }));
}
const GetteamLocationNocontextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamLocationNocontext'
                && (handlerInput.requestEnvelope.request.intent.slots.numberslot.value !== null || global.teamNumber !== undefined);
    },
    async handle(handlerInput) {
        global.teamNumber = handlerInput.requestEnvelope.request.intent.slots.numberslot.value;
        const response = await httpGet();
        console.log(response);
        var city = response.city;
        console.log(response.city);
        var state_prov = response.state_prov;
        console.log(response.state_prov);
        var speechText = 'Team ' + global.teamNumber + ' is from ' + city + ', ' + state_prov + '.';
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const GetteamLocationContextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamLocationContext';
    },
    async handle(handlerInput) {
        if(global.teamNumber !== undefined){
            const response = await httpGet();
            console.log(response);
            var city = response.city;
            console.log(response.city);
            var state_prov = response.state_prov;
            console.log(response.state_prov);
        } else {
            return handlerInput.responseBuilder
            .speak('Sorry, what team number would you like to know the location of?')
            .reprompt('Sorry, what team number would you like to know the location of?')
            .getResponse();
        }
        var speechText = 'Team ' + global.teamNumber + ' is from ' + city + ', ' + state_prov + '.';
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const GetteamRookieyearNocontextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamRookieyearNocontext'
                && (handlerInput.requestEnvelope.request.intent.slots.numberslot.value !== null || global.teamNumber !== undefined);
    },
    async handle(handlerInput) {
        global.teamNumber = handlerInput.requestEnvelope.request.intent.slots.numberslot.value;
        const response = await httpGet();
        console.log(response);
        var rookie_year = response.rookie_year;
        console.log(response.rookie_year);
        var speechText = 'Team ' + global.teamNumber + '\'s rookie year was ' + rookie_year + '.';
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const GetteamRookieyearContextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamRookieyearContext';
    },
    async handle(handlerInput) {
        if(global.teamNumber !== undefined){
            const response = await httpGet();
            console.log(response);
            var rookie_year = response.rookie_year;
            console.log(response.rookie_year);
        } else {
            return handlerInput.responseBuilder
            .speak('Sorry, what team number\'s rookie year would you like to know?')
            .reprompt('Sorry, what team number\'s rookie year would you like to know?')
            .getResponse();
        }
        var speechText = 'Team ' + global.teamNumber + '\'s rookie year was ' + rookie_year + '.';
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const GetteamNextmatchNocontextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamNextmatchNocontext'
                && (handlerInput.requestEnvelope.request.intent.slots.numberslot.value !== null || global.teamNumber !== undefined);
    },
    async handle(handlerInput) {
        global.teamNumber = handlerInput.requestEnvelope.request.intent.slots.numberslot.value;
        var year = new Date().getFullYear();
        console.log(year);
        global.extras = '/events/' + year + '/keys';
        const eventKeys = await httpGetExtras();
        console.log(eventKeys);
        var eventsToSort = [];
        for(var i = 0; i < eventKeys.length; i++) {
            var nextMatch = eventKeys[i];
            console.log(nextMatch);
            const event = await httpGetEvents(nextMatch);
            var event_start = event.start_date;
            event_start = event_start.replace(/-/g, '');
            var event_name = event.name;
            if(nextMatch.includes(null) === false){
                var continueOn = 'true';
            } else {
                continueOn = 'false';
            }
            var eventToAdd = {EventDate : event_start, ID : nextMatch, ContinueOn : continueOn};
            eventsToSort.push(eventToAdd);
        }
        var z = 0;
        eventsToSort = eventsToSort.filter(ContinueOn => 'true');
        console.log(JSON.stringify(eventsToSort));
        if(eventsToSort.length > 0){
            console.log('unsorted: ' + JSON.stringify(eventsToSort));
            eventsToSort= eventsToSort.sort((a, b) => b.EventDate.localeCompare(a.EventDate));
            console.log('sorted: ' + JSON.stringify(eventsToSort));
            for(var i = 0; i < eventsToSort.length; i++) {                console.log(eventsToSort[i].EventDate.toString());
                var DateEvent = eventsToSort[i].EventDate.toString();
                DateEvent = DateEvent.slice(0,4) + '-' + DateEvent.slice(4,6) + '-' + DateEvent.slice(6);
                console.log(DateEvent);
                if((Date.parse(DateEvent) - Date.now()) < 0){
                    console.log('already passed');
                    z++;
                } else {
                    const event = await httpGetEvents(nextMatch);
                    var event_name = event.name;
                    break;
                }
            }
        }
        var speechText = 'Team ' + global.teamNumber + ' will be competing next at the ' + event_name + '.';
        if(z === eventsToSort.length){
            speechText = 'Team ' + global.teamNumber + ' has no more upcoming events they are registered to for this season.'
        }
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const GetteamNextmatchContextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamNextmatchContext';
    },
    async handle(handlerInput) {
        if(global.teamNumber !== undefined){
            var year = new Date().getFullYear();
            console.log(year);
            global.extras = '/events/' + year + '/keys';
            const eventKeys = await httpGetExtras();
            console.log(eventKeys);
            var eventsToSort = [];
            for(var i = 0; i < eventKeys.length; i++) {
                var nextMatch = eventKeys[i];
                console.log(nextMatch);
                const event = await httpGetEvents(nextMatch);
                var event_start = event.start_date;
                event_start = event_start.replace(/-/g, '');
                var event_name = event.name;
                if(nextMatch.includes(null) === false){
                    var continueOn = 'true';
                } else {
                    continueOn = 'false';
                }
                var eventToAdd = {EventDate : event_start, ID : nextMatch, ContinueOn : continueOn};
                eventsToSort.push(eventToAdd);
            }
            var z = 0;
            eventsToSort = eventsToSort.filter(ContinueOn => 'true');
            console.log(JSON.stringify(eventsToSort));
            if(eventsToSort.length > 0){
                console.log('unsorted: ' + JSON.stringify(eventsToSort));
                eventsToSort= eventsToSort.sort((a, b) => b.EventDate.localeCompare(a.EventDate));
                console.log('sorted: ' + JSON.stringify(eventsToSort));
                for(var i = 0; i < eventsToSort.length; i++) {
                    console.log(eventsToSort[i].EventDate.toString());
                    var DateEvent = eventsToSort[i].EventDate.toString();
                    DateEvent = DateEvent.slice(0,4) + '-' + DateEvent.slice(4,6) + '-' + DateEvent.slice(6);
                    console.log(DateEvent);
                    if((Date.parse(DateEvent) - Date.now()) < 0){
                        console.log('already passed');
                        z++;
                    } else {
                        const event = await httpGetEvents(nextMatch);
                        var event_name = event.name;
                        break;
                    }
                }
            }
        } else {
            return handlerInput.responseBuilder
            .speak('Sorry, what team number\'s next match would you like to know?')
            .reprompt('Sorry, what team number\'s next match would you like to know?')
            .getResponse();
        }
        var speechText = 'Team ' + global.teamNumber + ' will be competing next at the ' + event_name + '.';
        if(z === eventsToSort.length){
            speechText = 'Team ' + global.teamNumber + ' has no more upcoming events they are registered to for this season.'
        }
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const GetteamGenericNocontextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamGenericNocontext';
    },
    handle(handlerInput) {
        global.teamNumber = handlerInput.requestEnvelope.request.intent.slots.numberslot.value;
        if(global.teamNumber !== undefined){
            const speechText = 'What would you like to know about team ' + global.teamNumber + '?';
            return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
        }
        const speechText = 'Okay, what other team would you like to know about?'
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const GetteamStatusNocontextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamStatusNocontext'
                && (handlerInput.requestEnvelope.request.intent.slots.numberslot.value !== null || global.teamNumber !== undefined);
    },
    async handle(handlerInput) {
        global.teamNumber = handlerInput.requestEnvelope.request.intent.slots.numberslot.value;
        var year = new Date().getFullYear();
        console.log(year);
        global.extras = '/events/keys';
        var eventKeys = await httpGetExtras();
        var eventsToSort = [];
        for(var i = eventKeys.length-1; i >= 0; i--) {
            var nextMatch = eventKeys[i];
            if(nextMatch.startsWith(year)){
                console.log(nextMatch);
                const event = await httpGetEvents(nextMatch);
                var event_start = event.start_date;
                event_start = event_start.replace(/-/g, '');
                var event_name = event.name;
                if(nextMatch.includes(null) === false){
                    var continueOn = 'true';
                } else {
                    continueOn = 'false';
                }
                var eventToAdd = {EventDate : event_start, ID : nextMatch, ContinueOn : continueOn};
                eventsToSort.push(eventToAdd);
            }
        }
        eventsToSort = eventsToSort.filter(ContinueOn => 'true');
        console.log(JSON.stringify(eventsToSort));
        if(eventsToSort.length > 0){
            console.log('unsorted: ' + JSON.stringify(eventsToSort));
            eventsToSort= eventsToSort.sort((a, b) => b.EventDate.localeCompare(a.EventDate));
            console.log('sorted: ' + JSON.stringify(eventsToSort));
            var nextEvent = eventsToSort[0].ID.toString();
            console.log(eventsToSort[0].ID.toString());
            const event = await httpGetEvents(nextEvent);
            event_name = event.name;
            global.extras = '/events/' + year + '/statuses';
            const statuses = await httpGetExtras();
            console.log(statuses);
            var overall_status_str = JSON.stringify(statuses);
            console.log(overall_status_str);
            overall_status_str = overall_status_str.slice(overall_status_str.indexOf(nextEvent), overall_status_str.length);
            overall_status_str = overall_status_str.slice(overall_status_str.indexOf(nextEvent), overall_status_str.indexOf(eventsToSort[1].ID.toString()))
            console.log('sliced and diced: ' + overall_status_str);
            overall_status_str = overall_status_str.substring(overall_status_str.indexOf('overall_status_str'), overall_status_str.indexOf('playoff":'));
            console.log(overall_status_str);
            console.log('first replace: ' + overall_status_str);
            overall_status_str = overall_status_str.replace(/<b>/gi, '');
            console.log('second replace: ' + overall_status_str);
            overall_status_str = overall_status_str.replace(/<\/b>/gi, '');
            console.log('third replace: ' + overall_status_str);
            overall_status_str = overall_status_str.replace(/.", "playoff": {.*/gi, '.');
            console.log('fourth replace: ' + overall_status_str);
            overall_status_str = overall_status_str.replace(/overall_status_str/gi, '');
            overall_status_str = overall_status_str.replace(/","/gi, '');
            overall_status_str = overall_status_str.replace(/"/gi, '');
            overall_status_str = overall_status_str.replace(/:/gi, '');
            overall_status_str = overall_status_str.replace(/\//, ' out of ');
            overall_status_str = overall_status_str.replace(/quals/, 'the qualifiers');
            overall_status_str = overall_status_str.replace(/-/, ' wins ');
            overall_status_str = overall_status_str.replace(/-/, ' losses and ');
            console.log('many replace later: ' + overall_status_str);
            overall_status_str = overall_status_str.slice(0, -1);
            if(overall_status_str.includes('qualifiers') !== true) {
                overall_status_str = overall_status_str + ' ties at the ' + event_name + '.';
            } else {
                overall_status_str = overall_status_str.replace(' in the qualifiers ', ' ties in the qualifiers at the ') + event_name + '.';
            }
            console.log('final: ' + overall_status_str);
            var speechText = overall_status_str;
            if(speechText.replace(' ties at the ' + event_name + '.', '') === '' || speechText.replace(' ties in the qualifiers at the ' + event_name + '.', '') === ''){
                speechText = 'Team ' + global.teamNumber + ' is not currently competing.'
            } else {
                speechText = 'Team ' + global.teamNumber + ' is not currently competing.'
            }
        }
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const GetteamStatusContextRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetteamStatusContext';
    },
    async handle(handlerInput) {
        if(global.teamNumber !== undefined){
            var year = new Date().getFullYear();
            console.log(year);
            global.extras = '/events/keys';
            var eventKeys = await httpGetExtras();
            var eventsToSort = [];
            for(var i = eventKeys.length-1; i >= 0; i--) {
                var nextMatch = eventKeys[i];
                if(nextMatch.startsWith(year)){
                    console.log(nextMatch);
                    const event = await httpGetEvents(nextMatch);
                    var event_start = event.start_date;
                    event_start = event_start.replace(/-/g, '');
                    var event_name = event.name;
                    if(nextMatch.includes(null) === false){
                        var continueOn = 'true';
                    } else {
                        continueOn = 'false';
                    }
                    var eventToAdd = {EventDate : event_start, ID : nextMatch, ContinueOn : continueOn};
                    eventsToSort.push(eventToAdd);
                }
            }
            eventsToSort = eventsToSort.filter(ContinueOn => 'true');
            console.log(JSON.stringify(eventsToSort));
            if(eventsToSort.length > 0){
                console.log('unsorted: ' + JSON.stringify(eventsToSort));
                eventsToSort= eventsToSort.sort((a, b) => b.EventDate.localeCompare(a.EventDate));
                console.log('sorted: ' + JSON.stringify(eventsToSort));
                var nextEvent = eventsToSort[0].ID.toString();
                console.log(eventsToSort[0].ID.toString());
                const event = await httpGetEvents(nextEvent);
                event_name = event.name;
                global.extras = '/events/' + year + '/statuses';
                const statuses = await httpGetExtras();
                console.log(statuses);
                var overall_status_str = JSON.stringify(statuses);
                console.log(overall_status_str);
                overall_status_str = overall_status_str.slice(overall_status_str.indexOf(nextEvent), overall_status_str.length);
                overall_status_str = overall_status_str.slice(overall_status_str.indexOf(nextEvent), overall_status_str.indexOf(eventsToSort[1].ID.toString()))
                console.log('sliced and diced: ' + overall_status_str);
                overall_status_str = overall_status_str.substring(overall_status_str.indexOf('overall_status_str'), overall_status_str.indexOf('playoff":'));
                console.log(overall_status_str);
                console.log('first replace: ' + overall_status_str);
                overall_status_str = overall_status_str.replace(/<b>/gi, '');
                console.log('second replace: ' + overall_status_str);
                overall_status_str = overall_status_str.replace(/<\/b>/gi, '');
                console.log('third replace: ' + overall_status_str);
                overall_status_str = overall_status_str.replace(/.", "playoff": {.*/gi, '.');
                console.log('fourth replace: ' + overall_status_str);
                overall_status_str = overall_status_str.replace(/overall_status_str/gi, '');
                overall_status_str = overall_status_str.replace(/","/gi, '');
                overall_status_str = overall_status_str.replace(/"/gi, '');
                overall_status_str = overall_status_str.replace(/:/gi, '');
                overall_status_str = overall_status_str.replace(/\//, ' out of ');
                overall_status_str = overall_status_str.replace(/quals/, 'the qualifiers');
                overall_status_str = overall_status_str.replace(/-/, ' wins ');
            overall_status_str = overall_status_str.replace(/-/, ' losses and ');
                console.log('many replace later: ' + overall_status_str);
                overall_status_str = overall_status_str.slice(0, -1);
                if(overall_status_str.includes('qualifiers') !== true) {
                    overall_status_str = overall_status_str + ' ties at the ' + event_name + '.';
                } else {
                    overall_status_str = overall_status_str.replace(' in the qualifiers ', ' ties in the qualifiers at the ') + event_name + '.';
                }
                console.log('final: ' + overall_status_str);
                var speechText = overall_status_str;
                if(speechText.replace(' ties at the ' + event_name + '.', '') === '' || speechText.replace(' ties in the qualifiers at the ' + event_name + '.', '') === ''){
                    speechText = 'Team ' + global.teamNumber + ' is not currently competing.'
                } else {
                    speechText = 'Team ' + global.teamNumber + ' is not currently competing.'
                }
            } else {
                return handlerInput.responseBuilder
                .speak('Sorry, what team number\'s status would you like to know?')
                .reprompt('Sorry, what team number\'s status would you like to know?')
                .getResponse();
            }
        }
        return handlerInput.responseBuilder
        .speak(speechText + ' Would you like to know more about ' + global.teamNumber + ' or another team?')
        .reprompt('Would you like to know more about ' + global.teamNumber + ' or another team?')
        .getResponse();
    },
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'I am an assistant for FIRST Updates Now to help you get information about the FIRST Robotics Competition, a global high school robotics competition. What team would you like to know more about?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'I hope I was able to help. See you next time!';
        return handlerInput.responseBuilder
            .speak(speechText);
    },
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    },
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    },
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FallbackIntentRequestHandler,
        GetteamLocationNocontextRequestHandler,
        GetteamLocationContextRequestHandler,
        GetteamRookieyearNocontextRequestHandler,
        GetteamRookieyearContextRequestHandler,
        GetteamNextmatchNocontextRequestHandler,
        GetteamNextmatchContextRequestHandler,
        GetteamGenericNocontextRequestHandler,
        GetteamStatusNocontextRequestHandler,
        GetteamStatusContextRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
