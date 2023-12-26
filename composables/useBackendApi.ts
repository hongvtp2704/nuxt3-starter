import createClient from "openapi-fetch"
import type {paths} from '~/lib/types/api.schema'

const baseClient = createClient<paths>({
    baseUrl: 'http://backend.127.0.0.1.nip.io:8080',
    credentials: 'include',
    headers: {
        'x-original-source': 'AT_YC'
    }
})

export default function () {
    const loadingCount = ref(0)
    const isLoading = computed(() => loadingCount.value === 0)

    function wrapper<T extends Function> (originalFn: T): T {
        const wrapFn = async (...args: any) => {
            try {
                loadingCount.value += 1
                const res = await originalFn(...args)
                const rawResponse = res.response as Response
                if (rawResponse.status === 403 || rawResponse.status === 401) {
                    console.log('logout')
                }
                if (res.error) {
                    throw res.error
                }
                return res
            } finally {
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
        DEL: wrapper(baseClient.DELETE)
    }
}
