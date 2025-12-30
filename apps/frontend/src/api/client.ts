import axios, { type AxiosInstance } from 'axios'

/**
 * Axiosインスタンス
 * 環境変数 VITE_API_BASE_URL でAPIのベースURLを指定
 *
 * 例:
 * - 開発環境: "http://localhost:8080/api"
 * - 本番環境: "https://example.com/api"
 *
 * 注: バックエンドでCORS設定が必要（開発環境で http://localhost:5173 からのリクエストを許可）
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})
