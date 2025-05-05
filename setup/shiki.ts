import {
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => {
  return {
    transformers: [
      transformerNotationHighlight(),
      {
        preprocess(code) {
          let replaceOffset = 0;
          this.meta.offsets = new Map();
          return code.replaceAll(/\[\[(.+?)(\{.+?\})?\]\]/g, (_, content, attrs, offset) => {
            this.meta.offsets.set(offset - replaceOffset, attrs);
            replaceOffset += 4 + (attrs?.length ?? 0);
            return content;
          })
        },
        tokens(tokens) {
          for (const tokensLine of tokens) {
            const original = [...tokensLine];
            tokensLine.length = 0;
            for (const token of original) {
              const trimed = token.content.trimStart();
              const spaces = token.content.length - trimed.length;
              const index = token.offset + spaces;
              if (this.meta.offsets.has(index)) {
                tokensLine.push({
                  content: token.content.slice(0, spaces),
                  offset: token.offset,
                })
                token.content = trimed;
                token.offset += spaces;
                (token.htmlAttrs ??= {})["DepAtom"] = this.meta.offsets.get(index) ?? "";
              }
              tokensLine.push(token);
            }
          }
        }
      }
    ],
  }
})
