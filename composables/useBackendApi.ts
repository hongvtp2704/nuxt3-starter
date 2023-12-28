import createClient from 'openapi-fetch'
import type { paths } from '~/lib/types/api.schema'

export default function () {
  const config = useRuntimeConfig()
  const loadingCount = ref(0)
  const isLoading = computed(() => loadingCount.value === 0)

  const baseClient = createClient<paths>({
    baseUrl: config.public.apiBase,
    credentials: 'include',
    headers: {
      'x-original-source': 'AT_YC',
    },
  })

  function wrapper<T extends Function>(originalFn: T): T {
    const wrapFn = async (...args: any) => {
      try {
        loadingCount.value += 1
        const res = await originalFn(...args)
        const rawResponse = res.response as Response
        if (rawResponse.status === 403 || rawResponse.status === 401) {
          // Do something
        }
        if (res.error)
          throw res.error

        return res
      }
      finally {
        loadingCount.value -= 1
      }
    }
    return wrapFn as unknown as T
  }

  return {
    isLoading,
    GET: wrapper(baseClient.GET),
    POST: wrapper(baseClient.POST),
    PUT: wrapper(baseClient.PUT),
    PATCH: wrapper(baseClient.PATCH),
    DEL: wrapper(baseClient.DELETE),
  }
}
