import { GoogleGenerativeAI } from "@google/generative-ai"
import { sdgData } from "@/lib/sdg-data"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Extract the SDG number from the messages if available
    let sdgNumber = "all" // Default to all SDGs

    // Look for SDG number in the most recent user message
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i]
      if (message.role === "user") {
        // Check if the message contains "SDG X" or "SDG-X" pattern
        const sdgMatch = message.content.match(/SDG[- ]?(\d{1,2})/i)
        if (sdgMatch && sdgMatch[1] && Number.parseInt(sdgMatch[1]) >= 1 && Number.parseInt(sdgMatch[1]) <= 17) {
          sdgNumber = sdgMatch[1]
          break
        }
      }
    }

    // Get SDG information
    const sdgInfo = sdgNumber !== "all" ? sdgData[sdgNumber] : null

    // Create system prompt - modified to avoid recitation issues
    const systemPrompt =
      sdgNumber !== "all"
        ? `You are a helpful assistant focused on Sustainable Development Goal (SDG) ${sdgNumber}: ${sdgInfo?.title}.
    
    Your purpose is to:
    1. Provide accurate information about SDG ${sdgNumber}, its targets, indicators, and progress
    2. Explain the goals and challenges related to this SDG
    3. Suggest practical actions individuals, communities, and organizations can take
    4. Share success stories and innovations related to this SDG
    5. Answer questions in an accessible way
    
    IMPORTANT GUIDELINES:
    - Provide original, synthesized information rather than reciting verbatim content
    - Use your own words to explain concepts and information
    - Keep responses concise and focused on the user's question
    - Avoid lengthy quotes or extensive reproductions of text
    - Be informative, encouraging, and solution-oriented
    
    When discussing challenges, acknowledge them but emphasize hope and the potential for positive change through collective action.
    
    If the user asks about a different SDG, you can provide information about that one instead.
    
    Always be factual and evidence-based in your responses.
    
    Format your responses using Markdown to improve readability. Use:
    - # for main headings
    - ## for subheadings
    - * or - for bullet points
    - 1. 2. 3. for numbered lists
    - **bold** for emphasis
    - > for quotes or callouts (use sparingly)
    
    Structure your responses with clear headings and organized information. Use formatting to highlight key points and make the information easy to scan.`
        : `You are a helpful assistant focused on the 17 Sustainable Development Goals (SDGs).
    
    Your purpose is to:
    1. Provide accurate information about all SDGs, their targets, indicators, and progress
    2. Explain the interconnections between different SDGs
    3. Suggest practical actions individuals, communities, and organizations can take
    4. Share success stories and innovations related to sustainable development
    5. Answer questions in an accessible way
    
    IMPORTANT GUIDELINES:
    - Provide original, synthesized information rather than reciting verbatim content
    - Use your own words to explain concepts and information
    - Keep responses concise and focused on the user's question
    - Avoid lengthy quotes or extensive reproductions of text
    - Be informative, encouraging, and solution-oriented
    
    When discussing challenges, acknowledge them but emphasize hope and the potential for positive change through collective action.
    
    Always be factual and evidence-based in your responses.
    
    Format your responses using Markdown to improve readability. Use:
    - # for main headings
    - ## for subheadings
    - * or - for bullet points
    - 1. 2. 3. for numbered lists
    - **bold** for emphasis
    - > for quotes or callouts (use sparingly)
    
    Structure your responses with clear headings and organized information. Use formatting to highlight key points and make the information easy to scan.`

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

    // Configure the model with safety settings
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024, // Reduced from 2048 to avoid lengthy responses
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    })

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1].content

    // For simplicity, we'll just use the last user message and the system prompt
    const prompt = `${systemPrompt}\n\n${lastUserMessage}`

    try {
      // Generate response
      const result = await model.generateContent(prompt)
      const response = result.response.text()

      // Return the response
      return new Response(
        JSON.stringify({
          role: "assistant",
          content: response,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    } catch (generationError) {
      console.error("Error in content generation:", generationError)

      // Check if it's a recitation error
      if (generationError.message && generationError.message.includes("RECITATION")) {
        // Provide a more specific fallback response
        return new Response(
          JSON.stringify({
            role: "assistant",
            content: `# I need to rephrase my response

I apologize, but I need to provide my answer in a different way. 

## How can I help?

* Could you rephrase your question?
* I can provide general information about SDGs without extensive quotations
* I can focus on specific aspects of your question rather than comprehensive overviews
* I can suggest actions or practical applications related to sustainable development

Please let me know how you'd like to proceed, and I'll do my best to assist you.`,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
      }

      // For other errors, throw to be caught by the outer catch
      throw generationError
    }
  } catch (error) {
    console.error("Error generating response:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : String(error),
        role: "assistant",
        content: `# Something went wrong

I apologize, but I encountered an issue while generating a response. This might be due to:

* The complexity of the question
* Content safety filters
* Technical limitations

Could you try rephrasing your question or asking about a different aspect of sustainable development?`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
