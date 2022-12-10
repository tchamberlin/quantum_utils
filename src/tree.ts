export const combineProbabilitiesOr = probabilities => {
  return 1 - probabilities.reduce((acc, current) => acc * (1 - current), 1)
}

export const combineProbabilitiesAnd = probabilities => {
  return probabilities.reduce((acc, current) => acc * current, 1)
}

type NodeType = OperatorNodeType | NumberNodeType;

interface NumberNodeType {
  value: number;
  parent: OperatorNodeType;
}

interface OperatorNodeType {
  parent?: OperatorNodeType;
  left: NodeType;
  right: NodeType;
}

class OperatorNode implements OperatorNodeType {
  operator: string;
  parent: OperatorNodeType;
  left: NodeType;
  right: NodeType;
  constructor(operator: string, parent?: OperatorNodeType) {
    this.operator = operator;
    this.parent = parent || null;
  }
}

class NumberNode implements NumberNodeType {
  value: number;
  parent: OperatorNodeType;
  constructor(value: number, parent?: OperatorNodeType) {
    this.value = value;
    this.parent = parent || null;
  }
  
}



export class EncounterGraph {
  root: NodeType;
  

  // Start out as just a single node indicating the result of a single encounter
  constructor(number: number) {
    this.root = new NumberNode(number);
  }

  addEncounter(operator, number) {
    if (operator !== "and" && operator !== "or") {
      throw new Error("Operator must be and/or");
    }

    const opNode = new OperatorNode(operator);
    // The current top of the tree becomes the left side of the new operation
    opNode.left = this.root;
    opNode.right = new NumberNode(number, opNode);


    // The new root of our tree is this new operator node
    this.root = opNode;
  }

  inOrder(): Array<NodeType> {
    const visited: Array<NodeType> = [];
    const current = this.root;
    
    let traverse = (node) => {
      if (node.left) traverse(node.left);
      visited.push(node);
      if (node.right) traverse(node.right);
    };
  
    traverse(current);
    return visited;
  }

  postOrder() {
    const current = this.root;
    const stack = [];
  
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      if (node.operator) {
        const right = stack.pop();
        const left = stack.pop();
        console.log(left, node.operator, right)
        if (node.operator === "or") {
          stack.push(combineProbabilitiesOr([left, right]))
        } else if (node.operator === "and") {
          stack.push(combineProbabilitiesAnd([left, right]))
        } else {
          throw new Error("Operator must be and/or");
        }
      } else {
        stack.push(node.value)
      }
      console.log("stack", stack)
    };
  
    traverse(current);
    if (stack.length !== 1) {
      throw new Error("You fucked up");
    }
    return stack.pop();
  }
}
