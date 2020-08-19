import SeiMessenger from '../src/SeiMessenger';
import { expect } from 'chai';

const window = global.window;
const initialLocation = window.location.href;

before(function() {
  window.history.pushState({}, '', initialLocation + '?response_id=exampleResponseIdHere')
})
after(function() {
  window.history.pushState({}, '', initialLocation)
})
describe('SeiMessenger', function() {
  describe('constructor', function() {

    it('instantiates instance with default origin', function() {
      const s = new SeiMessenger();
      expect(s.seiOrigin).to.equal('https://scorpion.caveon.com');
      expect(s.maxPingAttempts).to.equal(10);
      expect(s.seiQueryParamName).to.equal('response_id');
      return false;
    })
    it('instantiates instance with supplied origin', function() {
      const origin = '*';
      const s = new SeiMessenger(origin);
      expect(s.seiOrigin).to.equal(origin);
      expect(s.maxPingAttempts).to.equal(10);
      expect(s.seiQueryParamName).to.equal('response_id');
    })
    it('instantiates instance with default response_id', function() {
      const s = new SeiMessenger();
      expect(s.responseId).to.equal('exampleResponseIdHere');
      expect(s.maxPingAttempts).to.equal(10);
      expect(s.seiQueryParamName).to.equal('response_id');
    })
    it('instantiates instance with supplied response_id', function() {
      const responseId = 'testid';
      const s = new SeiMessenger(null, responseId);
      expect(s.responseId).to.equal(responseId)
      expect(s.maxPingAttempts).to.equal(10);
      expect(s.seiQueryParamName).to.equal('response_id');
    })
  })

  describe('pong', function() {
    it('stores which window to send the message to', function() {
      const evt = new MessageEvent(null, {
        data: 'pong',
        source: window
      });
      const s = new SeiMessenger();
      s.pong(evt);
      expect(s.seiWindow).to.equal(evt.source)
    })
  })

  describe('getSeiResponseId', function() {
    it('retreives `response_id` query parameter', function() {
      const s = new SeiMessenger();
      s.getSeiResponseId();
      expect(s.getSeiResponseId()).to.equal('exampleResponseIdHere');
    })
  })

  describe('pingTargetWindow', function() {
    it('sends a message to parent windows 10 times', function() {
      const s = new SeiMessenger();
      s.pingTargetWindow(window);
      expect(s.numPingAttempts).to.equal(10);
    })
  })

  describe('sendMessage', function() {
    it('runs without arguments', function() {
      const s = new SeiMessenger();
      s.sendMessage();
    })
    it('runs with default message', function() {
      const s = new SeiMessenger();
      s.sendMessage(null, { example: 'object' });
    })
    it('runs with default meta object', function() {
      const s = new SeiMessenger();
      s.sendMessage('test message');
    })
  })
})
