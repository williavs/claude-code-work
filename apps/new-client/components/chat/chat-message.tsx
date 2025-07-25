'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: any
  index: number
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const getContent = () => {
    if (typeof message.content === 'string') {
      return message.content
    }
    return JSON.stringify(message.content, null, 2)
  }

  const content = getContent()
  const shouldTruncate = content.length > 200
  const displayContent = shouldTruncate && !isExpanded 
    ? content.slice(0, 200) + '...' 
    : content

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getRoleStyles = () => {
    switch (message.role) {
      case 'user':
        return 'border-blue-200 bg-blue-50/50'
      case 'assistant':
        return 'border-gray-200 bg-white'
      case 'system':
        return 'border-gray-100 bg-gray-50/50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  const getRoleBadgeVariant = () => {
    switch (message.role) {
      case 'user':
        return 'default'
      case 'assistant':
        return 'secondary'
      case 'system':
        return 'outline'
      default:
        return 'default'
    }
  }

  return (
    <Card 
      className={cn(
        'mb-4 transition-colors',
        getRoleStyles()
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant={getRoleBadgeVariant()}>
            {message.role}
          </Badge>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2"
            >
              <Copy className="h-3 w-3" />
              <span className="ml-1 text-xs">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </Button>
            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-7 px-2"
              >
                {isExpanded ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
        </div>
        <div 
          className="overflow-x-auto max-w-full" 
          style={{ 
            whiteSpace: 'pre',
            wordWrap: 'normal',
            overflowX: 'auto'
          }}
        >
          <div className="text-sm font-mono inline-block min-w-0">
            {displayContent}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}