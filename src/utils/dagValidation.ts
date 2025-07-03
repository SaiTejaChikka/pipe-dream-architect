import { Node, Edge } from '@xyflow/react';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateDAG = (nodes: Node[], edges: Edge[]): ValidationResult => {
  const errors: string[] = [];

  // Check 1: Minimum 2 nodes
  if (nodes.length < 2) {
    errors.push('Pipeline must have at least 2 nodes');
  }

  // Check 2: All nodes must be connected
  if (nodes.length > 0) {
    const connectedNodes = new Set<string>();
    edges.forEach(edge => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    const unconnectedNodes = nodes.filter(node => !connectedNodes.has(node.id));
    if (unconnectedNodes.length > 0) {
      errors.push(`${unconnectedNodes.length} node(s) are not connected to any edges`);
    }
  }

  // Check 3: No cycles (using DFS)
  if (nodes.length >= 2 && edges.length > 0) {
    const hasCycle = detectCycle(nodes, edges);
    if (hasCycle) {
      errors.push('Pipeline contains cycles - DAG must be acyclic');
    }
  }

  return {
    isValid: errors.length === 0 && nodes.length >= 2,
    errors,
  };
};

const detectCycle = (nodes: Node[], edges: Edge[]): boolean => {
  // Build adjacency list
  const graph: { [key: string]: string[] } = {};
  nodes.forEach(node => {
    graph[node.id] = [];
  });
  
  edges.forEach(edge => {
    if (graph[edge.source]) {
      graph[edge.source].push(edge.target);
    }
  });

  // DFS with recursion stack to detect cycles
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const dfs = (nodeId: string): boolean => {
    if (recursionStack.has(nodeId)) {
      return true; // Cycle detected
    }
    if (visited.has(nodeId)) {
      return false; // Already processed
    }

    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = graph[nodeId] || [];
    for (const neighbor of neighbors) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  };

  // Check all nodes for cycles
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) {
        return true;
      }
    }
  }

  return false;
};