import { defineComponent, h } from "vue";
import Dep from "./Dep.ts";

export default defineComponent({
  render({ $slots }) {
    const defaultSlot = $slots?.default?.();
    const dep = defaultSlot?.[0]?.children ?? "";
    const result: any[] = [];
    if (typeof dep === 'string' && defaultSlot?.length === 1) {
      const deps = dep.split(',').filter(Boolean);
      let isFirst = true;
      deps.forEach((dep) => {
        if (!isFirst) {
          result.push(h('span', {
          }, ','));
        }
        isFirst = false;
        result.push(h(Dep, {}, dep));
      })
    } else {
      result.push(defaultSlot);
    }
    return h('span', {
      style: {
        color: 'rgb(0,0,0,0.7)',
        fontFamily: 'var(--prism-font-family)',
      }
    }, [
      "{",
      ...result,
      "}",
    ]);
  }
})