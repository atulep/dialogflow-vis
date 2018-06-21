import { Edge } from "./edge";

export class ContextAsLabelEdge extends Edge {
  public createLabel(): void {
    let intersectionArray: Array<string> = [];
      for (let c of this.from.outputContexts) {
        if (this.to.inputContexts.includes(c)) {
          intersectionArray.push(c);
      }
    }
    this.label = intersectionArray.toString();
  }
}