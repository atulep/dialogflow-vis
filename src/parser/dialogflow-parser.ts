import { Parser } from './parser'
import { Graph } from './../graph/graph'
import { Agent } from './agent'
//import { IntentFactory } from './intent-factory';
//import { DialogflowIntentFactory } from './dialogflow-intent-factory';
import { Vertex } from './../graph/vertex'
import { GraphBuilder } from '../graph/graph-builder';
import { EdgeListGraphBuilder } from '../graph/edgelist-graph-builder';

// Builder: Director
// Strategy: Context
export class DialogflowParser extends Parser {
  constructor(agent: Agent) {
    super();
    this.agent = agent;
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