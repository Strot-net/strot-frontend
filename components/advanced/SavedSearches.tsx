import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Save, Clock, X, Search, Star } from 'lucide-react';
import { SavedSearch, AdvancedFilters } from './constants';
import { ScrollAnimatedSection } from '../ScrollAnimatedSection';

interface SavedSearchesProps {
  savedSearches: SavedSearch[];
  onLoadSearch: (search: SavedSearch) => void;
  onDeleteSearch: (searchId: string) => void;
  onSaveCurrentSearch: (name: string) => void;
  currentFilters: AdvancedFilters;
}

export function SavedSearches({
  savedSearches,
  onLoadSearch,
  onDeleteSearch,
  onSaveCurrentSearch,
  currentFilters
}: SavedSearchesProps) {
  const hasActiveFilters = currentFilters.keywords || 
    currentFilters.location || 
    currentFilters.jobTypes.length > 0 ||
    currentFilters.industries.length > 0;

  const handleSaveSearch = () => {
    const name = currentFilters.keywords || 'Custom Search';
    onSaveCurrentSearch(name);
  };

  return (
    <div className="space-y-6">
      {/* Save Current Search */}
      {hasActiveFilters && (
        <ScrollAnimatedSection animation="fadeUp">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2">Save Current Search</h3>
                <p className="text-sm text-muted-foreground">
                  Save your current filters to quickly access them later
                </p>
              </div>
              <Button onClick={handleSaveSearch}>
                <Save className="w-4 h-4 mr-2" />
                Save Search
              </Button>
            </div>
          </Card>
        </ScrollAnimatedSection>
      )}

      {/* Saved Searches List */}
      <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
        <Card className="p-6">
          <h3 className="mb-4">Your Saved Searches</h3>
          
          {savedSearches.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="mb-2">No Saved Searches</h4>
              <p className="text-muted-foreground">
                Save your search criteria to quickly find relevant jobs later
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedSearches.map((search, index) => (
                <motion.div
                  key={search.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm">{search.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {search.createdAt.toLocaleDateString()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {search.filters.keywords && (
                            <div>Keywords: {search.filters.keywords}</div>
                          )}
                          {search.filters.location && (
                            <div>Location: {search.filters.location}</div>
                          )}
                          {search.filters.jobTypes.length > 0 && (
                            <div>Job Types: {search.filters.jobTypes.join(', ')}</div>
                          )}
                          {search.filters.industries.length > 0 && (
                            <div>Industries: {search.filters.industries.slice(0, 3).join(', ')}
                              {search.filters.industries.length > 3 && ` +${search.filters.industries.length - 3} more`}
                            </div>
                          )}
                          {search.filters.salaryRange[0] > 0 || search.filters.salaryRange[1] < 300000 && (
                            <div>
                              Salary: ${search.filters.salaryRange[0].toLocaleString()} - ${search.filters.salaryRange[1].toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => onLoadSearch(search)}
                        >
                          Load Search
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteSearch(search.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </ScrollAnimatedSection>

      {/* Quick Searches */}
      <ScrollAnimatedSection animation="fadeUp" delay={0.2}>
        <Card className="p-6">
          <h3 className="mb-4">Popular Searches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Remote Frontend Jobs', filters: { keywords: 'frontend', remoteOnly: true, jobTypes: ['Full-time'] } },
              { name: 'Senior Developer Roles', filters: { keywords: 'senior developer', experienceLevels: ['Senior Level'] } },
              { name: 'Tech Startups', filters: { industries: ['Technology'], companySizes: ['1-10', '11-50'] } },
              { name: 'High Salary Positions', filters: { salaryRange: [120000, 300000] } }
            ].map((quickSearch, index) => (
              <motion.div
                key={quickSearch.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-4"
                  onClick={() => {
                    const search: SavedSearch = {
                      id: Date.now().toString(),
                      name: quickSearch.name,
                      filters: { ...currentFilters, ...quickSearch.filters } as AdvancedFilters,
                      createdAt: new Date()
                    };
                    onLoadSearch(search);
                  }}
                >
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{quickSearch.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Popular among job seekers
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </ScrollAnimatedSection>
    </div>
  );
}