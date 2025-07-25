import { AdvancedFilters, defaultFilters } from './constants';

export const updateFilter = <K extends keyof AdvancedFilters>(
  filters: AdvancedFilters,
  key: K,
  value: AdvancedFilters[K]
): AdvancedFilters => {
  return { ...filters, [key]: value };
};

export const toggleArrayFilter = (
  filters: AdvancedFilters,
  key: keyof AdvancedFilters,
  value: string
): AdvancedFilters => {
  const currentArray = filters[key] as string[];
  const newArray = currentArray.includes(value)
    ? currentArray.filter(item => item !== value)
    : [...currentArray, value];
  return { ...filters, [key]: newArray as any };
};

export const clearAllFilters = (): AdvancedFilters => {
  return { ...defaultFilters };
};

export const countActiveFilters = (filters: AdvancedFilters): number => {
  let count = 0;
  if (filters.keywords) count++;
  if (filters.location) count++;
  if (filters.jobTypes.length) count++;
  if (filters.experienceLevels.length) count++;
  if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 300000) count++;
  if (filters.industries.length) count++;
  if (filters.companySizes.length) count++;
  if (filters.workArrangements.length) count++;
  if (filters.postedWithin) count++;
  if (filters.benefits.length) count++;
  if (filters.skills.length) count++;
  if (filters.companyRating > 0) count++;
  if (filters.urgentOnly) count++;
  if (filters.verifiedOnly && filters.verifiedOnly !== defaultFilters.verifiedOnly) count++;
  if (filters.remoteOnly) count++;
  if (filters.hasEquity) count++;
  if (filters.hasBonus) count++;
  return count;
};

export interface SavedSearch {
  id: string;
  name: string;
  filters: AdvancedFilters;
  createdAt: Date;
}

export const createSavedSearch = (filters: AdvancedFilters, name?: string): SavedSearch => {
  return {
    id: Date.now().toString(),
    name: name || filters.keywords || 'Custom Search',
    filters: { ...filters },
    createdAt: new Date()
  };
};