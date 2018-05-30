import { DialogflowParser } from './parser/dialogflow-parser'
import { Agent } from './parser/agent';
import { AgentHtmlCodegen } from './codegen/agent-html-codegen';
import { AgentCodegen } from './codegen/agent-codegen';

const parser: DialogflowParser = new DialogflowParser(new Agent('./hello'));
console.log(parser.parse());
const codegen: AgentCodegen = new AgentHtmlCodegen(parser.parse());
console.log(codegen.codegen());
//visitor: Codegen = new CodegenVisitor();
//console.log(visitor.visit(parser.parse()));
// codegen

// dump to the file