import { Edge } from './edge'
import { Vertex } from './vertex'

export class Graph {
  private _edges: Array<Edge>;
  private _vertices: Array<Vertex>;
  set edges(edges: Array<Edge>) {
    this._edges = edges.map(x => x);
  }
  get edges(): Array<Edge> {
    return this._edges;
  }
  set vertices(vertices: Array<Vertex>) {
    this._vertices = vertices.map(x => x);
  }
  get vertices(): Array<Vertex> {
    return this._vertices;
  }
}