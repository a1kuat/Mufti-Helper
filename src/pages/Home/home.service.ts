import { useMutation } from '@tanstack/react-query'
import { v4 as generateUuid } from 'uuid'

import { notify } from '@/components/ui/notification'
import useHomeSlice from './home.store'
import axios from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../utils/types'

export const useBot = () => {
  const navigate = useNavigate()
  const { setBot, setStatus } = useHomeSlice((state) => state)

  const {
    data,
    isPending: isCreating,
    mutate: createBot,
  } = useMutation({
    mutationFn: ({ data }: { data: any; callback: () => void }) => {
      setStatus('creating')
      notify('Creating knowledge base in background', 'success')

      const formData = new URLSearchParams()

      formData.append('data', JSON.stringify(data))
      formData.append('chatbot_name', `knowledgebase_${generateUuid()}`)
      formData.append('temperature', '0.7')
      formData.append('model', 'gpt-4-turbo-32k')
      formData.append(
        'welcome_message',
        "Hello and welcome!😊 I'm here to assist you with your queries. How can I help you today?"
      )

      return axios.post('upload_to_db/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    },
    onSuccess: (data: any, variables: any) => {
      setBot(data.data)
      variables.callback()
      navigate(Path.HOME)
      notify('Successfully created the knowledge base', 'success')
    },
    onSettled: () => {
      setStatus('done')
    },
  })

  const { isPending: isUpdating, mutate: updateBot } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      data: any
      id: string
      callback: () => void
    }) => {
      setStatus('updating')
      notify('Updating knowledge base in background', 'success')

      const formData = new URLSearchParams()

      formData.append('data', JSON.stringify(data))
      formData.append('chatbot_id', id)

      return axios.post('update_db/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    },
    onSuccess: (_: any, variables: any) => {
      variables.callback()
      navigate(Path.HOME)
      notify('Successfully updated the knowledge base', 'success')
    },
    onSettled: () => {
      setStatus('done')
    },
  })

  return { data, isCreating, isUpdating, createBot, updateBot }
}
