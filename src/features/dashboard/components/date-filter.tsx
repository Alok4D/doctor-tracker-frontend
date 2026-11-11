import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface DashboardHeaderProps {
  timeframe: string;
  onTimeframeChange: (val: string) => void;
  onExport?: () => void;
}

export function DashboardHeaderControls({
  timeframe,
  onTimeframeChange,
  onExport,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={timeframe}
        onChange={(e) => onTimeframeChange(e.target.value)}
        className="w-36 text-xs bg-white"
      >
        <option value="last_week">Last Week</option>
        <option value="last_month">Last Month</option>
        <option value="last_year">Last Year</option>
      </Select>

      <Button
        variant="default"
        size="sm"
        onClick={onExport}
        className="gap-1.5 text-xs bg-blue-600 hover:bg-blue-700"
      >
        <Download className="h-3.5 w-3.5" />
        <span>Export</span>
      </Button>
    </div>
  );
}
