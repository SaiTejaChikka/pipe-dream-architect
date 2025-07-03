import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { PipelineEditor } from './PipelineEditor';

export const PipelineEditorWrapper: React.FC = () => {
  return (
    <ReactFlowProvider>
      <PipelineEditor />
    </ReactFlowProvider>
  );
};