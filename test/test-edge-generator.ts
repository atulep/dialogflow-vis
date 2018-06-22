import { expect } from 'chai';
import 'mocha';
import { SimpleEdgeGenerator } from './../src/algorithm/simple-edge-generator';
import { EdgeGenerator } from './../src/algorithm/edge-generator';
import { Edge } from '../src/graph/edge';
import { Vertex } from '../src/graph/vertex';
import { NonLabelEdge } from '../src/graph/non-label-edge';
import { ContextAsLabelEdgeFactory } from '../src/graph/context-as-a-label-edge-factory';
import { NonLabelEdgeFactory } from '../src/graph/non-label-edge-factory';
import { EdgeFactory } from '../src/graph/edge-factory';

describe('EdgeGenerator', () => {
  describe('Agent 1', () => {
    it('Should return list of edges containing two edges', () => {
      let vA: Vertex = new Vertex({
        name: 'A',
        events: [],
        inputContexts: ['a'],
        outputContexts: ['b'],
        userSays: ['hello']
      });
      let vB: Vertex = new Vertex({
        name: 'B',
        events: [],
        inputContexts: ['b'],
        outputContexts: ['a'],
        userSays: ['hello']
      });
      let result: Array<Edge> = [];
      result.push(new NonLabelEdge(vA, vB));
      result.push(new NonLabelEdge(vB, vA));
      let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB], new NonLabelEdgeFactory());
      expect(gen.generateEdges()).to.deep.equal(result);
    });
  });
  
  describe('Agent 2', () => {
    it('Should return list of edges containing no edges', () => {
      let vA: Vertex = new Vertex({
        name: 'A',
        events: [],
        inputContexts: ['a'],
        outputContexts: ['b'],
        userSays: []
      });
      let vB: Vertex = new Vertex({
        name: 'B',
        events: [],
        inputContexts: ['c'],
        outputContexts: ['d'],
        userSays: []
      });
      let result: Array<Edge> = [];
      let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB], new NonLabelEdgeFactory());
      expect(gen.generateEdges()).to.deep.equal(result);
    });
  });
  
  describe('Agent 3', () => {
    it('Should return list of edges containing four edges', () => {
      let vA: Vertex = new Vertex({
        name: 'A',
        events: [],
        inputContexts: [],
        outputContexts: ['b'],
        userSays: []
      });
      let vB: Vertex = new Vertex({
        name: 'B',
        events: [],
        inputContexts: [],
        outputContexts: ['a'],
        userSays: []
      });
      let result: Array<Edge> = [];
      result.push(new NonLabelEdge(vA, vB));
      result.push(new NonLabelEdge(vB, vA));
      result.push(new NonLabelEdge(vA, vA));
      result.push(new NonLabelEdge(vB, vB));
      let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB], new NonLabelEdgeFactory());
      expect(gen.generateEdges()).to.have.deep.members(result);
      expect(result).to.have.deep.members(gen.generateEdges());
    });  
  });
  
  describe('Agent 4', () => {
    it('Should return list of edges containing five edges', () => {
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
      let result: Array<Edge> = [];
      const factory: EdgeFactory = new ContextAsLabelEdgeFactory();
      result.push(factory.createEdge(vA, vB)); // [a]
      result.push(factory.createEdge(vB, vA)); // ""
      result.push(factory.createEdge(vA, vA)); // ""
      result.push(factory.createEdge(vB, vC)); // [d]
      result.push(factory.createEdge(vC, vA)); // ""
      let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB, vC], new ContextAsLabelEdgeFactory());
      expect(gen.generateEdges()).to.have.deep.members(result);
      expect(result).to.have.deep.members(gen.generateEdges());
    })
  });  
})
