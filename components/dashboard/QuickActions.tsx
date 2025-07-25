import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  route: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onNavigate: (route: string) => void;
}

export function QuickActions({ actions, onNavigate }: QuickActionsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {actions.map((action) => (
            <Button 
              key={action.route}
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate(action.route)}
            >
              <action.icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Profile Strength</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Completion</span>
            <span className="text-sm font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Complete your profile to get better job matches
          </p>
          <Button size="sm" onClick={() => onNavigate('profile')}>
            Complete Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}