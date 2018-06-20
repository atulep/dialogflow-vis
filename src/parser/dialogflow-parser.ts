import { Graph } from './../graph/graph'
import { Agent } from './agent'
import { GraphBuilder } from '../graph/graph-builder';
import { EdgeListGraphBuilder } from '../graph/edgelist-graph-builder';

export interface Intent {
  name: string,
  inputContexts: Array<string>,
  outputContexts: Array<string>,
  events: Array<string>,
  userSays: Array<string>
}

// Builder: Director
// Strategy: Context
export class DialogflowParser {
  private _agent: Agent;
  public readonly DF_WELCOME_INTENT: string = 'WELCOME';

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

  parseIntent(obj: any): Intent {
    let intent: Intent = {
      name: obj.name,
      inputContexts: obj.contexts,
      outputContexts: obj.responses[0].affectedContexts.map((x: any) => x.name),
      events: obj.events.map((x: any) => x.name),
      userSays: obj.userSays
    };
    return intent;
  }
}