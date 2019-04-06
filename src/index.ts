const BASE = '$.sw-[]';
export class Template {
  /**
   * @internal
   */
  static reg = new RegExp(`\\{([${escape(BASE)}]*)\\}`, 'g');
  /**
   * @internal
   */
  private static _sep: string = '{|}';
  static set sep(value: string) {
    const [left, right] = value
      .trim()
      .split(/[\s?|\|]/, 2)
      .map(s => s.trim());
    if (!left || !right) {
      throw new Error('Invalid Template.sep value\n');
    }
    Template.reg = new RegExp(`${escape(left)}([${escape(BASE)}]*)${escape(right)}`, 'g');
    Template._sep = value;
  }
  static get sep() {
    return Template._sep;
  }

  static expand(template: string, values: { [key: string]: any }): string;
  static expand(template: string[], values: { [key: string]: any }): string[];

  static expand(template: string | string[], values: { [key: string]: any }) {
    function replacer(template: string, values: { [key: string]: any }) {
      return template.replace(Template.reg, (sub, key: string) => {
        let t = values as any;
        key = key.trim();
        key.split(/\.|\[|\]/).forEach(k => (t = k ? t[k] : t));
        if (t && (typeof t === 'string' || typeof t === 'number')) {
          return t as string;
        }
        throw Error(`Missing value for template key "${key}"`);
      });
    }
    if (typeof template === 'string') {
      return replacer(template, values);
    } else {
      return [...template].map(v => replacer(v, values));
    }
  }
}
function escape(str: string): string {
  return str
    .split('')
    .map(s => '\\' + s)
    .join('');
}
export const expand = Template.expand;
