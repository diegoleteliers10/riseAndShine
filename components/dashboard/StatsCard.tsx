import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}