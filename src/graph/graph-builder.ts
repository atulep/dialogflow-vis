import { Graph } from "./graph";
import { Edge } from "./edge";
import { Vertex } from "./vertex";

export abstract class GraphBuilder {
  private _graph: Graph;
  abstract buildGraph(): void;
  abstract buildEdges(): void;
  abstract buildVertices(): void;
  get graph(): Graph {
    return this._graph;
  }
  set graph(graph: Graph) {
    this._graph = graph;
  }
}