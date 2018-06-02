import { Vertex } from './vertex'
import { GraphCodegenVisitor } from '../codegen/graph-codegen-visitor';

export class Edge {
  private _from: Vertex;
  private _to: Vertex;
  private _label: string;

  /**
   * Getter label
   * @return {string}
   */
	public get label(): string { 
    const updLabel: string = this.from.outputContexts.filter
                            (x => this.to.inputContexts.includes(x)).toString();
    if (this._label !== updLabel) {
      this.label = updLabel
    }
		return this._label;
	}

  /**
   * Setter label
   * @param {string} value
   */
	public set label(value: string) {
		this._label = value;
	}
  
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