import { Graph } from './../graph/graph'
import { Agent } from './agent'
import { Vertex } from './../graph/vertex'
import { GraphBuilder } from '../graph/graph-builder';
import { EdgeListGraphBuilder } from '../graph/edgelist-graph-builder';
import { DfWelcomeVertex } from '../graph/df-welcome-vertex';

// Builder: Director
// Strategy: Context
export class DialogflowParser {
  private _agent: Agent;
  private readonly DF_WELCOME_INTENT: string = 'WELCOME';

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
      outputContexts: intent.responses[0].affectedContexts.map((x: any) => x.name),
      events: intent.events.map((x: any) => x.name),
      userSays: intent.userSays
    }
    const name: string = intent.name;
    // TODO: (atulep) Don't create vertices here; instead return an Object and let caller create
    // appropriate vertices using a factory method.
    if (metadata.events.includes(this.DF_WELCOME_INTENT)) {
      return new DfWelcomeVertex(name, metadata);
    } else {
    return new Vertex(name, metadata);
    }
  }
}