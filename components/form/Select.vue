<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { useField } from 'vee-validate'

type SelectSize = 'sm' | 'md' | 'lg'
interface IProps {
  options: Array<any>
  modelValue: any
  keyProp: string
  labelProp: string
  placeholder: string
  name?: string // For vee-validate
  size?: SelectSize
  label?: string
}
interface IEmits {
  (e: 'update:modelValue', value: any): void
}

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  size: 'md',
})
const emits = defineEmits<IEmits>()

const { options, modelValue, keyProp, labelProp, placeholder, name, label, size } = toRefs(props)
const selectedDisplay = computed(() => {
  return modelValue.value ? modelValue.value[labelProp.value] : placeholder
})

const { errorMessage, handleChange } = useField(name)

function updateModalValue(value: any) {
  emits('update:modelValue', value)
  handleChange(value)
}
</script>

<template>
  <div class="select-input-container" :class="[size]">
    <label v-if="label">{{ label }}</label>
    <Listbox
      v-slot="{ open }"
      :model-value="modelValue"
      @update:model-value="value => updateModalValue(value)"
    >
      <div class="relative" :class="{ 'mt-2': !!label, 'mb-2': !!errorMessage }">
        <ListboxButton class="listbox-btn" :class="{ invalid: errorMessage }">
          {{ selectedDisplay }}
          <svg-icon v-if="!open" name="arrow-down" />
          <svg-icon v-else name="arrow-up" />
        </ListboxButton>

        <ListboxOptions class="listbox-option">
          <ListboxOption
            v-for="option in options"
            :key="option[keyProp]"
            v-slot="{ active, selected }"
            :value="option"
          >
            <li class="option-content" :class="{ 'bg-[#303343]': active || selected }">
              {{ option[labelProp] }}
              <svg-icon v-if="selected" name="check" />
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
    <span v-if="errorMessage" class="text-danger mt-1">{{ errorMessage }}</span>
  </div>
</template>

<style lang="scss" scoped>
.select-input-container {
  // Size styling
  &.md {
    font-size: 14px;
    svg {
      width: 20px;
      height: 20px;
    }
    .listbox-btn {
      padding: 12px 8px;
    }
    .listbox-option {
      .option-content {
        padding: 10px 12px;
      }
    }
  }

  &.lg {
    font-size: 14px;
    svg {
      width: 20px;
      height: 20px;
    }
    .listbox-btn {
      padding: 12px 8px;
    }
    .listbox-option {
      .option-content {
        padding: 10px 12px;
      }
    }
  }

  &.sm{
    font-size: 14px;
    svg {
      width: 20px;
      height: 20px;
    }
    .listbox-btn {
      padding: 12px 8px;
    }
    .listbox-option {
      .option-content {
        padding: 10px 12px;
      }
    }
  }

  .listbox-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #33394C;
    border-radius: 8px;
    background: #2A2D3D;
    color: $white;
    &[aria-expanded="true"] {
      outline: none;
      border: 2px solid $primary;
    }
    &.invalid {
      outline: none;
      border: 2px solid $danger;
    }
  }

  .listbox-option {
    margin-top: 8px;
    width: 100%;
    border: 1px solid #33394C;
    border-radius: 8px;
    background: #2A2D3D;
    color: $white;
    .option-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  label {
    color: $white;
  }

  span {
    color: $danger;
  }
}
</style>
