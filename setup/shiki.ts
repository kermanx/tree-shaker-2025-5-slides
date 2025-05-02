/* ./setup/shiki.ts */
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => {
  return {
    transformers: [
      {
        preprocess(code) {
          let replaceCount = 0;
          this.meta.offsets = new Set();
          return code.replaceAll(/\[\[(.+?)\]\]/g, (_, content, offset) => {
            this.meta.offsets.add(offset - replaceCount * 4);
            replaceCount++;
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
              if (this.meta.offsets.has(token.offset + spaces)) {
                tokensLine.push({
                  content: token.content.slice(0, spaces),
                  offset: token.offset,
                })
                token.content = trimed;
                token.offset += spaces;
                (token.htmlAttrs ??= {})["DepAtom"] = "true";
              }
              tokensLine.push(token);
            }
          }
        }
      }
    ],
  }
})
