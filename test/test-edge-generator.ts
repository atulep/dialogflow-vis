import { expect } from 'chai';
import 'mocha';
import { SimpleEdgeGenerator } from './../src/algorithm/simple-edge-generator';
import { EdgeGenerator } from './../src/algorithm/edge-generator';
import { Edge } from '../src/graph/edge';
import { Vertex } from '../src/graph/vertex';

describe('Agent 1', () => {
  it('Should return list of edges containing two edges', () => {
    let vA: Vertex = new Vertex('A', {
      events: [],
      inputContexts: ['a'],
      outputContexts: ['b']
    });
    let vB: Vertex = new Vertex('B', {
      events: [],
      inputContexts: ['b'],
      outputContexts: ['a']
    });
    let result: Array<Edge> = [];
    result.push(new Edge(vA, vB));
    result.push(new Edge(vB, vA));
    let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB]);
    expect(gen.generateEdges()).to.deep.equal(result);
  });
});

describe('Agent 2', () => {
  it('Should return list of edges containing no edges', () => {
    let vA: Vertex = new Vertex('A', {
      events: [],
      inputContexts: ['a'],
      outputContexts: ['b']
    });
    let vB: Vertex = new Vertex('B', {
      events: [],
      inputContexts: ['c'],
      outputContexts: ['d']
    });
    let result: Array<Edge> = [];
    let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB]);
    expect(gen.generateEdges()).to.deep.equal(result);
  });
});

describe('Agent 3', () => {
  it('Should return list of edges containing four edges', () => {
    let vA: Vertex = new Vertex('A', {
      events: [],
      inputContexts: [],
      outputContexts: ['b']
    });
    let vB: Vertex = new Vertex('B', {
      events: [],
      inputContexts: [],
      outputContexts: ['a']
    });
    let result: Array<Edge> = [];
    result.push(new Edge(vA, vB));
    result.push(new Edge(vB, vA));
    result.push(new Edge(vA, vA));
    result.push(new Edge(vB, vB));
    let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB]);
    expect(gen.generateEdges()).to.have.deep.members(result);
    expect(result).to.have.deep.members(gen.generateEdges());
  });  
});

describe('Agent 4', () => {
  it('Should return list of edges containing five edges', () => {
    let vA: Vertex = new Vertex('A', {
      events: [],
      inputContexts: [],
      outputContexts: ['a']
    });
    let vB: Vertex = new Vertex('B', {
      events: [],
      inputContexts: ['a', 'b'],
      outputContexts: ['c', 'd']
    });
    let vC: Vertex = new Vertex('C', {
      events: [],
      inputContexts: ['d'],
      outputContexts: []
    })
    let result: Array<Edge> = [];
    result.push(new Edge(vA, vB));
    result.push(new Edge(vB, vA));
    result.push(new Edge(vA, vA));
    result.push(new Edge(vB, vC));
    result.push(new Edge(vC, vA));
    let gen: EdgeGenerator = new SimpleEdgeGenerator([vA, vB, vC]);
    expect(gen.generateEdges()).to.have.deep.members(result);
    expect(result).to.have.deep.members(gen.generateEdges());
  })
});