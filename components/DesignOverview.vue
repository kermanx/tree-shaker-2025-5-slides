<template>
  <!-- <div w-max flex flex-col gap-2>
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
  </div> -->
  <div relative flex gap-16>
    <div h-64 flex flex-col w-80>
      Two Phases
      <div grid grid-rows-2 gap-8 flex-grow>
        <div border-2 border-gray-200 rounded-lg px-1>
          <div text-sm font-bold>Analyze</div>
        </div>
        <div border-2 border-gray-200 rounded-lg px-1>
          <div text-sm font-bold>Transform</div>
          
        </div>
      </div>
    </div>
    <div h-64 flex flex-col>
      Optimizations (Mostly decoupled)
      <div flex-grow grid grid-rows-5 gap-2 class="optimizations2">
        <div>Dead Code Elimination</div>
        <div>Constant Folding</div>
        <div>Property Name Mangling</div>
        <div>React.js Optimization</div>
        <div>...</div>
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
.optimizations2 > div {
  --uno: p-2 border-gray-200 border-solid border-2 rounded-lg leading-4;
}
</style>