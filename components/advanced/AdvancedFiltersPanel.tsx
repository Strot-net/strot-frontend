import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Filter, Star } from 'lucide-react';
import { AdvancedFilters, jobTypeOptions, experienceOptions, industryOptions, companySizeOptions, workArrangementOptions, benefitOptions, skillOptions, postedWithinOptions } from './constants';

interface AdvancedFiltersPanelProps {
  filters: AdvancedFilters;
  onFilterChange: (key: keyof AdvancedFilters, value: any) => void;
  onToggleArrayFilter: (key: keyof AdvancedFilters, value: string) => void;
}

export function AdvancedFiltersPanel({
  filters,
  onFilterChange,
  onToggleArrayFilter
}: AdvancedFiltersPanelProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5" />
        Advanced Filters
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Job Types */}
        <div className="space-y-3">
          <Label>Job Types</Label>
          <div className="space-y-2">
            {jobTypeOptions.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.jobTypes.includes(type)}
                  onCheckedChange={() => onToggleArrayFilter('jobTypes', type)}
                />
                <Label className="text-sm">{type}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Levels */}
        <div className="space-y-3">
          <Label>Experience Level</Label>
          <div className="space-y-2">
            {experienceOptions.map(level => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.experienceLevels.includes(level)}
                  onCheckedChange={() => onToggleArrayFilter('experienceLevels', level)}
                />
                <Label className="text-sm">{level}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="space-y-3">
          <Label>Industries</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {industryOptions.map(industry => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.industries.includes(industry)}
                  onCheckedChange={() => onToggleArrayFilter('industries', industry)}
                />
                <Label className="text-sm">{industry}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Company Size */}
        <div className="space-y-3">
          <Label>Company Size</Label>
          <div className="space-y-2">
            {companySizeOptions.map(size => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.companySizes.includes(size)}
                  onCheckedChange={() => onToggleArrayFilter('companySizes', size)}
                />
                <Label className="text-sm">{size} employees</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Work Arrangements */}
        <div className="space-y-3">
          <Label>Work Arrangements</Label>
          <div className="space-y-2">
            {workArrangementOptions.map(arrangement => (
              <div key={arrangement} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.workArrangements.includes(arrangement)}
                  onCheckedChange={() => onToggleArrayFilter('workArrangements', arrangement)}
                />
                <Label className="text-sm">{arrangement}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <Label>Additional Options</Label>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-sm">Posted Within</Label>
              <Select 
                value={filters.postedWithin} 
                onValueChange={(value) => onFilterChange('postedWithin', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  {postedWithinOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Minimum Company Rating</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[filters.companyRating]}
                  onValueChange={(value) => onFilterChange('companyRating', value[0])}
                  max={5}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-sm w-8">{filters.companyRating}</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.hasEquity}
                  onCheckedChange={(checked) => onFilterChange('hasEquity', checked)}
                />
                <Label className="text-sm">Stock Options/Equity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.hasBonus}
                  onCheckedChange={(checked) => onFilterChange('hasBonus', checked)}
                />
                <Label className="text-sm">Bonus Eligible</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
        <div className="space-y-3">
          <Label>Required Skills</Label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(skill => (
              <Button
                key={skill}
                variant={filters.skills.includes(skill) ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleArrayFilter('skills', skill)}
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Benefits</Label>
          <div className="flex flex-wrap gap-2">
            {benefitOptions.map(benefit => (
              <Button
                key={benefit}
                variant={filters.benefits.includes(benefit) ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleArrayFilter('benefits', benefit)}
              >
                {benefit}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}