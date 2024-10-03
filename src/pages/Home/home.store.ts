import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IChatbot, IHistory, ISaved } from '../../utils/types'

type IStatus = 'creating' | 'updating' | 'done'

interface IState {
  bot?: IChatbot
  answer?: any
  status: IStatus
  setStatus: (status: IStatus) => void
  setAnswer: (response: string) => void
  setBot: (bot: IChatbot) => void
  removeBot: () => void
  history: IHistory[]
  setHistory: (item: IHistory) => void
  removeHistoryItem: (text: string) => void
  clearHistory: () => void
  savedItems: ISaved[]
  saveItem: (item: ISaved) => void
  removeSavedItem: (text: string) => void
  clearSavedItems: () => void
}

const useHomeSlice = create<IState>()(
  devtools(
    persist(
      (set) => ({
        setBot: (bot: IChatbot) => set(() => ({ bot })),
        status: 'done',
        setStatus: (status: IStatus) => set(() => ({ status })),
        setAnswer: (answer: string) => set(() => ({ answer })),
        removeBot: () => set(() => ({ bot: undefined })),
        history: [],
        setHistory: (item: IHistory) =>
          set((state) => ({ history: [...state.history, item] })),
        removeHistoryItem: (text: string) =>
          set((state) => ({
            history: state.history.filter((item) => text !== item.text),
          })),
        clearHistory: () => set(() => ({ history: [] })),
        savedItems: [],
        saveItem: (item: ISaved) =>
          set((state) => ({ savedItems: [...state.savedItems, item] })),
        removeSavedItem: (text: string) =>
          set((state) => ({
            savedItems: state.savedItems.filter((item) => text !== item.text),
          })),
        clearSavedItems: () => set(() => ({ savedItems: [] })),
      }),
      { name: 'homeStore' }
    )
  )
)

export default useHomeSlice
