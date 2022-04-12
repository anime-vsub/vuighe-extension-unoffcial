const REGEXP_VUIGHE_NET = /^https?:\/\/vuighe\.net/i;

export function isVuiGhe(url: string): boolean {
  return REGEXP_VUIGHE_NET.exec(url);
}
