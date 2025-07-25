import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { AdvancedFilters } from './constants';

interface BasicSearchFiltersProps {
  filters: AdvancedFilters;
  onFilterChange: (key: keyof AdvancedFilters, value: any) => void;
  onSearch: () => void;
  onClearFilters: () => void;
  isSearching: boolean;
  activeFilterCount: number;
}

export function BasicSearchFilters({
  filters,
  onFilterChange,
  onSearch,
  onClearFilters,
  isSearching,
  activeFilterCount
}: BasicSearchFiltersProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Keywords</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Job title, skills, company..."
                value={filters.keywords}
                onChange={(e) => onFilterChange('keywords', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="City, state, or remote"
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Salary Range</Label>
            <div className="px-3 py-2 border border-border rounded-md">
              <Slider
                value={filters.salaryRange}
                onValueChange={(value) => onFilterChange('salaryRange', value as [number, number])}
                max={300000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>${filters.salaryRange[0].toLocaleString()}</span>
                <span>${filters.salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={onSearch} disabled={isSearching} className="flex-shrink-0">
            {isSearching ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search Jobs
              </>
            )}
          </Button>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Switch
                checked={filters.remoteOnly}
                onCheckedChange={(checked) => onFilterChange('remoteOnly', checked)}
              />
              <Label className="text-sm">Remote Only</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={filters.urgentOnly}
                onCheckedChange={(checked) => onFilterChange('urgentOnly', checked)}
              />
              <Label className="text-sm">Urgent Hiring</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={filters.verifiedOnly}
                onCheckedChange={(checked) => onFilterChange('verifiedOnly', checked)}
              />
              <Label className="text-sm">Verified Only</Label>
            </div>
          </div>
          
          {activeFilterCount > 0 && (
            <Button variant="outline" onClick={onClearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}