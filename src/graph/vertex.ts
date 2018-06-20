import { GraphCodegenVisitor } from "../codegen/graph-codegen-visitor";
import { Intent } from "../parser/dialogflow-parser";

export class Vertex {
  private _id: string;
  private _inputContexts: Array<string>;
  private _outputContexts: Array<string>;
  private _events: Array<string>;

    /**
     * Getter events
     * @return {Array<string>}
     */
	public get events(): Array<string> {
		return this._events;
	}

    /**
     * Setter events
     * @param {Array<string>} value
     */
	public set events(value: Array<string>) {
		this._events = value;
	}
    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
    }
    
    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}


    /**
     * Getter inputContext
     * @return {Array<string>}
     */
	public get inputContexts(): Array<string> {
		return this._inputContexts;
	}

    /**
     * Setter inputContext
     * @param {Array<string>} value
     */
	public set inputContexts(value: Array<string>) {
		this._inputContexts = value;
	}

    /**
     * Getter outputContext
     * @return {Array<string>}
     */
	public get outputContexts(): Array<string> {
		return this._outputContexts;
	}

    /**
     * Setter outputContext
     * @param {Array<string>} value
     */
	public set outputContexts(value: Array<string>) {
		this._outputContexts = value;
  }

  constructor(intent: Intent) {
    this._id = intent.name;
    this._inputContexts = intent.inputContexts.map((x:string) => x);
    this._outputContexts = intent.outputContexts.map((x:string) => x);
    this._events = intent.events.map((x:string) => x);
  }
  
  public accept(visitor: GraphCodegenVisitor): string {
    return visitor.visit(this);
  }
}