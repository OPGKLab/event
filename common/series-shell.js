/* ==========================================================
   OPGK Lab イベントサイト共通スクリプト
   このファイルはイベントごとに編集しません。
   各イベントページは事前に event-config.js を読み込み、
   window.EVENT_CONFIG を定義しておいてください。
   ========================================================== */

(function () {
  const cfg = window.EVENT_CONFIG || {};
  const pages = cfg.pages || [];
  const currentKey = document.body.dataset.page || '';

  // ---------- ヘッダー ----------
  function renderHeader() {
    const el = document.getElementById('shell-header');
    if (!el) return;

    const navHtml = pages
      .map((p) => {
        const current = p.key === currentKey ? ' aria-current="page"' : '';
        return `<li><a href="${p.href}"${current}>${p.label}</a></li>`;
      })
      .join('');

    el.innerHTML = `
      <div class="shell-header__inner">
        <a class="shell-brand" href="${cfg.homeHref || 'index.html'}">🌿 OPGK Lab</a>
        <h1 class="shell-event-title">${cfg.title || ''}</h1>
        ${cfg.tagline ? `<p class="shell-event-tagline">${cfg.tagline}</p>` : ''}
        <ul class="shell-nav">${navHtml}</ul>
      </div>
    `;
  }

  // ---------- フッター ----------
  function renderFooter() {
    const el = document.getElementById('shell-footer');
    if (!el) return;
    el.innerHTML = `
      <p>🌿 <a href="https://opgklab.github.io/opgk-lab-games/">OPGK Lab</a>${cfg.footerNote ? ' ・ ' + cfg.footerNote : ''}</p>
    `;
  }

  // ---------- 開催情報パネル(日時・会場) ----------
  // 値が1つも無ければ何も描画しない(常設ページとして使える)
  function renderEventInfo(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (!el) return;

    const rows = [
      ['日時', cfg.date && cfg.time ? `${cfg.date}　${cfg.time}` : cfg.date || cfg.time],
      ['会場', cfg.venue],
    ].filter(([, v]) => !!v);

    if (rows.length === 0) {
      el.innerHTML = '';
      return;
    }

    const dtHtml = rows
      .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
      .join('');

    el.innerHTML = `
      <div class="shell-panel">
        <dl class="shell-info-list">${dtHtml}</dl>
      </div>
    `;
  }

  // ---------- QRブロック ----------
  // qrImage が未設定なら何も描画しない
  function renderQR(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (!el) return;

    if (!cfg.qrImage) {
      el.innerHTML = '';
      return;
    }

    el.innerHTML = `
      <div class="shell-panel shell-qr">
        <img src="${cfg.qrImage}" alt="QRコード" />
        <p class="shell-qr__caption">${cfg.qrCaption || 'スマートフォンで読み取ってアクセス'}</p>
      </div>
    `;
  }

  // ---------- 申込み・問い合わせボタン ----------
  // formUrl が未設定なら何も描画しない
  function renderFormButton(targetSelector, label) {
    const el = document.querySelector(targetSelector);
    if (!el) return;

    if (!cfg.formUrl) {
      el.innerHTML = '';
      return;
    }

    el.innerHTML = `<a class="shell-button" href="${cfg.formUrl}" target="_blank" rel="noopener">${label || 'フォームを開く'}</a>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderFooter();
  });

  // ページ側から呼べるように公開
  window.ShellUI = {
    renderEventInfo,
    renderQR,
    renderFormButton,
  };
})();
