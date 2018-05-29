import { Vertex } from './vertex'
import { GraphCodegenVisitor } from '../codegen/graph-codegen-visitor';

export class Edge {
  private _from: Vertex;
  private _to: Vertex;

  /**
   * Getter from
   * @return {Vertex}
   */
	public get from(): Vertex {
		return this._from;
	}

  /**
   * Getter to
   * @return {Vertex}
   */
	public get to(): Vertex {
		return this._to;
	}

  /**
   * Setter from
   * @param {Vertex} value
   */
	public set from(value: Vertex) {
		this._from = value;
	}

  /**
   * Setter to
   * @param {Vertex} value
   */
	public set to(value: Vertex) {
		this._to = value;
	}
  
  constructor(from: Vertex, to: Vertex) {
    this._from = from;
    this._to = to;
  }
  public accept(visitor: GraphCodegenVisitor): string {
    return visitor.visit(this);
  }
}