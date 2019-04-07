import { expect } from 'chai';

import { expand, Template } from '../src';

const values = { $val: 'lav$', 'val-2': '2-lav', dot: { val: 'lav' }, arr: ['rra'] };
describe('separator', () => {
  it('throw error', done => {
    expect(() => (Template.sep = '{}')).to.throw('Invalid Template.sep value');
    done();
  });
  it('set/get', done => {
    Template.sep = '[|]';
    expect(Template.sep).to.equal('[|]');
    done();
  });
});
describe('expand', () => {
  before(() => {
    Template.sep = '${ }';
  });
  it('string', done => {
    const result = expand('s-${ $val }-e', values);
    expect(result).to.equal('s-lav$-e');
    done();
  });
  it('nested.array', done => {
    const result = expand('s-${ arr[0] }-e', values);
    expect(result).to.equal('s-rra-e');
    done();
  });
  it('nested.dot', done => {
    const result = expand('s-${ dot.val }-e', values);
    expect(result).to.equal('s-lav-e');
    done();
  });
  it('array', done => {
    const result = expand(['s-${$val}-e', 's-${val-2}-e'], values);
    expect(result).to.eql(['s-lav$-e', 's-2-lav-e']);
    done();
  });
  it('throw error', done => {
    expect(() => expand('s-------${ $val }-------e', {})).to.throw(
      'Missing value for template key "$val"'
    );
    done();
  });
});
