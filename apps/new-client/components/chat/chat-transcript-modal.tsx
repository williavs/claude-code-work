'use client'

import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ChatMessage from './chat-message'
import { Search, X } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'

interface ChatTranscriptModalProps {
  isOpen: boolean
  onClose: () => void
  chat: any[] | null
}

export default function ChatTranscriptModal({
  isOpen,
  onClose,
  chat,
}: ChatTranscriptModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const filteredMessages = useMemo(() => {
    if (!chat) return []

    let messages = chat

    // Filter by tab
    if (activeTab !== 'all') {
      messages = messages.filter((msg) => msg.role === activeTab)
    }

    // Filter by search
    if (searchQuery) {
      messages = messages.filter((msg) => {
        const content = typeof msg.content === 'string' 
          ? msg.content 
          : JSON.stringify(msg.content)
        return content.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }

    return messages
  }, [chat, activeTab, searchQuery])

  const messageCount = filteredMessages.length

  const content = (
    <>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <ScrollArea className={isMobile ? 'h-[calc(100vh-200px)]' : 'h-[500px]'}>
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <p className="text-muted-foreground">No messages found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMessages.map((message, index) => (
                    <ChatMessage
                      key={`${message.role}-${index}`}
                      message={message}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-full">
          <SheetHeader>
            <SheetTitle>
              Chat Transcript
              {messageCount > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({messageCount} message{messageCount !== 1 ? 's' : ''})
                </span>
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">{content}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            Chat Transcript
            {messageCount > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({messageCount} message{messageCount !== 1 ? 's' : ''})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-hidden">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  )
}