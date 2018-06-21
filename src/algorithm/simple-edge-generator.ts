import { EdgeGenerator } from "./edge-generator";
import { Edge } from "../graph/edge";
import { NonLabelEdge } from "../graph/non-label-edge";

/* TODO: (atulep) 
  1. Implement case 2
  2. Use factories for creating edges
*/ 
export class SimpleEdgeGenerator extends EdgeGenerator {
  generateEdges(): Array<Edge> {
    /*
      Connect each vertex in this.parser.agent.intents to all other vertices unless:
        Case 1: intent X has input context Ax and intent Y has output context By
        Case 2: End the conversation then no edge (**not supported**,
          reason: DialogFlow JSON intents don't have info on that)
    */
    if (this.vertices.length === 0){ 
      throw new Error('Build vertices first.');
    }
    let edges: Array<Edge> = [];
    for (let intentA of this.vertices) {
      for (let intentB of this.vertices) {
        // Case 1
        if ((intentB.inputContexts.length === 0 && intentA.outputContexts.length === 0)
            || intentB.inputContexts.length === 0) {
          edges.push(new NonLabelEdge(intentA, intentB));
        } else {
          let intersectionArray: Array<string> = [];
          for (let c of intentA.outputContexts) {
            if (intentB.inputContexts.includes(c)) {
              intersectionArray.push(c);
            }
          }
          if (intersectionArray.length === intentB.inputContexts.length) {
            edges.push(this.factory.createEdge(intentA, intentB));          
          }
        }
      }
    }
    return edges;
  }
}