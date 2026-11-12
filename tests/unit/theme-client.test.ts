import { describe, expect, it } from 'vitest';
import { createTheme, type ThemeEnv } from '../../src/lib/theme-client';

/** A fake page and storage, so the theme logic is tested without a browser. */
function fake({ dark = false, storageThrows = false, noStorage = false }: { dark?: boolean; storageThrows?: boolean; noStorage?: boolean } = {}) {
  const attrs = new Map<string, string>();
  const store = new Map<string, string>();
  const events: string[] = [];
  const guard = () => {
    if (storageThrows) throw new Error('blocked');
  };
  const env: ThemeEnv = {
    root: {
      getAttribute: (n) => attrs.get(n) ?? null,
      setAttribute: (n, v) => void attrs.set(n, v),
      removeAttribute: (n) => void attrs.delete(n),
    },
    storage: noStorage
      ? null
      : {
          getItem: (k) => (guard(), store.get(k) ?? null),
          setItem: (k, v) => (guard(), void store.set(k, v)),
          removeItem: (k) => (guard(), void store.delete(k)),
        },
    systemPrefersDark: () => dark,
    notify: () => void events.push('changed'),
  };
  return { theme: createTheme(env), attrs, store, events };
}

describe('theme', () => {
  it('follows the system until a choice is made', () => {
    expect(fake({ dark: false }).theme.isDark()).toBe(false);
    expect(fake({ dark: true }).theme.isDark()).toBe(true);
    expect(fake().theme.choice()).toBe('system');
  });

  it('an explicit choice beats the system setting, is applied and is saved', () => {
    const f = fake({ dark: true });
    f.theme.set('light');
    expect(f.theme.isDark()).toBe(false);
    expect(f.attrs.get('data-theme')).toBe('light');
    expect(f.store.get('duck.theme')).toBe('light');
    f.theme.set('dark');
    expect(f.theme.isDark()).toBe(true);
    expect(f.theme.saved()).toBe('dark');
  });

  it('choosing "system" removes the attribute and the saved value', () => {
    const f = fake();
    f.theme.set('dark');
    f.theme.set('system');
    expect(f.attrs.has('data-theme')).toBe(false);
    expect(f.store.has('duck.theme')).toBe(false);
    expect(f.theme.choice()).toBe('system');
  });

  it('toggle flips what is showing, including from "system"', () => {
    const f = fake({ dark: true });
    f.theme.toggle(); // system is dark, so go light
    expect(f.theme.choice()).toBe('light');
    f.theme.toggle();
    expect(f.theme.choice()).toBe('dark');
  });

  it('tells the rest of the page after every change', () => {
    const f = fake();
    f.theme.set('dark');
    f.theme.toggle();
    f.theme.clearSaved();
    expect(f.events).toHaveLength(3);
  });

  it('clearSaved forgets the choice', () => {
    const f = fake();
    f.theme.set('dark');
    f.theme.clearSaved();
    expect(f.theme.saved()).toBe('system');
    expect(f.store.size).toBe(0);
  });

  it('still works when storage is blocked or missing', () => {
    for (const f of [fake({ storageThrows: true }), fake({ noStorage: true })]) {
      expect(() => f.theme.set('dark')).not.toThrow();
      expect(f.theme.isDark()).toBe(true);
      expect(f.theme.saved()).toBe('system');
      expect(() => f.theme.clearSaved()).not.toThrow();
    }
  });

  it('ignores a saved value it does not know', () => {
    const f = fake();
    f.store.set('duck.theme', 'purple');
    expect(f.theme.saved()).toBe('system');
  });
});
