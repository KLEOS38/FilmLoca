import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Bed } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BedroomCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
}

const BedroomCounter: React.FC<BedroomCounterProps> = ({
  value,
  onChange,
  min = 0,
  max = 20,
  className,
  disabled = false
}) => {
  const handleDecrease = () => {
    if (!disabled && value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (!disabled && value < max) {
      onChange(value + 1);
    }
  };

  return (
    <Card className={cn('overflow-hidden', 'p-4 bg-white/80 rounded-lg border border-pastel-green/30 shadow-sm transition-all duration-200 hover:shadow-md hover:border-pastel-green/60', className)}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-base font-semibold flex items-center gap-2">
            <span className="text-lg">🛏️</span>
            Bedrooms
          </span>
          
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDecrease}
              disabled={disabled || value <= min}
              className="w-8 h-8 p-0 rounded-full border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </Button>
            
            <div className="w-12 text-center">
              <span className="text-lg font-semibold text-gray-900">{value}</span>
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleIncrease}
              disabled={disabled || value >= max}
              className="w-8 h-8 p-0 rounded-full border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <span className="text-sm text-gray-600 block">
          {value === 0 
            ? 'Select the number of bedrooms available' 
            : value === 1 
              ? '1 bedroom available' 
              : `${value} bedrooms available`
          }
        </span>
      </CardContent>
    </Card>
  );
};

export default BedroomCounter;
