import { GraphBuilder } from "./graph-builder";
import { Graph } from "./graph";
import { Vertex } from "./vertex";
import { Edge } from './edge';
import { EdgeGenerator } from "../algorithm/edge-generator";
import { SimpleEdgeGenerator } from "../algorithm/simple-edge-generator";
import { DialogflowParser } from "../parser/dialogflow-parser";

export class EdgeListGraphBuilder extends GraphBuilder {
  private _parser: DialogflowParser;

  /**
   * Getter parser
   * @return {DialogflowParser}
   */
	public get parser(): DialogflowParser {
		return this._parser;
	}

  /**
   * Setter parser
   * @param {DialogflowParser} value
   */
	public set parser(value: DialogflowParser) {
		this._parser = value;
	}
  
  constructor(parser: DialogflowParser) {
    super();
    this._parser = parser;
  }
  buildGraph(): void {
    this.graph = new Graph();
  }

  buildEdges(): void {
    const edgeGenerator: EdgeGenerator = new SimpleEdgeGenerator(this.graph.vertices);
    this.graph.edges = edgeGenerator.generateEdges();
  }

  buildVertices(): void {
    let vertices: Array<Vertex> = []
    for (let intent of this.parser.agent.intents) {
      vertices.push(this.parser.parseIntent(intent));
    }
    this.graph.vertices = vertices;
  }
}