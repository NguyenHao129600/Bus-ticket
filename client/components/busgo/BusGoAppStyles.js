import React from 'react';

const BusGoAppStyles = () => (
  <style>{`
    .busgo-app-shell {
      min-height: 100vh;
      background: var(--busgo-bg);
    }
    .busgo-app-top {
      background: linear-gradient(120deg, #063F3B 0%, #0F766E 70%, #14B8A6 100%);
      color: white;
      padding: 18px 0;
      position: sticky;
      top: 0;
      z-index: 20;
      box-shadow: 0 10px 30px rgba(15, 23, 42, .12);
    }
    .busgo-app-main {
      padding: 32px 0 56px;
    }
    .busgo-layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 24px;
      align-items: start;
    }
    .busgo-auth-layout {
      min-height: 100vh;
      display: grid;
      grid-template-columns: .95fr 1.05fr;
      background: var(--busgo-bg);
    }
    .busgo-auth-hero {
      background: linear-gradient(135deg, #063F3B, #0F766E 60%, #14B8A6);
      color: white;
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .busgo-auth-hero h1 {
      margin: 44px 0 16px;
      font-size: clamp(40px, 5vw, 66px);
      line-height: 1;
      letter-spacing: -0.04em;
    }
    .busgo-auth-hero p {
      max-width: 560px;
      line-height: 1.7;
      color: rgba(255,255,255,.78);
      font-size: 17px;
    }
    .busgo-auth-content {
      display: grid;
      place-items: center;
      padding: 36px 20px;
    }
    .busgo-auth-card {
      width: min(520px, 100%);
      background: white;
      border: 1px solid var(--busgo-line);
      border-radius: 28px;
      box-shadow: var(--busgo-shadow);
      padding: 28px;
    }
    .busgo-auth-card h2 {
      margin: 0 0 8px;
      font-size: 30px;
      letter-spacing: -0.03em;
    }
    .busgo-auth-card p {
      color: var(--busgo-muted);
      margin: 0 0 22px;
      line-height: 1.6;
    }
    .busgo-sidebar {
      background: #0F172A;
      color: white;
      border-radius: var(--busgo-radius);
      padding: 16px;
      position: sticky;
      top: 92px;
    }
    .busgo-sidebar-title {
      padding: 10px 10px 16px;
      font-weight: 800;
      font-size: 18px;
    }
    .busgo-sidebar-link {
      display: block;
      padding: 12px 13px;
      border-radius: 14px;
      color: rgba(255,255,255,.72);
      font-weight: 700;
      margin-bottom: 4px;
    }
    .busgo-sidebar-link.active,
    .busgo-sidebar-link:hover {
      color: white;
      background: rgba(20,184,166,.18);
    }
    .busgo-page-head {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: flex-end;
      margin-bottom: 22px;
    }
    .busgo-page-head h1 {
      margin: 0;
      font-size: 34px;
      line-height: 1.1;
      letter-spacing: -0.04em;
    }
    .busgo-page-head p {
      margin: 8px 0 0;
      color: var(--busgo-muted);
      line-height: 1.65;
      max-width: 680px;
    }
    .busgo-grid-2 {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 20px;
      align-items: start;
    }
    .busgo-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .busgo-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .busgo-card {
      background: white;
      border: 1px solid var(--busgo-line);
      border-radius: var(--busgo-radius);
      box-shadow: 0 10px 30px rgba(15,23,42,.04);
      overflow: hidden;
    }
    .busgo-card-pad {
      padding: 20px;
    }
    .busgo-card-head {
      padding: 20px;
      border-bottom: 1px solid var(--busgo-line);
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }
    .busgo-card-head h2,
    .busgo-card-head h3 {
      margin: 0;
      font-size: 18px;
    }
    .busgo-stack {
      display: grid;
      gap: 16px;
    }
    .busgo-form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }
    .busgo-form-control {
      display: grid;
      gap: 8px;
    }
    .busgo-form-control label {
      color: var(--busgo-muted);
      font-size: 12px;
      font-weight: 800;
    }
    .busgo-control,
    .busgo-form-control input,
    .busgo-form-control select,
    .busgo-form-control textarea {
      width: 100%;
      border: 1px solid var(--busgo-line);
      border-radius: 16px;
      padding: 13px 14px;
      background: #FCFCFD;
      color: var(--busgo-text);
      font: inherit;
      outline: none;
    }
    .busgo-form-control textarea {
      min-height: 92px;
      resize: vertical;
    }
    .busgo-error {
      color: var(--busgo-danger);
      font-size: 13px;
      font-weight: 700;
    }
    .busgo-inline-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }
    .busgo-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      border: 1px solid transparent;
      white-space: nowrap;
    }
    .busgo-status-badge.green { background: #DCFCE7; color: #166534; border-color: #BBF7D0; }
    .busgo-status-badge.teal { background: #CCFBF1; color: #115E59; border-color: #99F6E4; }
    .busgo-status-badge.blue { background: #DBEAFE; color: #1E40AF; border-color: #BFDBFE; }
    .busgo-status-badge.amber { background: #FEF3C7; color: #92400E; border-color: #FDE68A; }
    .busgo-status-badge.orange { background: #FFEDD5; color: #9A3412; border-color: #FED7AA; }
    .busgo-status-badge.red { background: #FEE2E2; color: #991B1B; border-color: #FECACA; }
    .busgo-status-badge.gray { background: #F1F5F9; color: #475569; border-color: #E2E8F0; }
    .busgo-status-badge.purple { background: #F3E8FF; color: #6B21A8; border-color: #E9D5FF; }
    .busgo-data-table-wrap {
      overflow: auto;
    }
    .busgo-data-table {
      width: 100%;
      min-width: 760px;
      border-collapse: collapse;
    }
    .busgo-data-table th,
    .busgo-data-table td {
      padding: 15px 16px;
      border-bottom: 1px solid var(--busgo-line);
      text-align: left;
      vertical-align: middle;
      white-space: nowrap;
    }
    .busgo-data-table th {
      color: var(--busgo-muted);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .04em;
      background: #F8FAFC;
    }
    .busgo-data-table tr:last-child td {
      border-bottom: 0;
    }
    .busgo-metric {
      background: white;
      border: 1px solid var(--busgo-line);
      border-radius: var(--busgo-radius);
      padding: 20px;
      box-shadow: 0 10px 30px rgba(15,23,42,.04);
    }
    .busgo-metric span {
      color: var(--busgo-muted);
      font-size: 13px;
      font-weight: 800;
    }
    .busgo-metric strong {
      display: block;
      margin-top: 8px;
      font-size: 30px;
      letter-spacing: -0.03em;
    }
    .busgo-metric small {
      display: block;
      margin-top: 6px;
      color: var(--busgo-muted);
    }
    .busgo-app-search {
      display: grid;
      grid-template-columns: 1fr 1fr .8fr auto;
      gap: 12px;
      align-items: end;
    }
    .busgo-ticket-card {
      padding: 18px;
      display: grid;
      grid-template-columns: 86px 1fr auto;
      gap: 16px;
      align-items: center;
      border-bottom: 1px solid var(--busgo-line);
    }
    .busgo-ticket-card:last-child { border-bottom: 0; }
    .busgo-ticket-card h3 {
      margin: 0 0 6px;
      font-size: 18px;
    }
    .busgo-ticket-card p {
      margin: 0;
      color: var(--busgo-muted);
      line-height: 1.6;
      font-size: 14px;
    }
    .busgo-qr-box {
      width: 78px;
      height: 78px;
      border-radius: 16px;
      border: 8px solid white;
      background:
        linear-gradient(90deg, #0F172A 8px, transparent 8px) 0 0 / 18px 18px,
        linear-gradient(#0F172A 8px, transparent 8px) 0 0 / 18px 18px,
        #F8FAFC;
      box-shadow: 0 8px 22px rgba(15,23,42,.1);
    }
    .busgo-qr-large {
      width: 180px;
      height: 180px;
      border-radius: 24px;
      border: 14px solid white;
      background:
        linear-gradient(90deg, #0F172A 12px, transparent 12px) 0 0 / 26px 26px,
        linear-gradient(#0F172A 12px, transparent 12px) 0 0 / 26px 26px,
        #F8FAFC;
      box-shadow: var(--busgo-shadow);
    }
    .busgo-schema-seat-map {
      display: grid;
      grid-template-columns: repeat(4, minmax(52px, 1fr));
      gap: 10px;
    }
    .busgo-schema-seat {
      min-height: 46px;
      border-radius: 14px;
      border: 1px solid #CBD5E1;
      background: white;
      display: grid;
      place-items: center;
      font-weight: 800;
      cursor: pointer;
      color: var(--busgo-text);
    }
    .busgo-schema-seat.available.vip,
    .busgo-schema-seat.available.sleeper {
      border-color: var(--busgo-accent);
      color: var(--busgo-accent);
    }
    .busgo-schema-seat.selected {
      background: var(--busgo-primary);
      border-color: var(--busgo-primary);
      color: white;
    }
    .busgo-schema-seat.locked {
      background: #FEF3C7;
      color: #92400E;
      cursor: not-allowed;
    }
    .busgo-schema-seat.booked {
      background: #E2E8F0;
      color: #94A3B8;
      text-decoration: line-through;
      cursor: not-allowed;
    }
    .busgo-tabs-line {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .busgo-tab-btn {
      border: 1px solid var(--busgo-line);
      background: white;
      border-radius: 999px;
      padding: 10px 14px;
      font-weight: 800;
      color: var(--busgo-muted);
      cursor: pointer;
    }
    .busgo-tab-btn.active {
      background: #E6FFFB;
      border-color: #99F6E4;
      color: var(--busgo-primary);
    }
    .busgo-timeline-list {
      display: grid;
      gap: 14px;
    }
    .busgo-timeline-item {
      display: grid;
      grid-template-columns: 14px 1fr;
      gap: 12px;
      align-items: start;
    }
    .busgo-timeline-dot {
      width: 14px;
      height: 14px;
      margin-top: 4px;
      border-radius: 999px;
      background: var(--busgo-primary);
      box-shadow: 0 0 0 5px #CCFBF1;
    }
    .busgo-muted {
      color: var(--busgo-muted);
    }
    .busgo-empty {
      text-align: center;
      padding: 42px 20px;
      color: var(--busgo-muted);
    }
    .busgo-dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15,23,42,.45);
      display: grid;
      place-items: center;
      z-index: 100;
      padding: 20px;
    }
    .busgo-dialog {
      width: min(420px, 100%);
      background: white;
      border-radius: 24px;
      padding: 22px;
      box-shadow: var(--busgo-shadow);
    }
    .busgo-dialog h3 {
      margin: 0 0 8px;
    }
    .busgo-dialog p {
      margin: 0 0 18px;
      color: var(--busgo-muted);
      line-height: 1.6;
    }

    @media (max-width: 1040px) {
      .busgo-layout,
      .busgo-grid-2,
      .busgo-auth-layout {
        grid-template-columns: 1fr;
      }
      .busgo-sidebar {
        position: static;
      }
      .busgo-grid-4 {
        grid-template-columns: repeat(2, 1fr);
      }
      .busgo-app-search {
        grid-template-columns: repeat(2, 1fr);
      }
      .busgo-app-search .busgo-btn {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 720px) {
      .busgo-app-main {
        padding-top: 22px;
      }
      .busgo-page-head {
        display: grid;
        align-items: start;
      }
      .busgo-page-head h1 {
        font-size: 28px;
      }
      .busgo-form-row,
      .busgo-grid-3,
      .busgo-grid-4,
      .busgo-app-search {
        grid-template-columns: 1fr;
      }
      .busgo-ticket-card {
        grid-template-columns: 76px 1fr;
      }
      .busgo-ticket-card .busgo-inline-actions {
        grid-column: 1 / -1;
      }
      .busgo-auth-hero {
        padding: 28px 20px;
      }
      .busgo-auth-hero h1 {
        margin-top: 28px;
        font-size: 38px;
      }
      .busgo-auth-card {
        padding: 22px;
      }
    }
  `}</style>
);

export default BusGoAppStyles;
