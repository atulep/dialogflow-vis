import { EdgeGenerator } from "./edge-generator";
import { Edge } from "../graph/edge";

/* TODO:
1. refactor && add tests
2. om fitire add edge merging functionality (to reduce number of edges)
3. add different kinds of visitors - edge visitor and vertex visitor and graph visitor
4. add different kinds of vertices - start vertex, 

*/
export class SimpleEdgeGenerator extends EdgeGenerator {
  generateEdges(): Array<Edge> {
    /*
      Connect each vertex in this.parser.agent.intents to all other vertices unless:
        Case 1: intent X has input context Ax and intent Y has output context By
        Case 2: End the conversation then no edge
    */
    if (this.vertices.length === 0){ 
      throw new Error('Build vertices first.');
    }
    let edges: Array<Edge> = [];
    for (let intentA of this.vertices) {
      for (let intentB of this.vertices) {
        if (intentA === intentB) continue;
        // Case 1
        console.log(intentA.outputContexts);
        if ((intentB.inputContexts.length === 0 && intentA.outputContexts.length === 0)
            || intentB.inputContexts.length === 0) {
          edges.push(new Edge(intentA, intentB));
        } else {
        for (let outputContext of intentA.outputContexts) {
          if (intentB.inputContexts.includes(outputContext)) {
            edges.push(new Edge(intentA, intentB));          
          }
          }
        }
      }
    }
    return edges;
  }
}