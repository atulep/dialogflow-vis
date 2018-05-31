import { Graph } from './../graph/graph'
import { Agent } from './agent'
//import { IntentFactory } from './intent-factory';
//import { DialogflowIntentFactory } from './dialogflow-intent-factory';
import { Vertex } from './../graph/vertex'
import { GraphBuilder } from '../graph/graph-builder';
import { EdgeListGraphBuilder } from '../graph/edgelist-graph-builder';

// Builder: Director
// Strategy: Context
export class DialogflowParser {
  private _agent: Agent;

  /**
   * Getter agent
   * @return {Agent}
   */
	public get agent(): Agent {
		return this._agent;
	}

  /**
   * Setter agent
   * @param {Agent} value
   */
	public set agent(value: Agent) {
		this._agent = value;
	}
  
  constructor(agent: Agent) {
    this._agent = agent;
  }
  
  parse(): Graph {
    let graphBuilder: GraphBuilder = new EdgeListGraphBuilder(this);
    graphBuilder.buildGraph();
    graphBuilder.buildVertices();
    graphBuilder.buildEdges();
    return graphBuilder.graph;
  }

  parseIntent(intent: any): Vertex {
    const metadata = {
      inputContexts: intent.contexts,
      outputContexts: intent.responses[0].affectedContexts,
      events: intent.events.map((x: any) => x.name),
      userSays: intent.userSays
    }
    const name: string = intent.name;
    return new Vertex(name, metadata);
  }
}