import { Vertex } from './vertex'

export class Edge {
  private from: Vertex;
  private to: Vertex;
  constructor(from: Vertex, to: Vertex) {
    this.from = from;
    this.to = to;
  }
}