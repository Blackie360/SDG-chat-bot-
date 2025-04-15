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
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { sdgGoalData } from "@/lib/sdg-data"

// Sample data - in a real app, this would come from an API or database
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

const sdgDataMap: Record<string, any[]> = {
  "13": climateData,
  "14": oceanData,
  "15": landData,
  // Add data for other SDGs as needed
}

interface ClimateDataChartProps {
  sdgNumber: string
}

export function ClimateDataChart({ sdgNumber }: ClimateDataChartProps) {
  const [chartType, setChartType] = useState<"bar" | "line">("line")

  // Get the appropriate data based on SDG number
  const data = sdgDataMap[sdgNumber] || climateData

  // Determine which metrics to show based on SDG
  const getMetrics = () => {
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

  const metrics = getMetrics()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs
          defaultValue="line"
          className="w-[200px]"
          onValueChange={(value) => setChartType(value as "bar" | "line")}
        >
          <TabsList>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent className="pt-3 sm:pt-6">
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
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
              ) : (
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
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <Card>
          <CardContent className="pt-3 sm:pt-6">
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
          <CardContent className="pt-3 sm:pt-6">
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
    </div>
  )
}
