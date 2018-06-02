import { expect } from 'chai';
import 'mocha';

// TODO: (atulep) Add unit-test coverage.

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = 'Hello world!';
    expect(result).to.equal('Hello world!');
  });
});