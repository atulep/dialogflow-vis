import { Graph } from "../graph/graph";
import fs = require("fs");
import { GraphCodegenVisitor } from "./graph-codegen-visitor";
import { GraphHtmlCodegenVisitor } from "./graph-html-codegen-visitor";
import { GraphHtmlCodegen } from "./graph-html-codegen";
import { GraphCodegen } from "./graph-codegen";

export abstract class AgentCodegen {
  protected _graph: Graph;
  private readonly CODEGEN_DELIMITER: string = 'CODEGEN_START';

  constructor(graph: Graph) {
    this._graph = graph;
  }
  codegen(): string {
    let srcTemplate = this.createSrcTemplate();
    let graphCodegen: GraphCodegen = this.createGraphCodegen();
    const graphCode: string = graphCodegen.codegen();
    const insertionPoint = srcTemplate.indexOf(this.CODEGEN_DELIMITER) + this.CODEGEN_DELIMITER.length;
    let result = srcTemplate.slice(0, insertionPoint) + "\n" + graphCode + "\n" + srcTemplate.slice(insertionPoint);    
    return result;
  }

  abstract createGraphCodegen(): GraphCodegen;
  abstract createSrcTemplate(): string;
}