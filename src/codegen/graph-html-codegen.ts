import { Graph } from "../graph/graph";
import { GraphHtmlCodegenVisitor } from "./graph-html-codegen-visitor";

export class GraphHtmlCodegen {
  private _graph: Graph;
  
  constructor(graph: Graph) {
    this._graph = graph;
  }
  
  codegen(): string {
      let res = '';
      res += this.generateVertices();
      res += this.generateEdges();
      res += this.generateOptions();
      res += this.initNetwork();
      return res;
  }

  private generateEdges(): string {
    let edgesString = 'var edges = new vis.DataSet([\n';
    let graphCodegenVisitor: GraphHtmlCodegenVisitor = new GraphHtmlCodegenVisitor();
    let first = true;
    for (let e of this._graph.edges) {
     if (!first) edgesString += ',\n';
     edgesString += e.accept(graphCodegenVisitor);
     if (first) first = false; 
    }
    edgesString += ']);\n';
    return edgesString;
  }

  private generateOptions(): string {
    let optionsString = "\
          var interaction = {\
            dragNodes: true,\
            dragView: true\
          };\
          var layout = {\
            hierarchical: {\
              enabled: true,\
              direction: 'UD',\
              sortMethod: 'directed',\
              nodeSpacing: 150,\
              parentCentralization: true\
            }\
          };\
          var physics = { enabled: false };\
          "
    optionsString += "\n";
    optionsString += "var options = { interaction, layout, physics };"
    return optionsString;
  }

  private initNetwork(): string {
    let initNetwork: string = "\
      var container = document.getElementById('mynetwork');\
      var data = { nodes: nodes, edges: edges };\
      var network = new vis.Network(container, data, options);\
      "
    return initNetwork;
  }

  private generateVertices(): string {
    let nodesString = 'var nodes = new vis.DataSet([\n';
    let graphCodegenVisitor: GraphHtmlCodegenVisitor = new GraphHtmlCodegenVisitor();
    let first = true;
    for (let v of this._graph.vertices) {
     if (!first) nodesString += ',\n';
     nodesString += v.accept(graphCodegenVisitor);
     if (first) first = false; 
    }
    nodesString += ']);\n';
    return nodesString;
  }
}