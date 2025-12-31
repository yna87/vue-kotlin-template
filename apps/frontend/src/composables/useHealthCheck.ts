import axios from 'axios'
import type { HealthResponse } from '@/types/health'
import { getHealth } from '@/api/health'

export function useHealthCheck() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const healthData = ref<HealthResponse | null>(null)

  const isHealthy = computed(() => healthData.value?.status === 'healthy')

  const checkHealth = async () => {
    isLoading.value = true
    error.value = null
    healthData.value = null

    try {
      healthData.value = await getHealth()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = 'Failed to fetch health status'
      } else {
        error.value = 'An unexpected error occurred'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    healthData,
    isHealthy,
    checkHealth,
  }
}
