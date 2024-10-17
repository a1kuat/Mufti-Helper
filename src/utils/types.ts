export enum Path {
  HOME = '/',
  SEARCH = '/search',
  QUERY = '/query',
  HISTORY = '/history',
  SOURCES = '/sources',
  SAVED = '/saved',
  DOCUMENTS = '/documents',
  WEBSITE = '/website',
  YOUTUBE = '/youtube',
  APPS = '/apps',
  DATABASES = '/databases',
  MEDIA = '/media',
  AUDIO = '/audio',
}

export interface IChatbot {
  id: string
  created_at: string
  name: string
  knowledge_id: string
  user: string
  type: string
  slug: any
  welcome_message: any
  model: string
  temperature: number
  top_p: number
  company_slug: any
  left_color: any
  right_color: any
  logo: any
}

export enum UserType {
  assistant = 'assistant',
  user = 'user',
}

export enum BotType {
  CHATBOT = 'CHAT',
  QA = 'QA',
}

export enum POLLING_STATUS {
  completed = 'completed',
  pending = 'pending',
}

export type IHistory = {
  text: string
  model: string
  sources: SourceType[]
  created_at: Date
}

export type ISaved = {
  text: string
  reply: string
  created_at: Date
}

export type SourceType = {
  auto_id: number;
  link: string;
  answer: string;
  distance: number;
  question: string;
}

export type ResponseDataType = {
  response: string;
  sources: SourceType[];
}