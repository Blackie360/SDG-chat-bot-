import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Globe, Users, FileText, Video } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResourceLinksProps {
  sdgNumber: string
}

// Resource data for different SDGs
const resourceData: Record<string, Array<{ name: string; url: string; description: string; type: string }>> = {
  "1": [
    {
      name: "World Bank - Poverty",
      url: "https://www.worldbank.org/en/topic/poverty",
      description: "Research, data, and solutions for ending extreme poverty",
      type: "organization",
    },
    {
      name: "UN Poverty Eradication",
      url: "https://www.un.org/development/desa/socialperspectiveondevelopment/issues/poverty-eradication.html",
      description: "UN initiatives to eradicate poverty worldwide",
      type: "organization",
    },
    {
      name: "Poverty Action Lab",
      url: "https://www.povertyactionlab.org/",
      description: "Research center working to reduce poverty through evidence-based policy",
      type: "organization",
    },
    {
      name: "Global Poverty Project",
      url: "https://www.globalcitizen.org/en/",
      description: "Movement of engaged citizens working to end extreme poverty by 2030",
      type: "organization",
    },
    {
      name: "World Poverty Clock",
      url: "https://worldpoverty.io/",
      description: "Real-time visualization of global poverty data",
      type: "tool",
    },
  ],
  "13": [
    {
      name: "United Nations Framework Convention on Climate Change (UNFCCC)",
      url: "https://unfccc.int/",
      description: "The UN body responsible for supporting the global response to climate change",
      type: "organization",
    },
    {
      name: "Intergovernmental Panel on Climate Change (IPCC)",
      url: "https://www.ipcc.ch/",
      description: "The UN body for assessing the science related to climate change",
      type: "organization",
    },
    {
      name: "Climate Action Network (CAN)",
      url: "https://climatenetwork.org/",
      description: "A worldwide network of over 1,300 NGOs working to promote climate action",
      type: "organization",
    },
    {
      name: "Global Climate Action Portal",
      url: "https://climateaction.unfccc.int/",
      description: "Platform showcasing climate actions from countries, cities, and organizations",
      type: "tool",
    },
    {
      name: "Climate Analytics",
      url: "https://climateanalytics.org/",
      description: "Non-profit organization providing science-based policy analysis on climate change",
      type: "organization",
    },
    {
      name: "NASA Global Climate Change",
      url: "https://climate.nasa.gov/",
      description: "NASA's hub for climate science with vital signs, evidence, causes, and effects",
      type: "tool",
    },
    {
      name: "Climate Change: The Science",
      url: "https://www.youtube.com/watch?v=ifrHogDujXw",
      description: "Educational video explaining the science behind climate change",
      type: "media",
    },
    {
      name: "IPCC Sixth Assessment Report",
      url: "https://www.ipcc.ch/report/ar6/syr/",
      description: "The latest comprehensive assessment of climate change science",
      type: "publication",
    },
  ],
  "14": [
    {
      name: "United Nations Ocean Conference",
      url: "https://www.un.org/en/conferences/ocean2022",
      description: "UN platform for supporting the implementation of SDG 14",
      type: "organization",
    },
    {
      name: "Ocean Conservancy",
      url: "https://oceanconservancy.org/",
      description: "Organization working to protect the ocean from today's greatest global challenges",
      type: "organization",
    },
    {
      name: "Marine Conservation Institute",
      url: "https://marine-conservation.org/",
      description: "Non-profit dedicated to securing permanent, strong protection for ocean ecosystems",
      type: "organization",
    },
    {
      name: "Global Ocean Alliance",
      url: "https://www.gov.uk/government/topical-events/global-ocean-alliance-30by30-initiative",
      description: "Alliance advocating for protecting 30% of the global ocean by 2030",
      type: "organization",
    },
    {
      name: "Oceana",
      url: "https://oceana.org/",
      description: "Largest international advocacy organization focused solely on ocean conservation",
      type: "organization",
    },
    {
      name: "Global Fishing Watch",
      url: "https://globalfishingwatch.org/",
      description: "Interactive map tracking global fishing activity in near real-time",
      type: "tool",
    },
  ],
  "15": [
    {
      name: "United Nations Convention on Biological Diversity (CBD)",
      url: "https://www.cbd.int/",
      description: "International legal instrument for the conservation of biodiversity",
      type: "organization",
    },
    {
      name: "International Union for Conservation of Nature (IUCN)",
      url: "https://www.iucn.org/",
      description: "Global authority on the status of the natural world and conservation measures",
      type: "organization",
    },
    {
      name: "World Wildlife Fund (WWF)",
      url: "https://www.worldwildlife.org/",
      description: "Leading organization in wildlife conservation and endangered species protection",
      type: "organization",
    },
    {
      name: "Global Forest Watch",
      url: "https://www.globalforestwatch.org/",
      description: "Online platform providing data and tools for monitoring forests",
      type: "tool",
    },
    {
      name: "Convention to Combat Desertification (UNCCD)",
      url: "https://www.unccd.int/",
      description: "UN convention addressing desertification and land degradation",
      type: "organization",
    },
  ],
}

// Default resources for any SDG
const defaultResources = [
  {
    name: "United Nations Sustainable Development Goals",
    url: "https://sdgs.un.org/goals",
    description: "Official UN platform for the Sustainable Development Goals",
    type: "organization",
  },
  {
    name: "SDG Tracker",
    url: "https://sdg-tracker.org/",
    description: "Our World in Data's SDG Tracker presents data across all available indicators",
    type: "tool",
  },
  {
    name: "UN Development Programme",
    url: "https://www.undp.org/sustainable-development-goals",
    description: "UNDP's work on implementing the Sustainable Development Goals",
    type: "organization",
  },
  {
    name: "Global SDG Indicators Database",
    url: "https://unstats.un.org/sdgs/indicators/database/",
    description: "Official UN database of SDG indicators",
    type: "tool",
  },
  {
    name: "SDG Knowledge Hub",
    url: "https://sdg.iisd.org/",
    description: "International Institute for Sustainable Development's SDG news and analysis",
    type: "publication",
  },
]

export function ResourceLinks({ sdgNumber }: ResourceLinksProps) {
  // Get SDG-specific resources or use defaults
  const resources = sdgNumber !== "all" ? resourceData[sdgNumber] || [] : []

  // Combine all resources for "all" SDGs view
  const allResources = sdgNumber === "all" ? Object.values(resourceData).flat() : resources

  // Group resources by type
  const organizationResources = allResources.filter((r) => r.type === "organization")
  const toolResources = allResources.filter((r) => r.type === "tool")
  const publicationResources = allResources.filter((r) => r.type === "publication")
  const mediaResources = allResources.filter((r) => r.type === "media")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="organizations" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="organizations" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Organizations</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="publications" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Publications</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Media</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organizations" className="mt-4">
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            {(organizationResources.length > 0
              ? organizationResources
              : defaultResources.filter((r) => r.type === "organization")
            ).map((resource, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      {resource.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardTitle>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}

            {organizationResources.length === 0 && sdgNumber !== "all" && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">
                    Specific organization resources for SDG {sdgNumber} are not available yet. Please check the general
                    resources below.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="mt-4">
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            {(toolResources.length > 0 ? toolResources : defaultResources.filter((r) => r.type === "tool")).map(
              (resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                      >
                        {resource.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardTitle>
                    <CardDescription className="text-sm">{resource.description}</CardDescription>
                  </CardHeader>
                </Card>
              ),
            )}

            {toolResources.length === 0 && sdgNumber !== "all" && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">
                    Specific tool resources for SDG {sdgNumber} are not available yet. Please check the general
                    resources below.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="publications" className="mt-4">
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            {(publicationResources.length > 0
              ? publicationResources
              : defaultResources.filter((r) => r.type === "publication")
            ).map((resource, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      {resource.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardTitle>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}

            {publicationResources.length === 0 && sdgNumber !== "all" && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">
                    Specific publication resources for SDG {sdgNumber} are not available yet. Please check the general
                    resources below.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-4">
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            {(mediaResources.length > 0 ? mediaResources : defaultResources.filter((r) => r.type === "media")).map(
              (resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                      >
                        {resource.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardTitle>
                    <CardDescription className="text-sm">{resource.description}</CardDescription>
                  </CardHeader>
                </Card>
              ),
            )}

            {mediaResources.length === 0 && sdgNumber !== "all" && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">
                    Specific media resources for SDG {sdgNumber} are not available yet. Please check the general
                    resources below.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">General SDG Resources</h3>
        <div className="grid grid-cols-1 gap-4">
          {defaultResources.map((resource, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    {resource.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardTitle>
                <CardDescription className="text-sm">{resource.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-medium text-blue-700 mb-1">Get Involved</h3>
          <p className="text-sm text-blue-600">
            These resources provide information on how you can contribute to achieving the Sustainable Development
            Goals. Visit their websites to learn about volunteer opportunities, campaigns, and actions you can take.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
