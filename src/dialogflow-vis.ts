import { DialogflowParser } from './parser/dialogflow-parser'
import { Agent } from './parser/agent';

const parser: DialogflowParser = new DialogflowParser(new Agent('./hello'));
console.log(parser.parse());
//visitor: Codegen = new CodegenVisitor();
//console.log(visitor.visit(parser.parse()));
// codegen

// dump to the file