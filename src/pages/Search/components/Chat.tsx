import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { ScrollArea } from '@/components/ui/scroll-area'

// Define the type for props if your component accepts any
type MyComponentProps = {
  chat: string[]
  setChat: React.Dispatch<React.SetStateAction<string[]>>
}

// Define a functional component with TypeScript
export const Chat: React.FC<MyComponentProps> = ({ chat, setChat }) => {
  const [inputMessage, setInputMessage] = useState<string>('')

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
    console.log(inputMessage)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputMessage.trim() !== '') {
      setChat((prevChat) => [...prevChat, inputMessage.trim()])
      setInputMessage('')
    }
  }

  return (
    <Card>
      <CardContent className="py-3 px-2 h-72 flex flex-col justify-end overflow-y-auto">
        {/* Messages */}
        <ScrollArea>
          <div className='pr-4'>
            <div className="flex flex-col gap-2">
              {chat.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`bg-gray-200 rounded-lg px-4 py-2 ${
                      index % 2 === 0
                        ? 'rounded-br-none'
                        : 'rounded-bl-none bg-gray-900 text-white'
                    }`}
                  >
                    {message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        {/* Input and send button */}{' '}
        <div className="flex justify-center align-center mt-2">
          <Input
            value={inputMessage}
            onChange={handleMessageChange}
            onKeyUp={(e) => handleKeyPress(e)}
            placeholder="Type a message and press Enter"
          ></Input>
          <ArrowRightCircleIcon className="ml-2 w-8 h-8 transition-colors ease-in"></ArrowRightCircleIcon>
        </div>
      </CardContent>
    </Card>
  )
}
