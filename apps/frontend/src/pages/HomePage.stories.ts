import type { Meta, StoryObj } from '@storybook/vue3-vite'

import HomePage from './HomePage.vue'
import type { HealthResponse } from '@/types/health'
import { expect, fn, userEvent, within } from '@storybook/test'
import { provideApi } from '@/composables/useApi'

type CustomArgs = InstanceType<typeof HomePage> & {
  getHealth: () => Promise<HealthResponse>
}

const meta = {
  title: 'pages/HomePage',
  component: HomePage,
  args: {
    getHealth: fn(),
  },
  render: (args) => ({
    components: { HomePage },
    setup() {
      provideApi({
        health: {
          getHealth: args.getHealth,
        },
      })
      return { args }
    },
    template: '<HomePage v-bind="args" />',
  }),
} satisfies Meta<CustomArgs>

export default meta
type Story = StoryObj<CustomArgs>

export const Basic: Story = {}

/**
 * ヘルスチェックが成功するパターン
 */
export const Healthy: Story = {
  args: {
    getHealth: fn().mockResolvedValue({ status: 'healthy' }),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // ヘルスチェックボタンをクリック
    const checkButton = canvas.getByRole('button', { name: 'Check Health' })
    await userEvent.click(checkButton)

    // APIが呼び出されることを確認
    await expect(args.getHealth).toHaveBeenCalled()

    // ヘルスチェック結果が表示されることを確認
    const statusText = await canvas.findByText(/healthy/)
    await expect(statusText).toBeInTheDocument()
  },
}

/**
 * ヘルスチェックが失敗するパターン
 */
export const Unhealthy: Story = {
  args: {
    getHealth: fn().mockRejectedValue(new Error()),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // ヘルスチェックボタンをクリック
    const checkButton = canvas.getByRole('button', { name: 'Check Health' })
    await userEvent.click(checkButton)

    // APIが呼び出されることを確認
    await expect(args.getHealth).toHaveBeenCalled()

    // エラーメッセージが表示されることを確認
    const errorMessages = await canvas.findAllByText(/Error/i)
    await expect(errorMessages.length).toBeGreaterThan(0)
  },
}
