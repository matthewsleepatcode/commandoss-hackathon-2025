export interface APIResponse<T> {
  success: boolean
  data: T
  message?: string
  time: number
  pagination?: {
    total: number
  }
}
