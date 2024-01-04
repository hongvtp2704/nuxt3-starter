<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

interface LoginForm {
  email: string
  password: string
  select: any
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  select: yup.object().required(),
})
const { errors, values, setFieldError } = useForm<LoginForm>({ validationSchema: schema })
const email = ref('')

// For select input
const selectedPeople = ref(null)
const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
  { name: 'Invalid Person' },
]

onMounted(() => {
  setFieldError('select', 'Error for test')
})
</script>

<template>
  <div class="mt-2" />
  <div class="bg-[#191C27] p-8 w-[300px]">
    <form-input v-model:model-value="email" name="email" label="Email" placeholder="Your email" icon="avatar">
      <template #action-icon>
        <svg-icon name="circle" width="20" height="20" />
      </template>
    </form-input>
  </div>

  <div class="bg-[#191C27] p-8 w-[300px]">
    <form-select v-model:model-value="selectedPeople" :options="people" name="select" label="Select" key-prop="name" label-prop="name" placeholder="Select Input" />
  </div>

  <!--  {{ selectedPeople }} -->
  {{ values }}
  {{ errors }}
</template>
