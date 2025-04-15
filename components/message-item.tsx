import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Bot, User } from "lucide-react"

interface MessageItemProps {
  role: "user" | "assistant"
  content: string
  attachments?: Array<{
    name: string
    contentType: string
    url: string
  }>
  sdgColor?: string
}

export function MessageItem({ role, content, attachments, sdgColor = "#3b82f6" }: MessageItemProps) {
  const isUser = role === "user"

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback className="bg-green-100 text-green-800">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[90%] sm:max-w-[85%]`}>
        <Card
          className={`p-2 sm:p-3 ${
            isUser
              ? `bg-blue-600 text-white rounded-tr-none shadow-sm`
              : "bg-white text-gray-800 rounded-tl-none shadow-sm border"
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <MarkdownRenderer content={content} className={isUser ? "text-white prose-invert" : "text-gray-800"} />
          )}
          {attachments?.map(
            (attachment, index) =>
              attachment.contentType?.startsWith("image/") && (
                <div className="mt-2" key={`attachment-${index}`}>
                  <img
                    src={attachment.url || "/placeholder.svg"}
                    alt="Uploaded content"
                    className="max-w-full rounded-md"
                  />
                </div>
              ),
          )}
        </Card>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarFallback className="bg-blue-100 text-blue-800">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
