"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Send, ArrowDown, Upload, Info, Globe, BookOpen, AlertTriangle } from "lucide-react"
import { sdgData } from "@/lib/sdg-data"
import { DataVisualization } from "@/components/data-visualization"
import { ResourceLinks } from "@/components/resource-links"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageItem } from "@/components/message-item"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define message type
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  experimental_attachments?: Array<{
    name: string
    contentType: string
    url: string
  }>
}

export default function SustainabilityAssistant() {
  const [selectedSDG, setSelectedSDG] = useState("all")
  const [activeTab, setActiveTab] = useState("chat")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `# Welcome to the Sustainable Development Goals Assistant!

I can help you with information about all 17 SDGs, provide data visualizations, and analyze images related to sustainability.

## How I can help you:

* Answer questions about any of the 17 SDGs
* Provide data and statistics on global progress
* Suggest actions you can take to support the goals
* Analyze images related to sustainability
* Share resources and success stories

**What would you like to know about sustainable development?**`,
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const checkScrollPosition = () => {
    if (!scrollAreaRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
    setShowScrollButton(!isNearBottom)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Update welcome message when SDG changes
    if (selectedSDG === "all") {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `# Welcome to the Sustainable Development Goals Assistant!

I can help you with information about all 17 SDGs, provide data visualizations, and analyze images related to sustainability.

## How I can help you:

* Answer questions about any of the 17 SDGs
* Provide data and statistics on global progress
* Suggest actions you can take to support the goals
* Analyze images related to sustainability
* Share resources and success stories

**What would you like to know about sustainable development?**`,
        },
      ])
    } else {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `# SDG ${selectedSDG}: ${sdgData[selectedSDG].title}

${sdgData[selectedSDG].description}

## Key aspects of this goal:

* Targets and indicators specific to SDG ${selectedSDG}
* Current global progress and challenges
* Actions individuals and organizations can take
* Success stories and innovations

**How can I help you with SDG ${selectedSDG} today?**`,
        },
      ])
    }
  }, [selectedSDG])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (imageFile) {
      await handleImageSubmit()
      return
    }

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setInput("")
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || "Failed to get response")
      }

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content || "I'm sorry, I couldn't generate a response.",
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)

      // Check if it's a recitation error
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes("RECITATION")) {
        setError("I need to provide information in a different way. Please try rephrasing your question.")
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `# I need to rephrase my response

I apologize, but I need to provide my answer in a different way. 

## How can I help?

* Could you rephrase your question?
* I can provide general information about SDGs without extensive quotations
* I can focus on specific aspects of your question rather than comprehensive overviews
* I can suggest actions or practical applications related to sustainable development

Please let me know how you'd like to proceed, and I'll do my best to assist you.`,
          },
        ])
      } else {
        setError("There was an error processing your request. Please try again.")
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "I'm sorry, there was an error processing your request. Please try again with a different question.",
          },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Switch to chat tab
    setActiveTab("chat")
  }

  const handleImageSubmit = async () => {
    if (!imageFile) return

    setIsAnalyzing(true)
    const formData = new FormData()
    formData.append("image", imageFile)
    formData.append("sdg", selectedSDG)

    // Add a user message showing the image was uploaded
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: "I've uploaded an image for sustainability analysis.",
      experimental_attachments: [
        {
          name: imageFile.name,
          contentType: imageFile.type,
          url: imagePreview as string,
        },
      ],
    }

    setMessages([...messages, userMessage])
    setError(null)

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to analyze image")

      const data = await response.json()

      // Add AI response
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: data.analysis,
        },
      ])

      // Clear image after analysis
      setImageFile(null)
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("Error analyzing image:", error)
      setError("There was an error analyzing the image. Please try again.")
      // Add error message
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: "Sorry, I couldn't analyze that image. Please try again with a different image.",
        },
      ])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getHeaderColor = () => {
    if (selectedSDG === "all") return "bg-gradient-to-r from-blue-600 to-green-600"
    return `bg-${sdgData[selectedSDG].color}`
  }

  const getButtonColor = () => {
    if (selectedSDG === "all") return "bg-blue-600 hover:bg-blue-700"
    return `bg-${sdgData[selectedSDG].color} hover:bg-${sdgData[selectedSDG].color}/90`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-2 sm:p-4">
      <Card className="w-full max-w-[95vw] sm:max-w-5xl shadow-lg border-gray-200">
        <CardHeader className={`text-white rounded-t-lg ${getHeaderColor()}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              {selectedSDG !== "all" ? (
                <span
                  className="inline-block w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ color: sdgData[selectedSDG].textColor }}
                >
                  {selectedSDG}
                </span>
              ) : (
                <Globe className="h-10 w-10 text-white" />
              )}
              <div>
                <CardTitle className="text-xl">
                  {selectedSDG === "all"
                    ? "Sustainable Development Goals Assistant"
                    : `SDG ${selectedSDG}: ${sdgData[selectedSDG].title}`}
                </CardTitle>
                <CardDescription className="text-white/80">
                  {selectedSDG === "all"
                    ? "Comprehensive information on all 17 SDGs"
                    : sdgData[selectedSDG].shortDescription}
                </CardDescription>
              </div>
            </div>
            <Select value={selectedSDG} onValueChange={setSelectedSDG}>
              <SelectTrigger className="w-full sm:w-[220px] bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select SDG" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All SDGs</SelectItem>
                {Object.keys(sdgData).map((sdgNumber) => (
                  <SelectItem key={sdgNumber} value={sdgNumber}>
                    SDG {sdgNumber}: {sdgData[sdgNumber].title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mx-2 sm:mx-4 mt-2 p-1">
            <TabsTrigger
              value="chat"
              className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-1 text-xs sm:text-sm"
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-1 text-xs sm:text-sm"
            >
              <Info className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Data</span>
              <span className="inline xs:hidden">Data</span>
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3 py-1 text-xs sm:text-sm"
            >
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Resources</span>
              <span className="inline xs:hidden">Links</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="m-0">
            <CardContent className="p-0 relative">
              <ScrollArea
                className="h-[50vh] sm:h-[60vh] p-2 sm:p-4"
                ref={scrollAreaRef}
                onScroll={checkScrollPosition}
              >
                {messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    attachments={message.experimental_attachments}
                    sdgColor={selectedSDG !== "all" ? sdgData[selectedSDG].textColor : undefined}
                  />
                ))}
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div ref={messagesEndRef} />
              </ScrollArea>

              {showScrollButton && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-4 right-4 rounded-full shadow-md border-gray-200"
                  onClick={scrollToBottom}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              )}

              {imagePreview && (
                <div className="mx-4 mb-2 p-2 border rounded-md bg-gray-50 flex items-center gap-2">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{imageFile?.name}</p>
                    <p className="text-xs text-gray-500">Ready to analyze</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>

            <CardFooter className="p-2 sm:p-4 pt-1 sm:pt-2">
              <form onSubmit={handleSubmit} className="flex w-full gap-1 sm:gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading || isAnalyzing}
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload image</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload an image for sustainability analysis</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={`Ask about sustainable development...`}
                  className="flex-grow border-gray-200 focus-visible:ring-blue-500"
                  disabled={isLoading || isAnalyzing}
                />
                <Button
                  type="submit"
                  disabled={isLoading || isAnalyzing || (!input.trim() && !imageFile)}
                  className={getButtonColor()}
                >
                  {isLoading || isAnalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : imageFile ? (
                    <span>Analyze</span>
                  ) : (
                    <span>Send</span>
                  )}
                </Button>
              </form>
            </CardFooter>
          </TabsContent>

          <TabsContent value="data" className="m-0 p-4">
            <DataVisualization sdgNumber={selectedSDG} />
          </TabsContent>

          <TabsContent value="resources" className="m-0 p-4">
            <ResourceLinks sdgNumber={selectedSDG} />
          </TabsContent>
        </Tabs>
      </Card>

      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 max-w-4xl text-center px-2">
        <p>
          This assistant provides information about the 17 Sustainable Development Goals (SDGs) adopted by all United
          Nations Member States in 2015 as part of the 2030 Agenda for Sustainable Development.
        </p>
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {Object.keys(sdgData).map((sdgNumber) => (
            <Badge
              key={sdgNumber}
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              style={{ borderColor: sdgData[sdgNumber].textColor, color: sdgData[sdgNumber].textColor }}
              onClick={() => {
                setSelectedSDG(sdgNumber)
                setActiveTab("chat")
              }}
            >
              SDG {sdgNumber}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
