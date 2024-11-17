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
  const [, setContributions] = useState<ContributionDay[]>([]);
  const [weekGroups, setWeekGroups] = useState<ContributionDay[][]>([]);

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
        const sortedData = dummyData.reverse();
        setContributions(sortedData);
        
        // Group contributions by weeks
        const groups: ContributionDay[][] = [];
        for (let i = 0; i < sortedData.length; i += 7) {
          groups.push(sortedData.slice(i, i + 7));
        }
        setWeekGroups(groups);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Contribution Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[750px] md:min-w-0">
          {/* Month labels */}
          <div className="flex mb-2 text-sm text-muted-foreground">
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() - 11 + i);
              return (
                <div
                  key={i}
                  className="flex-1 text-center"
                >
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </div>
              );
            })}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 pr-2 text-xs text-muted-foreground">
              <div className="h-3">Mon</div>
              <div className="h-3"></div>
              <div className="h-3">Wed</div>
              <div className="h-3"></div>
              <div className="h-3">Fri</div>
              <div className="h-3"></div>
              <div className="h-3">Sun</div>
            </div>

            {/* Contribution squares */}
            <div className="flex gap-1 flex-1">
              {weekGroups.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={`
                        w-3 h-3 
                        sm:w-3.5 sm:h-3.5 
                        md:w-4 md:h-4 
                        rounded-sm 
                        ${getColor(day.count)}
                        transition-colors
                        duration-200
                        hover:ring-2
                        hover:ring-offset-1
                        hover:ring-primary
                      `}
                      title={`${day.count} contributions on ${formatDate(day.date)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <span>Less</span>
            {[0, 3, 6, 9].map((count) => (
              <div
                key={count}
                className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                title={`${count} contributions`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}