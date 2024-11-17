import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionCalendarProps {
  username: string;
}

export function ContributionCalendar({ username }: ContributionCalendarProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Note: This is a simplified version as GitHub's contribution graph 
        // requires GraphQL API which needs authentication
        const today = new Date();
        const dummyData = Array.from({ length: 365 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          return {
            date: date.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 10),
          };
        });
        setContributions(dummyData.reverse());
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    };

    fetchContributions();
  }, [username]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted';
    if (count <= 3) return 'bg-primary/30';
    if (count <= 6) return 'bg-primary/60';
    return 'bg-primary';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Contribution Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-53 gap-1">
          {contributions.map((day) => (
            <div
              key={day.date}
              className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
              title={`${day.count} contributions on ${day.date}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}