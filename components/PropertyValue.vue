<template>
  <div flex flex-col gap-1 border="2 #AAAAAA rounded-xl" p-1>
    <div flex>
      <div ml-.5 font-bold font-mono text-xs>
        PropertyValue
      </div>
      <div flex-grow />
      <div border="2 #8856E9 rounded-md op-60" px-1 flex items-center text-2.5 h-4 v-if="kind != 2">
        {{ kind == 3 ? 'Global ' : 'Existence ' }}Dependencies
      </div>
    </div>
    <div flex gap-1 text-xs leading-2.5>
      <div border="2 #009E73 rounded-lg op-60" px-2 py-1 h-8 flex items-center text-2.5>
        Possible<br>Field
      </div>
      <div border="2 #009E73 rounded-lg op-60" px-2 py-1 h-8 flex items-center text-2.5>
        Possible<br>Getter
      </div>
      <div border="2 #009E73 rounded-lg op-60" px-2 py-1 h-8 flex items-center text-2.5>
        Possible<br>Setter
      </div>
      <div border="2 #009E73 rounded-lg op-60" px-2 py-1 h-8 flex items-center justify-center flex-grow>
        ...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  kind?: number
}>()
</script>