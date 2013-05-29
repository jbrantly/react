/**
 * @jsx React.DOM
 * @emails react-core
 */

"use strict";

var React = require('React');

describe('CSSPropertyOperations', function() {
  var CSSPropertyOperations;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    CSSPropertyOperations = require('CSSPropertyOperations');
  });

  it('should create markup for simple styles', function() {
    expect(CSSPropertyOperations.createMarkupForStyles({
      backgroundColor: '#3b5998',
      display: 'none'
    })).toBe('background-color:#3b5998;display:none;');
  });

  it('should ignore undefined styles', function() {
    expect(CSSPropertyOperations.createMarkupForStyles({
      backgroundColor: undefined,
      display: 'none'
    })).toBe('display:none;');
  });

  it('should ignore null styles', function() {
    expect(CSSPropertyOperations.createMarkupForStyles({
      backgroundColor: null,
      display: 'none'
    })).toBe('display:none;');
  });

  it('should return null for no styles', function() {
    expect(CSSPropertyOperations.createMarkupForStyles({
      backgroundColor: null,
      display: null
    })).toBe(null);
  });

  it('should automatically append `px` to relevant styles', function() {
    expect(CSSPropertyOperations.createMarkupForStyles({
      left: 0,
      margin: 16,
      opacity: 0.5,
      padding: '4px'
    })).toBe('left:0;margin:16px;opacity:0.5;padding:4px;');
  });

  it('should set style attribute when styles exist', function() {
    var styles = {
      backgroundColor: '#000',
      display: 'none'
    };
    var div = <div style={styles} />;
    var root = document.createElement('div');
    React.renderComponent(div, root);
    expect(/style=".*"/.test(root.innerHTML)).toBe(true);
  });

  it('should not set style attribute when no styles exist', function() {
    var styles = {
      backgroundColor: null,
      display: null
    };
    var div = <div style={styles} />;
    var root = document.createElement('div');
    React.renderComponent(div, root);
    expect(/style=".*"/.test(root.innerHTML)).toBe(false);
  });

});