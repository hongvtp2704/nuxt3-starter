<script lang="ts" setup>
type IVariant = 'primary' | 'danger'
type ISize = 'lg' | 'md' | 'sm'
type IIconPlacement = 'left' | 'right'
interface IProps {
  variant?: IVariant
  size?: ISize
  icon?: string
  iconPlacement?: IIconPlacement
  isDisabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  variant: 'primary',
  size: 'md',
  iconPlacement: 'left',
})

const classes = ref<string>()
const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary/70 disabled:bg-primary-light',
  danger: 'bg-danger text-white hover:bg-danger/70 disabled:bg-danger-light',
}
const sizeClasses = {
  lg: 'py-2.5 px-2 text-sm',
  md: 'p-2 text-sm',
  sm: 'p-1 text-xs',
}

const iconClasses = ref<string>()
const iconSizeClasses = {
  lg: 'w-5 h-5',
  md: 'w-5 h-5',
  sm: 'w-4 h-4',
}

onBeforeMount(() => {
  classes.value = `${variantClasses[props.variant]} ${sizeClasses[props.size]}`
  iconClasses.value = iconSizeClasses[props.size]
})
</script>

<template>
  <button :class="classes" class="rounded-lg flex justify-center" :disabled="isDisabled">
    <svg-icon v-if="icon && iconPlacement === 'left'" :name="icon" :class="iconClasses" class="pr-1" />
    <slot />
    <svg-icon v-if="icon && iconPlacement === 'right'" :name="icon" :class="iconClasses" class="pl-1" />
  </button>
</template>
