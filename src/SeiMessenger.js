/**
 * Sends a message to Caveon Secure Exam Interface
 * @param {string} [origin = https://sei.caveon.com] - origin of the message destination
 * @param {string} [responseId = query parameter: 'sei_response_id'] - response id passed from SEI
 * @return {null} null
 */

class SeiMessenger {
  constructor(origin, responseId) {
    this.seiOrigin = origin || 'https://sei.caveon.com';
    this.seiQueryParamName = 'sei_response_id';
    this.maxPingAttempts = 10;
    this.numPingAttempts = 0;
    this.seiWindow = window.parent;
    this.responseId = responseId || this.getSeiResponseId();

    window.addEventListener('message', this.pong);

    this.pingTargetWindow(window);
  }

  /**
   * hears and stores the sei take window target
   * @param {object} evt - 'message' browser event
   * @return {null} null
   */
  pong = (evt) => {
    if(evt.data === 'pong') {
      this.seiWindow = evt.source;
    }
  }

  /**
   * Grabs the sei_response_id query parameter
   * @return {string} sei_response_id query parameter
   */
  getSeiResponseId = () => {
    const query = window.location.search.substring(1);
    const params = query.split('&');
    for(let i = 0, numParams = params.length; i < numParams ;i++) {
      const param = params[i].split('=');
      if(param[0] === this.seiQueryParamName) {
        return param[1];
      }
    }
    return 'no query param found';
  }

  /**
   * Sends a message to the parent window recurseively so as to reach n nested windows
   * @param {object} thisWindow - current window object
   * @return {null} null
   */
  pingTargetWindow = thisWindow => {
    thisWindow.parent.postMessage({ seiPing: true }, this.seiOrigin);
    if(this.numPingAttempts < this.maxPingAttempts) {
      this.numPingAttempts++;
      this.pingTargetWindow(thisWindow.parent)
    }
  }
  /**
   * Sends the message to SEI with other necessary info
   * @param {string} message - message text
   * @param {object} [meta = null] - meta data to send along with message to SEI
   * @return {null} null
   */
  sendMessage = (message = '', meta = null) => {
    this.seiWindow.postMessage({ message: message, response_id: this.responseId, meta: meta }, this.seiOrigin);
  }
}

module.exports = SeiMessenger
