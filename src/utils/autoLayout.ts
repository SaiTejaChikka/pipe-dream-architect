import dagre from 'dagre';
import { Node, Edge, Position } from '@xyflow/react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const applyAutoLayout = (nodes: Node[], edges: Edge[]) => {
  // Configure the graph
  dagreGraph.setGraph({ 
    rankdir: 'LR', // Left to Right layout
    nodesep: 100,  // Horizontal spacing between nodes
    ranksep: 150,  // Vertical spacing between ranks
  });

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { 
      width: 120, 
      height: 60 
    });
  });

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply calculated positions to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return { 
    nodes: layoutedNodes, 
    edges 
  };
};