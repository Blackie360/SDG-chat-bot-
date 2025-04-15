import { GoogleGenerativeAI } from "@google/generative-ai"
import { sdgData } from "@/lib/sdg-data"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const imageFile = formData.get("image") as File
    const sdgNumber = (formData.get("sdg") as string) || "all"

    if (!imageFile) {
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert the file to base64
    const imageBuffer = await imageFile.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString("base64")

    // Get SDG information
    const sdgInfo = sdgNumber !== "all" ? sdgData[sdgNumber] : null

    // Create the prompt based on whether a specific SDG is selected - modified to avoid recitation
    const prompt =
      sdgNumber !== "all"
        ? `Analyze this image in the context of SDG ${sdgNumber}: ${sdgInfo?.title}. 
         
         IMPORTANT GUIDELINES:
         - Provide original, synthesized analysis rather than reciting verbatim content
         - Use your own words to explain what you see in the image
         - Keep your analysis concise and focused
         - Avoid lengthy descriptions or extensive reproductions of text
         
         Please:
         - Identify any relevant elements related to this SDG
         - Explain their significance to sustainable development
         - If the image shows environmental issues, briefly explain their impact
         - Suggest 2-3 practical actions related to what you see
         
         Format your response using Markdown to improve readability. Use:
         - # for main headings
         - ## for subheadings
         - * or - for bullet points
         - **bold** for emphasis (sparingly)
         
         Structure your analysis with clear headings and organized information.`
        : `Analyze this image in the context of the Sustainable Development Goals (SDGs).
         
         IMPORTANT GUIDELINES:
         - Provide original, synthesized analysis rather than reciting verbatim content
         - Use your own words to explain what you see in the image
         - Keep your analysis concise and focused
         - Avoid lengthy descriptions or extensive reproductions of text
         
         Please:
         - Identify which 2-3 SDGs might be most relevant to what's shown
         - Briefly explain the significance of what you see
         - If the image shows environmental or social issues, briefly explain their impact
         - Suggest 2-3 practical actions related to what you see
         
         Format your response using Markdown to improve readability. Use:
         - # for main headings
         - ## for subheadings
         - * or - for bullet points
         - **bold** for emphasis (sparingly)
         
         Structure your analysis with clear headings and organized information.`

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

    try {
      // Generate analysis using Gemini
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: imageFile.type,
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      })

      const response = result.response.text()
      return Response.json({ analysis: response })
    } catch (generationError) {
      console.error("Error in image analysis generation:", generationError)

      // Check if it's a recitation error
      if (generationError.message && generationError.message.includes("RECITATION")) {
        // Provide a more specific fallback response
        return Response.json({
          analysis: `# Image Analysis

I apologize, but I need to provide my analysis in a different way.

## How I can help with this image

I can offer:

* A brief description of what I see in the image
* General connections to sustainable development goals
* Practical suggestions related to sustainability
* Alternative approaches to analyzing this type of content

Please feel free to upload a different image or ask me to focus on specific aspects of this one.`,
        })
      }

      // For other errors, throw to be caught by the outer catch
      throw generationError
    }
  } catch (error) {
    console.error("Error analyzing image:", error)
    return Response.json(
      {
        error: "Failed to analyze image",
        details: error instanceof Error ? error.message : String(error),
        analysis: "Sorry, I couldn't analyze that image. Please try again with a different image.",
      },
      { status: 500 },
    )
  }
}
