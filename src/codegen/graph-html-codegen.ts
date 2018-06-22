import { Graph } from "../graph/graph";
import { GraphHtmlCodegenVisitor } from "./graph-html-codegen-visitor";
import { GraphCodegen } from "./graph-codegen";

export class GraphHtmlCodegen extends GraphCodegen {  
  constructor(graph: Graph) {
    super(graph);
  }
  
  codegen(): string {
      let res: Array<string> = [];
      res.push(this.generateDrawFunction());
      return res.join('\n');
  }

  private generateDrawFunction(): string {
    let s: Array<string> = [];
    s.push(['function draw() {',
            '  destroy();',
            '  nodes = [];',
            '  edges = [];'
            ].join('\n'));
    s.push(this.generateVertices());
    s.push(this.generateEdges());
    s.push(this.generateOptions());
    s.push(this.initNetwork());
    s.push('}');
    return s.join('\n');
  }

  private generateEdges(): string {
    let code: Array<string> = [];
    code.push('edges = new vis.DataSet([');
    let graphCodegenVisitor: GraphHtmlCodegenVisitor = new GraphHtmlCodegenVisitor();
    let edgeCode: Array<string> = [];
    for (let e of this._graph.edges) {
      edgeCode.push('  ' + e.accept(graphCodegenVisitor));
    }
    code.push(edgeCode.join(',\n'));
    code.push(']);');
    return code.join('\n');
  }

  private generateOptions(): string {
    return [
          'var interaction = {',
          '  dragNodes: true,',
          '  dragView: true',
          '};',
          'var layout = {',
          '  improvedLayout: true,',
          '  hierarchical: {',
          '    enabled: true,',
          '    direction: rotationDirections[rotationPtr],',
          '    sortMethod: "directed",',
          '    nodeSpacing: 200,',
          '    levelSeparation: 200,',
          '    treeSpacing: 300,',
          '    parentCentralization: true',
          '  }',
          '};',
          'var physics = { enabled: false };',
          'var options = { interaction, layout, physics };'
    ].join('\n');
  }

  private initNetwork(): string {
    return [
      'var container = document.getElementById("mynetwork");',
      'var data = { nodes: nodes, edges: edges };',
      'network = new vis.Network(container, data, options);'
    ].join('\n');
  }

  private generateVertices(): string {
    let code: Array<string> = [];
    code.push('nodes = new vis.DataSet([');
    let graphCodegenVisitor: GraphHtmlCodegenVisitor = new GraphHtmlCodegenVisitor();
    let verticesCode: Array<string> = [];
    for (let v of this._graph.vertices) {
      verticesCode.push('  ' + v.accept(graphCodegenVisitor));
    }
    code.push(verticesCode.join(',\n'));
    code.push(']);');
    return code.join('\n');
  }
}