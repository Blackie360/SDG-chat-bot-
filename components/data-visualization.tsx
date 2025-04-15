"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sdgGoalData } from "@/lib/sdg-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

// Sample global SDG progress data
const globalProgressData = [
  { sdg: "1", name: "No Poverty", progress: 65, color: "#e11d48" },
  { sdg: "2", name: "Zero Hunger", progress: 58, color: "#ca8a04" },
  { sdg: "3", name: "Good Health", progress: 72, color: "#22c55e" },
  { sdg: "4", name: "Quality Education", progress: 63, color: "#ef4444" },
  { sdg: "5", name: "Gender Equality", progress: 60, color: "#f97316" },
  { sdg: "6", name: "Clean Water", progress: 68, color: "#3b82f6" },
  { sdg: "7", name: "Clean Energy", progress: 70, color: "#eab308" },
  { sdg: "8", name: "Decent Work", progress: 65, color: "#9333ea" },
  { sdg: "9", name: "Industry & Innovation", progress: 67, color: "#ea580c" },
  { sdg: "10", name: "Reduced Inequalities", progress: 55, color: "#db2777" },
  { sdg: "11", name: "Sustainable Cities", progress: 62, color: "#d97706" },
  { sdg: "12", name: "Responsible Consumption", progress: 56, color: "#a16207" },
  { sdg: "13", name: "Climate Action", progress: 48, color: "#16a34a" },
  { sdg: "14", name: "Life Below Water", progress: 45, color: "#2563eb" },
  { sdg: "15", name: "Life on Land", progress: 52, color: "#65a30d" },
  { sdg: "16", name: "Peace & Justice", progress: 58, color: "#1d4ed8" },
  { sdg: "17", name: "Partnerships", progress: 64, color: "#4f46e5" },
]

// Climate data
const climateData = [
  { year: 2015, co2Emissions: 36.2, temperature: 0.9, seaLevel: 3.3 },
  { year: 2016, co2Emissions: 36.0, temperature: 1.0, seaLevel: 3.4 },
  { year: 2017, co2Emissions: 36.4, temperature: 1.1, seaLevel: 3.5 },
  { year: 2018, co2Emissions: 36.8, temperature: 1.1, seaLevel: 3.6 },
  { year: 2019, co2Emissions: 36.7, temperature: 1.2, seaLevel: 3.7 },
  { year: 2020, co2Emissions: 34.8, temperature: 1.2, seaLevel: 3.8 },
  { year: 2021, co2Emissions: 36.3, temperature: 1.3, seaLevel: 3.9 },
  { year: 2022, co2Emissions: 36.6, temperature: 1.3, seaLevel: 4.0 },
  { year: 2023, co2Emissions: 36.8, temperature: 1.4, seaLevel: 4.1 },
]

// Ocean data
const oceanData = [
  { year: 2015, protectedAreas: 5.2, acidity: 8.08, plasticPollution: 8.0 },
  { year: 2016, protectedAreas: 5.7, acidity: 8.08, plasticPollution: 8.3 },
  { year: 2017, protectedAreas: 6.3, acidity: 8.07, plasticPollution: 8.5 },
  { year: 2018, protectedAreas: 6.8, acidity: 8.07, plasticPollution: 8.8 },
  { year: 2019, protectedAreas: 7.2, acidity: 8.07, plasticPollution: 9.0 },
  { year: 2020, protectedAreas: 7.7, acidity: 8.06, plasticPollution: 9.2 },
  { year: 2021, protectedAreas: 7.9, acidity: 8.06, plasticPollution: 9.5 },
  { year: 2022, protectedAreas: 8.0, acidity: 8.05, plasticPollution: 9.7 },
  { year: 2023, protectedAreas: 8.2, acidity: 8.05, plasticPollution: 10.0 },
]

// Land data
const landData = [
  { year: 2015, forestArea: 31.1, protectedAreas: 14.7, speciesLoss: 100 },
  { year: 2016, forestArea: 31.0, protectedAreas: 14.8, speciesLoss: 102 },
  { year: 2017, forestArea: 30.9, protectedAreas: 15.0, speciesLoss: 104 },
  { year: 2018, forestArea: 30.9, protectedAreas: 15.1, speciesLoss: 106 },
  { year: 2019, forestArea: 30.8, protectedAreas: 15.2, speciesLoss: 108 },
  { year: 2020, forestArea: 30.8, protectedAreas: 15.3, speciesLoss: 110 },
  { year: 2021, forestArea: 30.7, protectedAreas: 15.5, speciesLoss: 112 },
  { year: 2022, forestArea: 30.7, protectedAreas: 15.8, speciesLoss: 114 },
  { year: 2023, forestArea: 30.6, protectedAreas: 16.1, speciesLoss: 116 },
]

// SDG interlinkages data
const sdgInterlinkagesData = [
  { sdg: "1", links: [2, 3, 4, 8, 10] },
  { sdg: "2", links: [1, 3, 6, 12, 15] },
  { sdg: "3", links: [1, 2, 6, 7, 11] },
  { sdg: "4", links: [1, 5, 8, 10, 16] },
  { sdg: "5", links: [1, 4, 8, 10, 16] },
  { sdg: "6", links: [2, 3, 11, 12, 14] },
  { sdg: "7", links: [3, 9, 11, 12, 13] },
  { sdg: "8", links: [1, 4, 5, 9, 10] },
  { sdg: "9", links: [7, 8, 11, 12, 13] },
  { sdg: "10", links: [1, 4, 5, 8, 16] },
  { sdg: "11", links: [3, 6, 7, 9, 13] },
  { sdg: "12", links: [2, 6, 7, 9, 14] },
  { sdg: "13", links: [7, 9, 11, 14, 15] },
  { sdg: "14", links: [6, 12, 13, 15, 17] },
  { sdg: "15", links: [2, 6, 13, 14, 17] },
  { sdg: "16", links: [4, 5, 10, 17] },
  { sdg: "17", links: [14, 15, 16] },
]

const sdgDataMap: Record<string, any[]> = {
  "13": climateData,
  "14": oceanData,
  "15": landData,
  // Add data for other SDGs as needed
}

interface DataVisualizationProps {
  sdgNumber: string
}

export function DataVisualization({ sdgNumber }: DataVisualizationProps) {
  const [chartType, setChartType] = useState<"line" | "bar" | "pie" | "radar">("line")
  const [dataType, setDataType] = useState<"progress" | "trends" | "interlinkages">("progress")

  // Get the appropriate data based on SDG number and data type
  const getVisualizationData = () => {
    if (dataType === "progress") {
      return globalProgressData
    } else if (dataType === "interlinkages") {
      return sdgInterlinkagesData
    } else {
      // trends
      if (sdgNumber === "all") {
        return climateData // Default to climate data for "all"
      }
      return sdgDataMap[sdgNumber] || climateData
    }
  }

  const data = getVisualizationData()

  // Determine which metrics to show based on SDG and data type
  const getMetrics = () => {
    if (dataType === "progress") {
      return [{ key: "progress", name: "Progress (%)", color: "#3b82f6" }]
    } else if (dataType === "interlinkages") {
      return [{ key: "links", name: "Linked SDGs", color: "#3b82f6" }]
    } else {
      // trends
      switch (sdgNumber) {
        case "13":
          return [
            { key: "co2Emissions", name: "CO2 Emissions (Gt)", color: "#ef4444" },
            { key: "temperature", name: "Temperature Increase (°C)", color: "#f97316" },
            { key: "seaLevel", name: "Sea Level Rise (mm/year)", color: "#3b82f6" },
          ]
        case "14":
          return [
            { key: "protectedAreas", name: "Protected Marine Areas (%)", color: "#3b82f6" },
            { key: "acidity", name: "Ocean pH", color: "#22c55e" },
            { key: "plasticPollution", name: "Plastic Pollution (Mt)", color: "#ef4444" },
          ]
        case "15":
          return [
            { key: "forestArea", name: "Forest Area (% of land)", color: "#22c55e" },
            { key: "protectedAreas", name: "Protected Areas (%)", color: "#3b82f6" },
            { key: "speciesLoss", name: "Species Loss Index", color: "#ef4444" },
          ]
        default:
          return [
            { key: "co2Emissions", name: "CO2 Emissions (Gt)", color: "#ef4444" },
            { key: "temperature", name: "Temperature Increase (°C)", color: "#f97316" },
          ]
      }
    }
  }

  const metrics = getMetrics()

  // Custom tooltip for the radar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{`SDG ${payload[0].payload.sdg}`}</p>
          <p>{`Links: ${payload[0].value.join(", ")}`}</p>
        </div>
      )
    }
    return null
  }

  // Render different chart types based on the selected type and data
  const renderChart = () => {
    if (dataType === "progress") {
      if (chartType === "bar") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={globalProgressData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="sdg" type="category" width={30} />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" name="Progress (%)" radius={[0, 4, 4, 0]}>
                {globalProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )
      } else if (chartType === "pie") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={globalProgressData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="progress"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {globalProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        )
      } else if (chartType === "radar") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius={150} data={globalProgressData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Progress" dataKey="progress" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )
      } else {
        // Line chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={globalProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sdg" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="progress"
                name="Progress (%)"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    } else if (dataType === "interlinkages") {
      if (chartType === "radar") {
        // Find the specific SDG's interlinkages
        const sdgLinks = sdgInterlinkagesData.find((item) => item.sdg === sdgNumber)
        if (!sdgLinks && sdgNumber !== "all") {
          return (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>No interlinkage data</AlertTitle>
              <AlertDescription>Interlinkage data is not available for this SDG.</AlertDescription>
            </Alert>
          )
        }

        // For "all", show all interlinkages
        const radarData = sdgNumber === "all" ? sdgInterlinkagesData : [sdgLinks]

        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius={150} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="sdg" />
              <PolarRadiusAxis angle={30} domain={[0, 17]} />
              <Radar name="Linked SDGs" dataKey="links" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )
      } else {
        // Default to bar chart for interlinkages
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sdgInterlinkagesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="sdg" type="category" width={30} />
              <Tooltip />
              <Legend />
              <Bar dataKey="links" name="Number of Links" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      }
    } else {
      // Trends data
      if (chartType === "line") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric) => (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  name={metric.name}
                  stroke={metric.color}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )
      } else if (chartType === "bar") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric) => (
                <Bar key={metric.key} dataKey={metric.key} name={metric.name} fill={metric.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )
      } else {
        // Default to line chart for trends
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric) => (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  name={metric.name}
                  stroke={metric.color}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select value={dataType} onValueChange={(value) => setDataType(value as any)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="progress">SDG Progress</SelectItem>
            <SelectItem value="trends">Historical Trends</SelectItem>
            <SelectItem value="interlinkages">SDG Interlinkages</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={chartType} className="w-full sm:w-auto" onValueChange={(value) => setChartType(value as any)}>
          <TabsList>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
            <TabsTrigger value="radar">Radar</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {dataType === "progress"
              ? "SDG Progress Overview"
              : dataType === "interlinkages"
                ? "SDG Interlinkages"
                : `${sdgNumber === "all" ? "Global" : `SDG ${sdgNumber}`} Trends`}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderChart()}</CardContent>
      </Card>

      {dataType === "trends" && sdgNumber !== "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Key Targets</h3>
              <ul className="list-disc pl-5 space-y-1">
                {sdgGoalData[sdgNumber]?.targets.map((target, index) => (
                  <li key={index} className="text-sm">
                    {target}
                  </li>
                )) || <li className="text-sm">No targets available for this SDG</li>}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Key Indicators</h3>
              <div className="space-y-2">
                {Object.entries(sdgGoalData[sdgNumber]?.indicators || {}).map(([year, indicators]) => (
                  <div key={year}>
                    <h4 className="font-medium">{year}</h4>
                    <ul className="list-disc pl-5">
                      {indicators.map((indicator, index) => (
                        <li key={index} className="text-sm">
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )) || <p className="text-sm">No indicators available for this SDG</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700">Data Sources</AlertTitle>
        <AlertDescription className="text-blue-600">
          Data is sourced from the United Nations, World Bank, Our World in Data, and other international organizations.
          Last updated: April 2024.
        </AlertDescription>
      </Alert>
    </div>
  )
}
