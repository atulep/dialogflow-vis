import { Vertex } from "../graph/vertex";
import { Edge } from "../graph/edge";

export abstract class GraphCodegenVisitor {
  abstract visit(vertex: Vertex): string;
  abstract visit(edge: Edge): string;
}
