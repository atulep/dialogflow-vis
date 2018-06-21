import { EdgeFactory } from "./edge-factory";
import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { ContextAsLabelEdge } from "./context-as-a-label-edge";

export class ContextAsLabelEdgeFactory extends EdgeFactory {
  createEdge(from: Vertex, to: Vertex): Edge {
    return new ContextAsLabelEdge(from, to);
  }
}