import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { ZodObject, ZodRawShape, z } from 'zod'

interface UseZodFormOptions<S extends ZodObject<ZodRawShape>> {
  /** Zodバリデーションスキーマ */
  schema: S
  /** フォームの初期値（省略時はスキーマのデフォルト値を使用） */
  initialValues?: Partial<z.infer<S>>
}

/**
 * Zodスキーマを使用した型安全なフォームComposable
 *
 * @example
 * ```ts
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * })
 *
 * const { fields, errors, handleSubmit } = useZodForm({
 *   schema,
 *   initialValues: { email: '', password: '' },
 * })
 * ```
 */
export function useZodForm<S extends ZodObject<ZodRawShape>>(
  options: UseZodFormOptions<S>,
) {
  type T = z.infer<S>

  const { schema, initialValues = {} } = options

  const { handleSubmit, errors, resetForm, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: initialValues as T,
  })

  const fields = reactive({} as Record<string, unknown>)
  const schemaKeys = Object.keys(schema.shape)

  for (const key of schemaKeys) {
    const { value } = useField(key)
    fields[key] = value
  }

  return {
    fields: fields as T,
    errors,
    handleSubmit,
    resetForm,
    isSubmitting,
  }
}
