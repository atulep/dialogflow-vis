import { Vertex } from "../graph/vertex";
import { Edge } from "../graph/edge";
import { GraphCodegenVisitor } from "./graph-codegen-visitor";
import { DfWelcomeVertex } from "../graph/df-welcome-vertex";

/**
 * This visitor will generate code associated with the vertices and edges of the graph.
 * I envision that if a user will want to add special edges like labeled edges and edges with
 * special colors etc., they can add specialized vertices and edges into the graph (i.e. subclasses
 * of vertices) and adding additional codegen here. 
 */

export class GraphHtmlCodegenVisitor extends GraphCodegenVisitor {  
  visit(obj): string {
    if (obj instanceof DfWelcomeVertex) {
      return `{id: "${obj.id}", label: "${obj.id}", shape: "star" }`;
    } else if (obj instanceof Vertex) {
      return `{id: "${obj.id}", label: "${obj.id}"}`;
    } else if (obj instanceof Edge) {
      return `{from: "${obj.from.id}", to: "${obj.to.id}", arrows: { to: {enabled: true} },` + 
            ` label: labelCheckbox.checked === true ? "${obj.label}" : "" }`;
    } else {
      return '';
    }
  }
}