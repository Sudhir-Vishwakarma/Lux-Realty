'use client';

import { useState, useEffect, useRef } from 'react';

const BOTS = [
  { name: 'Pranit', label: 'General Property Enquiry', pubKey: 'cbk_pub_41016b05b5d2c6bd0e188d35' },
  { name: 'Rustomjee', label: 'Rustomjee Projects', pubKey: 'cbk_pub_30b481d3451f7749f042bb92' },
  { name: 'ATS HomeKraft', label: 'ATS HomeKraft Projects', pubKey: 'cbk_pub_ec348c5c93cb8064ab107da8' },
  { name: 'Manju', label: 'Mana Projects', pubKey: 'cbk_pub_3ffcc9d887ba22571ca7ccef' },
  { name: 'Sunaina', label: 'Universal Education', pubKey: 'cbk_pub_f7d05ce368e7c32866ef829e' },
];

function sniffPubKey(host: HTMLElement): string | null {
  for (const attr of ['data-chatbot', 'data-key', 'id']) {
    const val = host.getAttribute(attr) ?? '';
    const b = BOTS.find(b => val.includes(b.pubKey));
    if (b) return b.pubKey;
  }
  try {
    const html = host.shadowRoot?.innerHTML ?? '';
    const b = BOTS.find(b => html.includes(b.pubKey));
    if (b) return b.pubKey;
  } catch { /* closed shadow */ }
  return null;
}

interface Widget {
  pubKey: string;
  host: HTMLElement;
  shadow: ShadowRoot;
  launcher: HTMLElement | null; // direct shadow-root child that wraps the mascot + button
  idx: number;
  chatActive: boolean;
}

// Returns true if any non-launcher shadow child is visible — i.e. the chat panel is open
function isChatPanelVisible(w: Widget): boolean {
  return Array.from(w.shadow.children)
    .filter(el => el !== w.launcher)
    .some(el => {
      const s = window.getComputedStyle(el as HTMLElement);
      return s.display !== 'none' && s.visibility !== 'hidden';
    });
}

// Watch for the chat panel to close, then re-hide the entire shadow host
function watchForChatClose(w: Widget) {
  let stopped = false;

  function onClose() {
    if (stopped) return;
    stopped = true;
    w.chatActive = false;
    w.host.style.setProperty('display', 'none', 'important');
  }

  // Give widget 1.5 s to open the chat panel before we start checking
  setTimeout(() => {
    if (stopped) return;

    const mo = new MutationObserver(() => {
      if (stopped) { mo.disconnect(); return; }
      if (!isChatPanelVisible(w)) { onClose(); mo.disconnect(); }
    });
    mo.observe(w.shadow, { childList: true, subtree: true, attributes: true });

    // Fallback poll every 800 ms
    const iv = setInterval(() => {
      if (stopped) { clearInterval(iv); return; }
      if (!isChatPanelVisible(w)) { onClose(); clearInterval(iv); mo.disconnect(); }
    }, 800);

    // Safety cleanup after 30 min
    setTimeout(() => { stopped = true; mo.disconnect(); clearInterval(iv); }, 1_800_000);
  }, 1500);
}

export default function ChatbotFAB() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const widgets = useRef<Widget[]>([]);

  // Inject both scripts dynamically — Pranit first, Rustomjee 1.5 s later —
  // so shadow host discovery order matches the BOTS array order
  useEffect(() => {
    function injectBot(pubKey: string) {
      if (document.querySelector(`script[data-chatbot="${pubKey}"]`)) return;
      const s = document.createElement('script');
      s.src = 'https://db.brewhouse.realatte.com/api/chatbot/widget.js';
      s.setAttribute('data-chatbot', pubKey);
      s.async = true;
      document.body.appendChild(s);
    }
    injectBot('cbk_pub_41016b05b5d2c6bd0e188d35');
    setTimeout(() => injectBot('cbk_pub_30b481d3451f7749f042bb92'), 1500);
    setTimeout(() => injectBot('cbk_pub_ec348c5c93cb8064ab107da8'), 3000);
    setTimeout(() => injectBot('cbk_pub_3ffcc9d887ba22571ca7ccef'), 4500);
    setTimeout(() => injectBot('cbk_pub_f7d05ce368e7c32866ef829e'), 6000);
  }, []);

  useEffect(() => {
    function processHost(host: HTMLElement) {
      const shadow = host.shadowRoot;
      if (!shadow) return;

      const btn = shadow.querySelector('button') as HTMLElement | null;
      if (!btn) return;
      if (widgets.current.some(w => w.host === host)) return;

      let pubKey = sniffPubKey(host);
      if (!pubKey) {
        const taken = new Set(widgets.current.map(w => w.pubKey));
        pubKey = BOTS.find(b => !taken.has(b.pubKey))?.pubKey ?? null;
      }
      if (!pubKey) return;

      // Find the launcher — walk up from button to its direct-child-of-shadow-root ancestor
      let launcher: HTMLElement | null = btn;
      while (launcher && launcher.parentNode !== (shadow as unknown as Node)) {
        launcher = launcher.parentElement;
      }

      const w: Widget = { pubKey, host, shadow, launcher, idx: widgets.current.length, chatActive: false };

      // Hide entire shadow host so nothing floats on page by default
      host.style.setProperty('display', 'none', 'important');

      widgets.current.push(w);
      setCount(n => n + 1);
    }

    function scan() {
      (Array.from(document.body.children) as HTMLElement[]).forEach(el => {
        if (el instanceof HTMLElement && el.shadowRoot) processHost(el);
      });
    }

    const mo = new MutationObserver(mutations =>
      mutations.forEach(m =>
        m.addedNodes.forEach(n => {
          if (n instanceof HTMLElement) setTimeout(() => { if (n.shadowRoot) processHost(n); }, 600);
        })
      )
    );
    mo.observe(document.body, { childList: true });
    [800, 1500, 3000, 6000].forEach(t => setTimeout(scan, t));
    return () => mo.disconnect();
  }, []);

  function openBot(pubKey: string) {
    const w = widgets.current.find(w => w.pubKey === pubKey);
    if (!w) return;

    setOpen(false);
    w.chatActive = true;

    // Show the shadow host so the chat panel can render
    w.host.style.removeProperty('display');
    w.host.style.transform = '';
    w.host.style.transition = '';

    // Explicitly hide the launcher (mascot + toggle button) so it does NOT
    // overlap the amber FAB — only the chat panel will be visible
    if (w.launcher) {
      w.launcher.style.setProperty('display', 'none', 'important');
    }

    // Click the toggle button to open the chat panel
    const btn = w.shadow.querySelector('button') as HTMLElement | null;
    btn?.click();

    // Watch for the chat panel to close, then re-hide the host
    watchForChatClose(w);
  }

  const LABEL_BOTTOMS = [100, 180, 260, 340, 420];

  return (
    <>
      {open && <div className="fixed inset-0 z-298" onClick={() => setOpen(false)} />}

      {/* Clickable bot cards — animate up when FAB is open */}
      {count > 0 && widgets.current.map(w => {
        const bot = BOTS.find(b => b.pubKey === w.pubKey);
        const bottom = LABEL_BOTTOMS[w.idx] ?? (100 + w.idx * 80);
        if (!bot) return null;
        return (
          <button
            key={w.pubKey}
            onClick={() => openBot(w.pubKey)}
            className="fixed z-299 cursor-pointer select-none"
            style={{
              bottom: `${bottom}px`,
              right: '24px',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.85)',
              transition: `opacity 260ms ${w.idx * 90}ms, transform 320ms cubic-bezier(0.34,1.56,0.64,1) ${w.idx * 90}ms`,
              pointerEvents: open ? 'auto' : 'none',
            }}
          >
            <div className="flex items-center gap-3 bg-white rounded-2xl pl-4 pr-5 py-3 shadow-2xl border border-gray-100 hover:shadow-xl active:scale-95 transition-all">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                style={{ background: w.idx === 0 ? '#1e3a8a' : w.idx === 1 ? '#d97706' : w.idx === 2 ? '#059669' : w.idx === 3 ? '#7c3aed' : '#dc2626' }}
              >
                {bot.name[0]}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 leading-none">{bot.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{bot.label}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse" />
            </div>
          </button>
        );
      })}

      {/* Main FAB */}
      <div className="fixed bottom-6 right-6 z-299">
        <button
          onClick={() => setOpen(p => !p)}
          aria-label={open ? 'Close' : 'Chat with us'}
          className="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? '#111827' : '#f59e0b',
            boxShadow: open
              ? '0 20px 40px rgba(17,24,39,0.4)'
              : '0 20px 40px rgba(245,158,11,0.45)',
          }}
        >
          {!open && <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20" />}
          {open ? (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
