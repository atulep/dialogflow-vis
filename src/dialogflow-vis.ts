#!/usr/bin/env node

import { DialogflowParser } from './parser/dialogflow-parser'
import { Agent } from './parser/agent';
import { AgentHtmlCodegen } from './codegen/agent-html-codegen';
import { AgentCodegen } from './codegen/agent-codegen';
import { initArgumentParser } from './arg-parse';
import { IO } from './io';

const argparser = initArgumentParser();
let args = argparser.parseArgs();
let io = new IO(args.file, args.out);

try {
  const parser: DialogflowParser = new DialogflowParser(new Agent(io.in));
  let graph = parser.parse();
  const codegen: AgentCodegen = new AgentHtmlCodegen(graph);
  // TODO: (atulep) Add semantics for distinguishing start nodes in the AoG agent.
  const code = codegen.codegen();
  io.write(code);
} catch (e) {
  console.log(e.message);
}