import React from 'react';

const BusGoStyles = () => (
  <style>{`
    :root {
      --busgo-primary: #0F766E;
      --busgo-primary-2: #14B8A6;
      --busgo-accent: #F97316;
      --busgo-bg: #F6F8FB;
      --busgo-card: #FFFFFF;
      --busgo-text: #0F172A;
      --busgo-muted: #64748B;
      --busgo-line: #E2E8F0;
      --busgo-success: #16A34A;
      --busgo-danger: #DC2626;
      --busgo-warning: #F59E0B;
      --busgo-blue: #2563EB;
      --busgo-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
      --busgo-radius: 22px;
    }

    .busgo-page, .busgo-page * { box-sizing: border-box; }
    .busgo-page {
      min-height: 100vh;
      background: var(--busgo-bg);
      color: var(--busgo-text);
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .busgo-page a { color: inherit; text-decoration: none; }
    .busgo-container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }

    .busgo-topbar {
      background: linear-gradient(120deg, #063F3B 0%, #0F766E 55%, #14B8A6 100%);
      color: white;
      padding: 18px 0 120px;
      position: relative;
      overflow: hidden;
    }
    .busgo-topbar::after {
      content: "";
      position: absolute;
      width: 560px;
      height: 560px;
      right: -150px;
      top: -220px;
      background: rgba(255,255,255,.11);
      border-radius: 999px;
    }

    .busgo-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 28px;
      position: relative;
      z-index: 2;
    }
    .busgo-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      font-size: 24px;
      letter-spacing: -0.03em;
    }
    .busgo-brand-mark {
      width: 42px;
      height: 42px;
      border-radius: 15px;
      background: white;
      color: var(--busgo-primary);
      display: grid;
      place-items: center;
      box-shadow: 0 8px 22px rgba(0,0,0,.12);
      font-size: 18px;
      font-weight: 900;
    }
    .busgo-nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      color: rgba(255,255,255,.86);
      font-weight: 600;
      font-size: 14px;
    }
    .busgo-nav-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .busgo-btn {
      border: 0;
      border-radius: 999px;
      padding: 13px 18px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: .2s ease;
      white-space: nowrap;
      font: inherit;
    }
    .busgo-btn:hover { transform: translateY(-1px); }
    .busgo-btn-white { background: white; color: var(--busgo-primary); }
    .busgo-btn-outline { background: rgba(255,255,255,.12); color: white; border: 1px solid rgba(255,255,255,.22); }
    .busgo-btn-primary { background: var(--busgo-primary); color: white; }
    .busgo-btn-accent { background: var(--busgo-accent); color: white; }
    .busgo-btn-soft { background: #E6FFFB; color: var(--busgo-primary); }
    .busgo-full { width: 100%; }

    .busgo-hero {
      display: grid;
      grid-template-columns: 1.05fr .95fr;
      gap: 54px;
      align-items: center;
      padding-top: 76px;
      position: relative;
      z-index: 2;
    }
    .busgo-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(255,255,255,.14);
      color: rgba(255,255,255,.9);
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 20px;
    }
    .busgo-hero h1 {
      font-size: clamp(42px, 6vw, 72px);
      line-height: .98;
      letter-spacing: -0.05em;
      margin: 0 0 20px;
    }
    .busgo-hero p {
      font-size: 18px;
      line-height: 1.7;
      color: rgba(255,255,255,.82);
      margin: 0 0 30px;
      max-width: 620px;
    }
    .busgo-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .busgo-hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 34px;
      max-width: 620px;
    }
    .busgo-stat {
      padding: 18px;
      border-radius: 18px;
      background: rgba(255,255,255,.12);
      border: 1px solid rgba(255,255,255,.16);
      backdrop-filter: blur(14px);
    }
    .busgo-stat strong { display: block; font-size: 24px; margin-bottom: 4px; }
    .busgo-stat span { color: rgba(255,255,255,.76); font-size: 13px; }

    .busgo-hero-card {
      border-radius: 34px;
      background: rgba(255,255,255,.13);
      border: 1px solid rgba(255,255,255,.19);
      padding: 18px;
      backdrop-filter: blur(18px);
      box-shadow: 0 30px 90px rgba(0,0,0,.18);
    }
    .busgo-phone {
      background: #F8FAFC;
      border-radius: 28px;
      padding: 20px;
      color: var(--busgo-text);
      min-height: 520px;
      position: relative;
      overflow: hidden;
    }
    .busgo-map-lines {
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle at 20% 20%, rgba(20,184,166,.18), transparent 26%),
        radial-gradient(circle at 80% 10%, rgba(249,115,22,.13), transparent 24%),
        linear-gradient(135deg, transparent 0 45%, rgba(15,118,110,.08) 45% 47%, transparent 47% 100%);
      pointer-events: none;
    }
    .busgo-route-card, .busgo-mini-card {
      position: relative;
      background: white;
      border-radius: 22px;
      border: 1px solid var(--busgo-line);
      box-shadow: var(--busgo-shadow);
      padding: 18px;
    }
    .busgo-route-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }
    .busgo-location h3, .busgo-location p { margin: 0; }
    .busgo-location h3 { font-size: 20px; }
    .busgo-location p { font-size: 13px; color: var(--busgo-muted); margin-top: 4px; }
    .busgo-swap {
      width: 42px;
      height: 42px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: #ECFEFF;
      color: var(--busgo-primary);
      font-size: 20px;
    }
    .busgo-bus-visual {
      margin-top: 24px;
      background: #0F172A;
      border-radius: 26px;
      padding: 18px;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .busgo-bus-visual::before {
      content: "";
      position: absolute;
      width: 170px;
      height: 170px;
      border-radius: 50%;
      background: rgba(20,184,166,.2);
      right: -45px;
      top: -35px;
    }
    .busgo-bus-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }
    .busgo-bus-head h4 { margin: 0 0 5px; }
    .busgo-bus-head span { color: rgba(255,255,255,.66); font-size: 13px; }
    .busgo-seat-mini {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 22px;
      position: relative;
      z-index: 2;
    }
    .busgo-seat-dot {
      height: 34px;
      border-radius: 10px;
      background: rgba(255,255,255,.14);
      border: 1px solid rgba(255,255,255,.14);
    }
    .busgo-seat-dot.active { background: var(--busgo-primary-2); }
    .busgo-seat-dot.busy { background: rgba(255,255,255,.36); opacity: .5; }
    .busgo-floating-ticket {
      position: absolute;
      right: 20px;
      bottom: 20px;
      left: 20px;
      background: white;
      color: var(--busgo-text);
      border-radius: 22px;
      padding: 16px;
      box-shadow: 0 18px 50px rgba(15, 23, 42, .14);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .busgo-floating-ticket small { color: var(--busgo-muted); display: block; margin-bottom: 4px; }
    .busgo-floating-ticket strong { font-size: 20px; color: var(--busgo-primary); }

    .busgo-search-panel {
      margin-top: -78px;
      position: relative;
      z-index: 5;
    }
    .busgo-search-card {
      background: white;
      border-radius: 28px;
      padding: 18px;
      box-shadow: var(--busgo-shadow);
      border: 1px solid var(--busgo-line);
    }
    .busgo-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .busgo-tab {
      padding: 12px 16px;
      border-radius: 999px;
      background: #F1F5F9;
      color: var(--busgo-muted);
      font-weight: 700;
      font-size: 14px;
    }
    .busgo-tab.active { background: #E6FFFB; color: var(--busgo-primary); }
    .busgo-search-grid {
      display: grid;
      grid-template-columns: 1.1fr 1.1fr .85fr .75fr auto;
      gap: 12px;
      align-items: end;
    }
    .busgo-field, .busgo-input {
      border: 1px solid var(--busgo-line);
      border-radius: 18px;
      padding: 14px 16px;
      background: #FCFCFD;
    }
    .busgo-field label, .busgo-input label {
      display: block;
      color: var(--busgo-muted);
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .busgo-field strong, .busgo-input span { font-size: 17px; font-weight: 700; }
    .busgo-field small { display: block; color: var(--busgo-muted); margin-top: 4px; }

    .busgo-section { padding: 80px 0; }
    .busgo-section-title {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 20px;
      margin-bottom: 28px;
    }
    .busgo-section-title h2 {
      font-size: 38px;
      line-height: 1.1;
      letter-spacing: -0.04em;
      margin: 0;
    }
    .busgo-section-title p {
      margin: 8px 0 0;
      color: var(--busgo-muted);
      line-height: 1.7;
      max-width: 620px;
    }

    .busgo-features {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
    }
    .busgo-feature {
      background: white;
      border: 1px solid var(--busgo-line);
      border-radius: var(--busgo-radius);
      padding: 24px;
      box-shadow: 0 10px 28px rgba(15,23,42,.04);
    }
    .busgo-icon {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      background: #E6FFFB;
      color: var(--busgo-primary);
      font-size: 14px;
      font-weight: 900;
      margin-bottom: 18px;
    }
    .busgo-feature h3 { margin: 0 0 10px; }
    .busgo-feature p { color: var(--busgo-muted); line-height: 1.65; margin: 0; font-size: 14px; }

    .busgo-booking-area {
      display: grid;
      grid-template-columns: 280px 1fr 340px;
      gap: 20px;
      align-items: start;
    }
    .busgo-panel {
      background: white;
      border: 1px solid var(--busgo-line);
      border-radius: var(--busgo-radius);
      box-shadow: 0 10px 30px rgba(15,23,42,.04);
      overflow: hidden;
    }
    .busgo-panel-head {
      padding: 20px;
      border-bottom: 1px solid var(--busgo-line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .busgo-panel-head h3 { margin: 0; font-size: 18px; }
    .busgo-panel-body { padding: 20px; }
    .busgo-filter-group { margin-bottom: 24px; }
    .busgo-filter-group h4 { margin: 0 0 12px; font-size: 14px; }
    .busgo-chip-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .busgo-chip {
      padding: 9px 12px;
      background: #F8FAFC;
      border: 1px solid var(--busgo-line);
      border-radius: 999px;
      color: var(--busgo-muted);
      font-weight: 700;
      font-size: 12px;
    }
    .busgo-chip.active {
      color: var(--busgo-primary);
      background: #E6FFFB;
      border-color: #99F6E4;
    }
    .busgo-link-action {
      color: var(--busgo-primary);
      font-weight: 800;
      font-size: 14px;
    }

    .busgo-trip-card {
      padding: 20px;
      border-bottom: 1px solid var(--busgo-line);
    }
    .busgo-trip-card:last-child { border-bottom: 0; }
    .busgo-trip-top {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 18px;
    }
    .busgo-operator {
      display: flex;
      gap: 14px;
      align-items: center;
    }
    .busgo-operator-logo {
      width: 54px;
      height: 54px;
      border-radius: 18px;
      background: linear-gradient(135deg, #0F766E, #14B8A6);
      color: white;
      display: grid;
      place-items: center;
      font-weight: 800;
      flex: 0 0 auto;
    }
    .busgo-operator-logo.orange { background: linear-gradient(135deg,#F97316,#FDBA74); }
    .busgo-operator-logo.blue { background: linear-gradient(135deg,#2563EB,#93C5FD); }
    .busgo-operator h3 { margin: 0 0 4px; font-size: 18px; }
    .busgo-meta { color: var(--busgo-muted); font-size: 13px; display: flex; gap: 8px; flex-wrap: wrap; }
    .busgo-rating {
      background: #FEF3C7;
      color: #92400E;
      padding: 6px 10px;
      border-radius: 999px;
      font-weight: 800;
      font-size: 12px;
    }
    .busgo-price { text-align: right; }
    .busgo-price strong { color: var(--busgo-accent); font-size: 24px; }
    .busgo-price small { display: block; color: var(--busgo-muted); margin-top: 4px; }
    .busgo-timeline {
      display: grid;
      grid-template-columns: 86px 1fr 86px;
      gap: 14px;
      align-items: center;
      margin-bottom: 18px;
    }
    .busgo-time strong { display: block; font-size: 22px; }
    .busgo-time small { color: var(--busgo-muted); }
    .busgo-time.end { text-align: right; }
    .busgo-line {
      position: relative;
      height: 2px;
      background: var(--busgo-line);
    }
    .busgo-line::before, .busgo-line::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--busgo-primary);
    }
    .busgo-line::before { left: 0; }
    .busgo-line::after { right: 0; background: var(--busgo-accent); }
    .busgo-line span {
      position: absolute;
      left: 50%;
      top: -22px;
      transform: translateX(-50%);
      color: var(--busgo-muted);
      font-size: 12px;
      white-space: nowrap;
    }
    .busgo-trip-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .busgo-seat-map {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    .busgo-deck {
      border: 1px solid var(--busgo-line);
      border-radius: 20px;
      padding: 16px;
      background: #F8FAFC;
    }
    .busgo-deck-title {
      display: flex;
      justify-content: space-between;
      color: var(--busgo-muted);
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 14px;
    }
    .busgo-seats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .busgo-seat {
      height: 38px;
      border-radius: 12px;
      border: 1px solid #CBD5E1;
      background: white;
      color: var(--busgo-text);
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 12px;
      cursor: pointer;
    }
    .busgo-seat.selected { background: var(--busgo-primary); color: white; border-color: var(--busgo-primary); }
    .busgo-seat.booked { background: #E2E8F0; color: #94A3B8; text-decoration: line-through; cursor: not-allowed; }
    .busgo-seat.vip { border-color: var(--busgo-accent); color: var(--busgo-accent); }
    .busgo-legend {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 16px;
      font-size: 12px;
      color: var(--busgo-muted);
    }
    .busgo-legend i {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 4px;
      margin-right: 5px;
      vertical-align: -1px;
      background: white;
      border: 1px solid var(--busgo-line);
    }
    .busgo-legend .selected { background: var(--busgo-primary); border-color: var(--busgo-primary); }
    .busgo-legend .booked { background: #E2E8F0; }
    .busgo-legend .vip { border-color: var(--busgo-accent); }
    .busgo-summary { margin-top: 22px; }
    .busgo-summary-row {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      padding: 13px 0;
      border-bottom: 1px dashed var(--busgo-line);
      color: var(--busgo-muted);
    }
    .busgo-summary-row strong { color: var(--busgo-text); text-align: right; }
    .busgo-summary-row.total {
      border-bottom: 0;
      color: var(--busgo-text);
      font-size: 18px;
      font-weight: 800;
      margin-top: 8px;
    }
    .busgo-summary-row.total strong { color: var(--busgo-accent); font-size: 24px; }

    .busgo-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .busgo-step {
      background: white;
      border-radius: var(--busgo-radius);
      padding: 24px;
      border: 1px solid var(--busgo-line);
      position: relative;
    }
    .busgo-step-num {
      width: 38px;
      height: 38px;
      border-radius: 14px;
      background: var(--busgo-primary);
      color: white;
      display: grid;
      place-items: center;
      font-weight: 800;
      margin-bottom: 18px;
    }
    .busgo-step h3 { margin: 0 0 10px; }
    .busgo-step p { margin: 0; color: var(--busgo-muted); line-height: 1.65; font-size: 14px; }

    .busgo-checkout {
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      gap: 20px;
      align-items: start;
    }
    .busgo-form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .busgo-input.full { grid-column: 1 / -1; }
    .busgo-payment-title { margin: 28px 0 14px; }
    .busgo-payment-methods {
      display: grid;
      gap: 12px;
    }
    .busgo-payment {
      border: 1px solid var(--busgo-line);
      border-radius: 18px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      background: #FCFCFD;
    }
    .busgo-payment.active {
      border-color: #99F6E4;
      background: #ECFEFF;
    }
    .busgo-payment-left {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .busgo-pay-icon {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      background: white;
      border: 1px solid var(--busgo-line);
      font-weight: 900;
      font-size: 12px;
    }
    .busgo-payment small { color: var(--busgo-muted); }

    .busgo-ticket-preview {
      background: linear-gradient(135deg, #0F172A, #164E63);
      border-radius: 28px;
      padding: 24px;
      color: white;
      box-shadow: 0 25px 70px rgba(15,23,42,.2);
      position: relative;
      overflow: hidden;
    }
    .busgo-ticket-preview::after {
      content: "";
      position: absolute;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: rgba(20,184,166,.18);
      right: -40px;
      top: -60px;
    }
    .busgo-ticket-preview h3 { margin: 0 0 18px; position: relative; z-index: 2; }
    .busgo-qr {
      width: 110px;
      height: 110px;
      border-radius: 18px;
      background:
        linear-gradient(90deg, #fff 10px, transparent 10px) 0 0 / 22px 22px,
        linear-gradient(#fff 10px, transparent 10px) 0 0 / 22px 22px,
        #0F172A;
      border: 10px solid white;
      margin-bottom: 18px;
      position: relative;
      z-index: 2;
    }
    .busgo-ticket-info {
      display: grid;
      gap: 12px;
      position: relative;
      z-index: 2;
    }
    .busgo-ticket-info div {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255,255,255,.14);
    }
    .busgo-ticket-info span { color: rgba(255,255,255,.68); }
    .busgo-ticket-info strong { text-align: right; }

    .busgo-operator-dashboard {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 20px;
    }
    .busgo-side-menu {
      background: #0F172A;
      color: white;
      border-radius: var(--busgo-radius);
      padding: 18px;
    }
    .busgo-side-menu h3 { margin: 8px 8px 18px; }
    .busgo-menu-item {
      padding: 13px 14px;
      border-radius: 14px;
      color: rgba(255,255,255,.74);
      font-weight: 700;
      margin-bottom: 6px;
    }
    .busgo-menu-item.active { background: rgba(20,184,166,.18); color: white; }
    .busgo-dashboard-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }
    .busgo-dash-card {
      background: white;
      border: 1px solid var(--busgo-line);
      border-radius: var(--busgo-radius);
      padding: 20px;
    }
    .busgo-dash-card span { color: var(--busgo-muted); font-weight: 700; font-size: 13px; }
    .busgo-dash-card strong { display: block; font-size: 30px; margin-top: 8px; }
    .busgo-table-wrap {
      background: white;
      border: 1px solid var(--busgo-line);
      border-radius: var(--busgo-radius);
      overflow: auto;
    }
    .busgo-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 680px;
    }
    .busgo-table th, .busgo-table td {
      padding: 16px;
      border-bottom: 1px solid var(--busgo-line);
      text-align: left;
      white-space: nowrap;
    }
    .busgo-table th {
      color: var(--busgo-muted);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .busgo-table tr:last-child td { border-bottom: 0; }
    .busgo-status {
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 800;
    }
    .busgo-status.ok { background: #DCFCE7; color: #166534; }
    .busgo-status.wait { background: #FEF3C7; color: #92400E; }
    .busgo-status.cancel { background: #FEE2E2; color: #991B1B; }

    .busgo-footer {
      background: #0F172A;
      color: white;
      padding: 54px 0;
    }
    .busgo-footer-grid {
      display: grid;
      grid-template-columns: 1.4fr repeat(3, 1fr);
      gap: 30px;
    }
    .busgo-footer p, .busgo-footer a {
      color: rgba(255,255,255,.68);
      line-height: 1.8;
    }
    .busgo-footer h4 { margin: 0 0 14px; }

    @media (max-width: 1100px) {
      .busgo-nav-links { display: none; }
      .busgo-hero { grid-template-columns: 1fr; }
      .busgo-search-grid { grid-template-columns: repeat(2, 1fr); }
      .busgo-search-grid .busgo-btn { grid-column: 1 / -1; }
      .busgo-features, .busgo-steps { grid-template-columns: repeat(2, 1fr); }
      .busgo-booking-area { grid-template-columns: 1fr; }
      .busgo-seat-map { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .busgo-checkout, .busgo-operator-dashboard { grid-template-columns: 1fr; }
      .busgo-footer-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 720px) {
      .busgo-container { width: min(100% - 28px, 1180px); }
      .busgo-topbar { padding-bottom: 98px; }
      .busgo-nav { align-items: flex-start; }
      .busgo-nav-actions { display: none; }
      .busgo-hero { padding-top: 46px; gap: 30px; }
      .busgo-hero h1 { font-size: 42px; }
      .busgo-hero p { font-size: 16px; }
      .busgo-hero-stats { grid-template-columns: 1fr; }
      .busgo-phone { min-height: 470px; }
      .busgo-search-panel { margin-top: -58px; }
      .busgo-search-grid, .busgo-features, .busgo-steps, .busgo-form-grid, .busgo-footer-grid { grid-template-columns: 1fr; }
      .busgo-section { padding: 56px 0; }
      .busgo-section-title h2 { font-size: 30px; }
      .busgo-trip-top, .busgo-trip-actions { align-items: flex-start; }
      .busgo-trip-top { flex-direction: column; }
      .busgo-price { text-align: left; }
      .busgo-timeline { grid-template-columns: 74px 1fr 74px; }
      .busgo-seat-map { grid-template-columns: 1fr; }
      .busgo-dashboard-grid { grid-template-columns: 1fr; }
      .busgo-floating-ticket { position: relative; left: auto; right: auto; bottom: auto; margin-top: 18px; }
    }
  `}</style>
);

export default BusGoStyles;
