<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

interface LoginForm {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})
const { errors, values } = useForm<LoginForm>({ validationSchema: schema })
const email = ref('')
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

  {{ values }}
  {{ errors }}
</template>
