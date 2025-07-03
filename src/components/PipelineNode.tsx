import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

export const PipelineNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div className={`
      bg-node-bg border-2 rounded-lg px-4 py-3 shadow-lg min-w-[120px] transition-all duration-200
      ${selected 
        ? 'border-primary shadow-xl ring-2 ring-primary/20' 
        : 'border-node-border hover:border-primary/50 hover:shadow-xl'
      }
    `}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-primary bg-background hover:bg-primary transition-colors"
      />
      
      <div className="text-center">
        <div className="font-medium text-foreground text-sm">
          {(data as any)?.label || 'Node'}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-primary bg-background hover:bg-primary transition-colors"
      />
    </div>
  );
};