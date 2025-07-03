import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PipelineNode } from './PipelineNode';
import { PipelineControls } from './PipelineControls';
import { ValidationStatus } from './ValidationStatus';
import { AddNodeModal } from './AddNodeModal';
import { validateDAG } from '../utils/dagValidation';
import { applyAutoLayout } from '../utils/autoLayout';

const nodeTypes = {
  pipeline: PipelineNode,
};

let nodeId = 1;
const getNodeId = () => `node_${nodeId++}`;

export const PipelineEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState(false);
  const [validationResult, setValidationResult] = useState({ isValid: false, errors: [] });
  
  const { fitView } = useReactFlow();

  // Validate DAG whenever nodes or edges change
  useEffect(() => {
    const result = validateDAG(nodes, edges);
    setValidationResult(result);
  }, [nodes, edges]);

  // Handle keyboard events for deletion
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        setNodes((nds) => nds.filter((node) => !node.selected));
        setEdges((eds) => eds.filter((edge) => !edge.selected));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      // Prevent self-connections
      if (params.source === params.target) {
        return;
      }

      const newEdge: Edge = {
        ...params,
        id: `edge_${params.source}_${params.target}`,
        animated: true,
        style: { stroke: 'hsl(var(--edge-default))' },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const handleAddNode = (label: string) => {
    const newNode: Node = {
      id: getNodeId(),
      type: 'pipeline',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
    setIsAddNodeModalOpen(false);
  };

  const handleAutoLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = applyAutoLayout(nodes, edges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    
    // Fit view after layout
    setTimeout(() => {
      fitView({ duration: 800 });
    }, 100);
  };

  const handleClearAll = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="h-screen w-full bg-pipeline-bg">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pipeline Editor</h1>
              <p className="text-sm text-muted-foreground">
                Create and manage data processing workflows
              </p>
            </div>
            <ValidationStatus result={validationResult} />
          </div>
        </div>

        {/* Pipeline Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            className="pipeline-flow"
            proOptions={{ hideAttribution: true }}
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              color="hsl(var(--border))"
            />
            <Controls 
              position="bottom-right"
              className="react-flow__controls-button"
            />
          </ReactFlow>

          {/* Floating Controls */}
          <PipelineControls
            onAddNode={() => setIsAddNodeModalOpen(true)}
            onAutoLayout={handleAutoLayout}
            onClearAll={handleClearAll}
            nodeCount={nodes.length}
          />
        </div>
      </div>

      {/* Add Node Modal */}
      <AddNodeModal
        isOpen={isAddNodeModalOpen}
        onClose={() => setIsAddNodeModalOpen(false)}
        onAddNode={handleAddNode}
      />
    </div>
  );
};