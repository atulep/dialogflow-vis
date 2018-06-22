import { Edge } from "../graph/edge";
import { Vertex } from "../graph/vertex";
import { EdgeFactory } from "../graph/edge-factory";

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

  /**
   * Getter factory
   * @return {EdgeFactory}
   */
	public get factory(): EdgeFactory {
		return this._factory;
	}

  /**
   * Setter factory
   * @param {EdgeFactory} value
   */
	public set factory(value: EdgeFactory) {
		this._factory = value;
	}
  private _factory: EdgeFactory;

  constructor(vertices: Array<Vertex>, edgeFactory: EdgeFactory) {
    this._vertices = vertices;
    this._factory = edgeFactory;
  }
  abstract generateEdges(): Array<Edge>;
}