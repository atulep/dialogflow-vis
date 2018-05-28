import { Edge } from "../graph/edge";
import { Graph } from "../graph/graph";
import { Vertex } from "../graph/vertex";

export abstract class EdgeGenerator {
  /**
   * Getter vertices
   * @return {Array<Vertex>}
   */
	public get vertices(): Array<Vertex> {
		return this._vertices;
	}

  /**
   * Setter vertices
   * @param {Array<Vertex>} value
   */
	public set vertices(value: Array<Vertex>) {
		this._vertices = value;
	}
  private _vertices: Array<Vertex>;

  constructor(vertices: Array<Vertex>) {
    this._vertices = vertices;
  }
  abstract generateEdges(): Array<Edge>;
}