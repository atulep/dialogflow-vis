import { expect } from 'chai';
import 'mocha';
import { Vertex } from '../src/graph/vertex';
import { Edge } from '../src/graph/edge';
import { ContextAsLabelEdgeFactory } from '../src/graph/context-as-a-label-edge-factory';
import { EdgeFactory } from '../src/graph/edge-factory';

describe('ContextAsLabelEdge', () => {
  describe('#createLabel', () => {
    it('Should correctly create labels for edges with at most 1 context.', () => {
      let vA: Vertex = new Vertex({
        name: 'A',
        events: [],
        inputContexts: [],
        outputContexts: ['a'],
        userSays: []
      });
      let vB: Vertex = new Vertex({
        name: 'B',
        events: [],
        inputContexts: ['a'],
        outputContexts: ['c', 'd'],
        userSays: []
      });
      let vC: Vertex = new Vertex({
        name: 'C',
        events: [],
        inputContexts: ['d'],
        outputContexts: [],
        userSays: []
      })
      let edges: Array<Edge> = [];
      const factory: EdgeFactory = new ContextAsLabelEdgeFactory();
      edges.push(factory.createEdge(vA, vB)); // [a]
      edges.push(factory.createEdge(vB, vA)); // ""
      edges.push(factory.createEdge(vA, vA)); // ""
      edges.push(factory.createEdge(vB, vC)); // [d]
      edges.push(factory.createEdge(vC, vA)); // ""
      const expects: Array<string> = ['a', '', '', 'd', ''];
      for (let i = 0; i < expects.length; ++i) {
        expect(edges[i].label).to.equal(expects[i]);
      } 
    });
  });

  it('Should correctly create labels for edges with at most 2 contextss.', () => {
    let vA: Vertex = new Vertex({
      name: 'A',
      events: [],
      inputContexts: [],
      outputContexts: ['a', 'b'],
      userSays: []
    });
    let vB: Vertex = new Vertex({
      name: 'B',
      events: [],
      inputContexts: ['a', 'b'],
      outputContexts: ['c', 'd', 'e'],
      userSays: []
    });
    let vC: Vertex = new Vertex({
      name: 'C',
      events: [],
      inputContexts: ['d', 'e'],
      outputContexts: [],
      userSays: []
    })
    let edges: Array<Edge> = [];
    const factory: EdgeFactory = new ContextAsLabelEdgeFactory();
    edges.push(factory.createEdge(vA, vB)); // a, b
    edges.push(factory.createEdge(vB, vA)); // ""
    edges.push(factory.createEdge(vA, vA)); // ""
    edges.push(factory.createEdge(vB, vC)); // d, e
    edges.push(factory.createEdge(vC, vA)); // ""
    const expects: Array<string> = ['a,b', '', '', 'd,e', ''];
    for (let i = 0; i < expects.length; ++i) {
      expect(edges[i].label).to.equal(expects[i]);
    } 
  });
});