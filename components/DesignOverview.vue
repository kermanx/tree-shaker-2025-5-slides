<template>
  <div w-max flex flex-col gap-2>
    <div flex gap-2 class="optimizations">
      <div>Tree Shaking</div>
      <div>Constant Folding</div>
      <div>Property Mangling</div>
      <div>React.js Optimization</div>
      <div>...</div>
    </div>
    <div border-2 border-gray-200 rounded-lg>
      <div text-center> The Framework </div>
      <div grid grid-cols-2 px-2 gap-12>
        <div border-2 border-gray-200 rounded-lg text-center> Analyzer </div>
        <div border-2 border-gray-200 rounded-lg text-center> Transformer </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.optimizations > div {
  writing-mode: vertical-lr;
  height: 140px;
  text-align: center;
  --uno: p-2 border-gray-200 border-solid border-2 rounded-lg leading-4;
}
</style>