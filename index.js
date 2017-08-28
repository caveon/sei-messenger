/**
 * Sends a message to Caveon Secure Exam Interface
 * @param {string} [origin = https://sei.caveon.com] - origin of the message destination
 * @param {string} [responseId = query parameter: 'sei_response_id'] - response id passed from SEI
 * @return {null} null
 */

var SeiMessenger = function(origin, responseId) {

  var self = this;

  self.init = function(){
    self.seiOrigin = origin || 'https://sei.caveon.com';
    self.seiQueryParamName = 'sei_response_id';
    self.maxPingAttempts = 10;
    self.numPingAttempts = 0;
    self.seiWindow = window.parent;
    self.responseId = responseId || self.getSeiResponseId();

    window.addEventListener('message', self.pong);

    self.pingTargetWindow(window);
  }

  /**
   * hears and stores the sei take window target
   * @param {object} evt - 'message' browser event
   * @return {null} null
   */
  self.pong = function(evt) {
    if(evt.data === 'pong') {
      self.seiWindow = evt.source;
    }
  }

  /**
   * Grabs the sei_response_id query parameter
   * @return {string} sei_response_id query parameter
   */
  self.getSeiResponseId = function() {
    var query = window.location.search.substring(1);
    var params = query.split('&');
    for(var i = 0, numParams = params.length; i < numParams ;i++) {
      var param = params[i].split('=');
      if(param[0] === self.seiQueryParamName) {
        return param[1];
      }
    }
    return null;
  }

  /**
   * Sends a message to the parent window recurseively so as to reach n nested windows
   * @param {object} thisWindow - current window object
   * @return {null} null
   */
  self.pingTargetWindow = function(thisWindow) {
    self.numPingAttempts++;
    thisWindow.parent.postMessage({ seiPing: true }, self.seiOrigin);
    if(self.numPingAttempts < self.maxPingAttempts) {
      self.pingTargetWindow(thisWindow.parent)
    }
  }
  /**
   * Sends the message to SEI with other necessary info
   * @param {string} message - message text
   * @param {object} [meta = null] - meta data to send along with message to SEI
   * @return {null} null
   */
  self.sendMessage = function(message, meta) {
    var meta = meta || null;
    self.seiWindow.postMessage({ message: message, response_id: self.responseId, meta: meta }, self.seiOrigin);
  }

  self.init();

}
