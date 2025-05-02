import { defineComponent, h } from "vue";

export default defineComponent({
  render({ $slots }) {
    const defaultSlot = $slots?.default?.();
    const dep = defaultSlot?.[0]?.children;
    if (typeof dep !== 'string' || defaultSlot?.length !== 1) {
      return (h('span', {
        style: {
          color: 'rgb(0,0,0)',
          fontWeight: '600',
          fontFamily: 'var(--prism-font-family)',
        }
      }, defaultSlot));
    } else if (/^(\w+)\((\d+)\)$/.test(dep)) {
      const [name, id] = dep.split('(');
      return h('span', {
        style: {
          color: 'var(--dep-atom-color)',
          fontWeight: '600',
          fontFamily: 'var(--prism-font-family)',
        }
      }, [
        h('span', {
          style: {
            display: 'inline-block',
            fontSize: '0.8em',
            transform: 'translateY(0em)',
          }
        }, name.toUpperCase()),
        id.slice(0,-1),
      ])
    } else if (/^\d+$/.test(dep)) {
      return (h('span', {
        style: {
          color: 'var(--dep-atom-color)',
          fontWeight: '600',
          fontFamily: 'var(--prism-font-family)',
        }
      }, dep));
    } else {
      return (h('code', {
        style: {
          color: 'rgb(0,0,0)',
          fontWeight: '600',
          fontFamily: 'var(--prism-font-family)',
        }
      }, dep));
    }
  }
})
