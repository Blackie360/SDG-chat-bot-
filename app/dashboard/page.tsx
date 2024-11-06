"use client"

import { BarChart, LineChart, PieChart } from "lucide-react"
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Component() {
  // Sample data - in a real app, this would come from GitHub's API
  const contributionData = [
    { name: "Code", value: 68 },
    { name: "Issues", value: 45 },
    { name: "PRs", value: 70 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#c9d1d9]">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">GitSync Dashboard</h1>
        <Select defaultValue="month">
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 p-6 flex-1">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white">Repository Activity</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={contributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {contributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Distribution across activities</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white">Pull Requests</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold text-[#238636]">75%</div>
                  <div className="text-sm text-muted-foreground mt-2">Merge Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white">Issues</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#f85149]">24</div>
                    <div className="text-sm text-muted-foreground mt-2">Open</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#238636]">156</div>
                    <div className="text-sm text-muted-foreground mt-2">Closed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardHeader>
              <CardTitle className="text-white">Top Contributors</CardTitle>
              <CardDescription className="text-white/60">Monthly rankings based on activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Dev", commits: 127, prs: 23 },
                  { name: "John Coder", commits: 89, prs: 15 },
                  { name: "Alice Engineer", commits: 75, prs: 12 },
                ].map((contributor) => (
                  <div key={contributor.name} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{contributor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contributor.commits} commits • {contributor.prs} PRs
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{contributor.commits + contributor.prs} points</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#161b22] border-[#30363d]">
            <CardHeader>
              <CardTitle className="text-white">Repository Health</CardTitle>
              <CardDescription className="text-white/60">Key metrics overview</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-[#21262d]">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Code Coverage</p>
                        <p className="text-sm text-muted-foreground">Unit Tests</p>
                      </div>
                      <div className="font-medium text-[#238636]">92%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Build Success</p>
                        <p className="text-sm text-muted-foreground">Last 100 builds</p>
                      </div>
                      <div className="font-medium text-[#238636]">98%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Dependencies</p>
                        <p className="text-sm text-muted-foreground">Up to date</p>
                      </div>
                      <div className="font-medium text-[#f0883e]">87%</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}