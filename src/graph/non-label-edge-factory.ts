import { EdgeFactory } from "./edge-factory";
import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { NonLabelEdge } from "./non-label-edge";

export class NonLabelEdgeFactory extends EdgeFactory {
  createEdge(from: Vertex, to: Vertex): Edge {
    return new NonLabelEdge(from, to);
  }
}