import type { HealthResponse } from '@/types/health'
import { apiClient } from './client'

/**
 * ヘルスチェックAPIを呼び出す
 * @returns ヘルスチェック結果
 */
export const getHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>('/health')
  return response.data
}
