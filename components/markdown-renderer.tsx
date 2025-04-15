import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className={cn("prose prose-xs sm:prose-sm max-w-none dark:prose-invert break-words", className)}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-lg sm:text-xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-base sm:text-lg font-bold mt-3 sm:mt-5 mb-2 sm:mb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-sm sm:text-md font-bold mt-2 sm:mt-4 mb-1 sm:mb-2" {...props} />
        ),
        h4: ({ node, ...props }) => <h4 className="text-base font-semibold mt-3 mb-1" {...props} />,
        p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
        ),
        hr: ({ node, ...props }) => <hr className="my-4 border-gray-300" {...props} />,
        img: ({ node, ...props }) => <img className="max-w-full rounded-md my-4" {...props} />,
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-300 border border-gray-300" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
        th: ({ node, ...props }) => <th className="px-3 py-2 text-left text-sm font-semibold" {...props} />,
        td: ({ node, ...props }) => <td className="px-3 py-2 text-sm" {...props} />,
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          return !inline ? (
            <pre className="bg-gray-100 p-2 sm:p-4 rounded-md overflow-x-auto my-2 sm:my-4 text-xs sm:text-sm">
              <code className="font-mono" {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
