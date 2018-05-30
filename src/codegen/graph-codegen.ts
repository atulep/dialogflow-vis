import { Graph } from "../graph/graph";

export abstract class GraphCodegen {
  protected _graph: Graph;
  constructor(graph: Graph) {
    this._graph = graph;
  }
  abstract codegen(): string;
}