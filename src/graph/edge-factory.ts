import { Vertex } from "./vertex";
import { Edge } from "./edge";

export abstract class EdgeFactory {
  abstract createEdge(from: Vertex, to: Vertex): Edge;
}