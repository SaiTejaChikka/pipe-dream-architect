import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PipelineControlsProps {
  onAddNode: () => void;
  onAutoLayout: () => void;
  onClearAll: () => void;
  nodeCount: number;
}

export const PipelineControls: React.FC<PipelineControlsProps> = ({
  onAddNode,
  onAutoLayout,
  onClearAll,
  nodeCount,
}) => {
  return (
    <Card className="absolute top-4 left-4 p-4 bg-card/95 backdrop-blur-sm border border-border shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-foreground mb-2">Pipeline Controls</div>
        
        <Button 
          onClick={onAddNode}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Add Node
        </Button>
        
        <Button 
          onClick={onAutoLayout}
          variant="outline"
          disabled={nodeCount < 2}
          className="w-full"
        >
          Auto Layout
        </Button>
        
        <Button 
          onClick={onClearAll}
          variant="destructive"
          disabled={nodeCount === 0}
          className="w-full"
        >
          Clear All
        </Button>
        
        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
          <div>Nodes: {nodeCount}</div>
          <div className="mt-1">Press Delete to remove selected items</div>
        </div>
      </div>
    </Card>
  );
};