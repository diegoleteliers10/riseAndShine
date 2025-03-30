import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from '../ui/badge';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  cambioPorcentual?: number;
}

export function StatsCard({ title, value, icon, cambioPorcentual }: StatsCardProps) {

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent backdrop-blur-sm" />
      <CardContent className="relative p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cloud-light/20 to-cloud-light/10 shadow-inner">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-cloud-dark/60">{title}</p>
            <p className="text-2xl font-semibold text-cloud-dark">{value}</p>
            {cambioPorcentual !== undefined && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      className="bg-cloud-light/20 border-none"
                      variant="outline"
                    >
                    <span className={`text-sm ${cambioPorcentual > 0 ? 'text-green-500' : cambioPorcentual < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                      {cambioPorcentual >= 0 ? `+${cambioPorcentual.toFixed(2)}%` : `${cambioPorcentual.toFixed(2)}%`}
                    </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className='text-[10px] w-30'>
                    <p>{cambioPorcentual >= 0 ? `haz tenido un aumento de +${cambioPorcentual.toFixed(2)}% con respecto al mes anterior` : `haz tenido una disminución de -${cambioPorcentual.toFixed(2)}%`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}