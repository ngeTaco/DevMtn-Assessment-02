import ast from 'abstract-syntax-tree';
import fs from 'node:fs';

const { parse, first, walk, find } = ast;

const findIdentifier = (tree, name) => find(tree, { type: 'Identifier', name });

export const createParseTree = (filepath) => {
  const source = fs.readFileSync(filepath, 'utf8');
  const tree = parse(source);

  // Create pointer to parent node for each node in the tree, makes it easier
  // to find identifiers and check the type of expression they come from later
  // (like when checking if a variable is part of object destructuring pattern)
  walk(tree, (node, parent) => {
    node.parent = parent;
  });

  // Jest matcher to check if an identifier is an arrow function.
  const toBeAnArrowFunction = (variableName) => {
    const nodes = findIdentifier(tree, variableName);
    if (nodes.length === 0) {
      return {
        message: () =>
          `expected ${variableName} to be an arrow function but an identifier matching that name was not found`,
        pass: false,
      };
    }
    // const message = () => `expected ${variableName} to be an arrow function`;
    // const pass = nodes.some((node) => node.parent?.type === 'ArrowFunctionExpression' ?? false);
    return {
      message: () => `expected ${variableName} to be an arrow function`,
      pass: nodes.some(
        (node) =>
          node.parent?.type === 'VariableDeclarator' &&
          node.parent?.init?.type === 'ArrowFunctionExpression',
      ),
    };
  };

  // Jest matcher to check if an identifier is part of object destructuring.
  const toBePartOfObjectDestructuring = (variableName) => {
    const nodes = findIdentifier(tree, variableName);
    if (nodes.length === 0) {
      return {
        message: () =>
          `expected ${variableName} to be part of object destructuring but an identifier matching that name was not found.`,
        pass: false,
      };
    }
    return {
      message: () => `expected ${variableName} to be initialized using object destructuring`,
      pass: nodes.some(
        (node) => node.parent?.kind === 'init' && node.parent?.parent?.type === 'ObjectPattern',
      ),
    };
  };

  return { tree, matchers: { toBeAnArrowFunction, toBePartOfObjectDestructuring } };
};
