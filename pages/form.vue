<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

interface LoginForm {
  email: string
  password: string
  select: any
  multiSelect: Array<any>
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  select: yup.object().required(),
  multiSelect: yup.array().max(2),
})
const { errors, values, setFieldError } = useForm<LoginForm>({ validationSchema: schema })
const email = ref('')

// For select input
const selectedPeople = ref(null)
const multiSelectedPeople = ref([])
const people = [
  { name: 'Wade Cooper', field: 'bullshit' },
  { name: 'Arlene Mccoy', field: 'bullshit 1' },
  { name: 'Devon Webb', field: 'bullshit 2' },
  { name: 'Tom Cook', field: 'bullshit 3' },
  { name: 'Tanya Fox', field: 'bullshit 4' },
  { name: 'Hellen Schmidt', field: 'bullshit 5' },
  { name: 'Invalid Person', field: 'bullshit 6' },
]

onMounted(() => {
  setFieldError('select', 'Error for test')
})
</script>

<template>
  <div class="mt-2" />
  <div class="bg-[#191C27] p-8 w-[300px]">
    <form-input v-model:model-value="email" label="Email" placeholder="Your email" icon="avatar">
      <template #action-icon>
        <svg-icon name="circle" width="20" height="20" />
      </template>
    </form-input>
  </div>

  <div class="bg-[#191C27] p-8 w-[300px]">
    <form-select v-model:model-value="selectedPeople" :options="people" name="select" label="Select" key-prop="name" label-prop="name" placeholder="Select Input" />
  </div>

  <div class="bg-[#191C27] p-8 w-[300px]">
    <form-multi-select v-model:model-value="multiSelectedPeople" :options="people" name="multiSelect" label="Multi Select" key-prop="name" label-prop="name" placeholder="Multi Select Input" />
  </div>

  <!--  {{ multiSelectedPeople }} -->
  {{ values }}
  {{ errors }}
</template>
