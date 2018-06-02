import { Vertex } from "../graph/vertex";
import { Edge } from "../graph/edge";
import { GraphCodegenVisitor } from "./graph-codegen-visitor";

export class GraphHtmlCodegenVisitor extends GraphCodegenVisitor {  
  private edgeCode = '';

  visit(obj): string {
    if (obj instanceof Vertex) {
      return `{id: "${obj.id}", label: "${obj.id}"}`;
    } else if (obj instanceof Edge) {
      return `{from: "${obj.from.id}", to: "${obj.to.id}", arrows: { to: {enabled: true} },`
              + ` label: "${obj.label}" }`;
    } else {
      return '';
    }
  }
}