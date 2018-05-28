import { GraphBuilder } from "./graph-builder";
import { Graph } from "./graph";
import { Vertex } from "./vertex";
//import { IntentFactory } from "../parser/intent-factory";
import { Parser } from "../parser/parser";
import { Edge } from './edge';
import { EdgeGenerator } from "../algorithm/edge-generator";
import { SimpleEdgeGenerator } from "../algorithm/simple-edge-generator";

export class EdgeListGraphBuilder extends GraphBuilder {
  private parser: Parser;
  constructor(parser: Parser) {
    super();
    this.parser = parser;
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