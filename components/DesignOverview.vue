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
        <div relative border-2 border-gray-200 rounded-lg px-2 py-1 data-arrow-from="A1 A2 A3 A4 A5">
          <div text-sm font-bold>Analyze</div>
          <img block absolute right-8 top-2 style="height: calc(100% - 16px)" src="../assets/AnalyzerInner.svg" />
        </div>
        <div relative border-2 border-gray-200 rounded-lg px-2 py-1 data-arrow-from="T1 T2 T3 T4 T5">
          <div text-sm font-bold>Transform</div>
          <img block absolute right-6 top-2 style="height: calc(100% - 16px)" src="../assets/TransformerInner.svg" />
        </div>
      </div>
    </div>
    <div h-64 flex flex-col>
      Optimizations (Mostly decoupled)
      <div flex-grow grid grid-rows-5 gap-2 class="optimizations2">
        <div data-arrow-to="A1 T1">Dead Code Elimination</div>
        <div data-arrow-to="A2 T2">Constant Folding</div>
        <div data-arrow-to="A3 T3">Property Name Mangling</div>
        <div data-arrow-to="A4 T4">React.js Optimization</div>
        <div data-arrow-to="A5 T5">...</div>
      </div>
    </div>
  </div>
  <ArrowConn no-arrow arrow-id="A1" color="#999999" />
  <ArrowConn no-arrow arrow-id="A2" color="#999999" />
  <ArrowConn no-arrow arrow-id="A3" color="#999999" />
  <ArrowConn no-arrow arrow-id="A4" color="#999999" />
  <ArrowConn no-arrow arrow-id="A5" color="#999999" />
  <ArrowConn no-arrow arrow-id="T1" color="#999999" />
  <ArrowConn no-arrow arrow-id="T2" color="#999999" />
  <ArrowConn no-arrow arrow-id="T3" color="#999999" />
  <ArrowConn no-arrow arrow-id="T4" color="#999999" />
  <ArrowConn no-arrow arrow-id="T5" color="#999999" />
</template>

<style scoped>
.optimizations > div {
  writing-mode: vertical-lr;
  height: 140px;
  text-align: center;
  --uno: p-2 border-gray-200 border-solid border-2 rounded-lg leading-4;
}
.optimizations2 > div {
  --uno: p-2 border-gray-200 border-solid border-2 rounded-lg leading-4 flex items-center;
}
</style>