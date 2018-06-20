import { DialogflowParser } from "./../src/parser/dialogflow-parser";
import { expect } from 'chai';
import 'mocha';
import { Agent } from "../src/parser/agent";

describe('DialogflowParser', () => {
  describe('#parseIntent', () => {
    it('Should return an object with required metadata', () => {
      const agent: Agent = new Agent('test path');
      const dfparser = new DialogflowParser(agent);
      const obj = {
        name: 'test name',
        contexts: ['a'],
        responses: [
          {
            affectedContexts: ['b', 'c'],
          }
        ],
        events: [ { name: 'test event' } ],
        userSays: ['test hello']
      };
      expect(dfparser.parseIntent(obj)).to.deep.equal({
        name: obj.name,
        inputContexts: obj.contexts,
        outputContexts: obj.responses[0].affectedContexts.map((x: any) => x.name),
        events: obj.events.map((x: any) => x.name),
        userSays: obj.userSays
      });
    });
  });
});