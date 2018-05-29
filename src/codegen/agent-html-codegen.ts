import { Graph } from "../graph/graph";
import fs = require("fs");
import { GraphCodegenVisitor } from "./graph-codegen-visitor";
import { GraphHtmlCodegenVisitor } from "./graph-html-codegen-visitor";
import { GraphHtmlCodegen } from "./graph-html-codegen";

export class AgentHtmlCodegen {
  private _graph: Graph;
  private _code: string;
  private readonly PATH_TO_TEMPLATE: string = './agent-template.html';
  private readonly CODEGEN_DELIMITER: string = 'CODEGEN_START';

  constructor(graph: Graph) {
    this._graph = graph;
    this._code = '';
  }
  codegen(): string {
    let htmlTemplate = fs.readFileSync(this.PATH_TO_TEMPLATE, 'utf-8');
    let graphHtmlCodegen: GraphHtmlCodegen = new GraphHtmlCodegen(this._graph);
    const graphCode: string = graphHtmlCodegen.codegen();
    const insertionPoint = htmlTemplate.indexOf(this.CODEGEN_DELIMITER) + this.CODEGEN_DELIMITER.length;
    let result = htmlTemplate.slice(0, insertionPoint) + "\n" + graphCode + "\n" + htmlTemplate.slice(insertionPoint);    
    return result;
  }
}