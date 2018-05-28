import { Graph } from './../graph/graph';
import { Vertex } from './../graph/vertex';
import { Agent } from './agent';

export abstract class Parser {
  private _agent: Agent;
  abstract parse(): Graph;
  abstract parseIntent(intent: object): Vertex;
  set agent(agent: Agent) {
    this._agent = agent;
  }
  get agent(): Agent {
    return this._agent;
  }
}
