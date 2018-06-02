import { DialogflowParser } from './parser/dialogflow-parser'
import { Agent } from './parser/agent';
import { AgentHtmlCodegen } from './codegen/agent-html-codegen';
import { AgentCodegen } from './codegen/agent-codegen';

const parser: DialogflowParser = new DialogflowParser(new Agent('./hello'));
let graph = parser.parse();
const codegen: AgentCodegen = new AgentHtmlCodegen(graph);
// TODO: (atulep) Add semantics for distinguishing start nodes in the AoG agent.
console.log(codegen.codegen());
