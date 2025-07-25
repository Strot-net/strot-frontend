import { UniversalNavBar } from './UniversalNavBar';

interface PreLoginHeaderProps {
  onNavigate: (page: string) => void;
  currentPage?: string;
  showBackButton?: boolean;
  title?: string;
}

// This component is now deprecated in favor of UniversalNavBar
// It's kept for backward compatibility but delegates to UniversalNavBar
export function PreLoginHeader({ 
  onNavigate, 
  currentPage = 'landing',
  showBackButton = false,
  title
}: PreLoginHeaderProps) {
  // Use UniversalNavBar instead of the old custom implementation
  return <UniversalNavBar currentPage={currentPage} onNavigate={onNavigate} />;
}