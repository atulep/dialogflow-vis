import { Edge } from "./edge";

export class NonLabelEdge extends Edge {
  public createLabel(): void {
    this.label = '';
  }
}