<script lang='ts' setup>
// const { GET } = useBackendApi()

onMounted(async () => {

  // const test = await GET('/api-v2/work/translate/locales', {})
  // console.log(test.data?.map(el => el))
  // test.data.DATA.map((e) => console.log(e))
})
</script>

<template>
  {{ $t('welcome') }} from main
</template>
