import React from 'react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface ValidationStatusProps {
  result: ValidationResult;
}

export const ValidationStatus: React.FC<ValidationStatusProps> = ({ result }) => {
  const { isValid, errors } = result;

  return (
    <Card className="p-4 bg-card border border-border min-w-[280px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Pipeline Status</span>
        <Badge 
          variant={isValid ? "default" : "destructive"}
          className={isValid ? "bg-success hover:bg-success/90" : ""}
        >
          {isValid ? 'Valid DAG' : 'Invalid DAG'}
        </Badge>
      </div>
      
      {errors.length > 0 && (
        <div className="mt-3">
          <div className="text-xs text-muted-foreground mb-2">Issues:</div>
          <ul className="text-xs space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-destructive flex items-start">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive mt-1.5 mr-2 flex-shrink-0" />
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isValid && (
        <div className="mt-2 text-xs text-success">
          ✓ Pipeline is ready for execution
        </div>
      )}
    </Card>
  );
};