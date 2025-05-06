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
      <div font-serif mb-1>
        Two Phases
      </div>
      <div grid grid-rows-2 gap-8 flex-grow>
        <div relative border-2 border-gray-400 rounded-lg px-2 py-1 data-arrow-from="A1 A2 A3 A4 A5">
          <div text-sm font-bold>Analyze</div>
          <img block absolute right-8 top-2 style="height: calc(100% - 16px)" src="../assets/AnalyzerInner.svg" />
        </div>
        <div relative border-2 border-gray-400 rounded-lg px-2 py-1 data-arrow-from="T1 T2 T3 T4 T5">
          <div text-sm font-bold absolute bottom-2>Transform</div>
          <img block absolute right-6 top-2 style="height: calc(100% - 16px)" src="../assets/TransformerInner.svg" />
        </div>
      </div>
    </div>
    <div h-64 flex flex-col>
      <div font-serif mb-1>
        Optimizations
        <span text-sm op-70>(Mostly decoupled)</span>
      </div>
      <div flex-grow grid grid-rows-5 gap-2 class="optimizations2">
        <div data-arrow-to="A1 T1">Dead Code Elimination</div>
        <div data-arrow-to="A2 T2">Constant Folding</div>
        <div data-arrow-to="A3 T3">Property Name Mangling</div>
        <div data-arrow-to="A4 T4">React.js Optimization</div>
        <div data-arrow-to="A5 T5">...</div>
      </div>
    </div>


    <div absolute left-5 top-24>
      <svg width="88" height="93" viewBox="0 0 88 93" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.5 0.5V57.5H85.918L44 92.3496L2.08203 57.5H24.5V0.5H63.5Z" fill="#D9D9D9" stroke="#9F9F9F"/>
      </svg>
      <div absolute text-center text-xs inset-0 style="writing-mode: vertical-lr;" flex items-center pt-1>
        Information<br>Collected
      </div>
    </div>
  </div>
  <ArrowConn no-arrow arrow-id="A1" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="A2" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="A3" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="A4" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="A5" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="T1" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="T2" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="T3" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="T4" color="rgb(156,163,175)" />
  <ArrowConn no-arrow arrow-id="T5" color="rgb(156,163,175)" />
</template>

<style scoped>
.optimizations2 > div {
  --uno: p-2 border-gray-400 border-solid border-2 rounded-lg leading-4 flex items-center text-15px;
}
</style>