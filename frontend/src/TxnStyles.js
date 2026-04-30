export const TXN_STYLES = `
  /* ─── Reset & Root ─── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .txn-root {
    font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
    background: #F5F6FA;
    min-height: 100vh;
    color: #1a1a2e;
    font-size: 13px;
    line-height: 1.45;
  }

  /* ─── Header ─── */
  .txn-header {
    background: #fff;
    border-bottom: 1px solid #D8DDE5;
    padding: 13px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .txn-title {
    font-size: 18px;
    font-weight: 700;
    color: #1F3864;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
  }
  .txn-chip {
    background: #C8A000;
    color: #1F3864;
    font-size: 10.5px;
    padding: 2px 8px;
    border-radius: 3px;
    font-weight: 700;
    letter-spacing: .4px;
  }
  .txn-breadcrumb { font-size: 11px; color: #6b7385; margin-top: 3px; }
  .txn-header-btns { display: flex; gap: 8px; }

  /* ─── Body ─── */
  .txn-body { padding: 18px 24px 32px; }

  /* ─── Stepper ─── */
  .stepper {
    display: flex;
    margin-bottom: 14px;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #D8DDE5;
  }
  .step {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    background: #fff;
    font-size: 11px;
    border-right: 1px solid #D8DDE5;
    color: #6b7385;
  }
  .step:last-child { border-right: none; }
  .step .sn {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #D8DDE5;
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 10px;
    flex-shrink: 0;
  }
  .step.done { background: #EAF0F9; color: #1F3864; }
  .step.done .sn { background: #1B873F; }
  .step.current { background: #FFF5D6; color: #1F3864; font-weight: 600; }
  .step.current .sn { background: #C8A000; color: #1F3864; }

  /* ─── Callout ─── */
  .callout {
    background: #EAF0F9;
    border-left: 3px solid #1F3864;
    padding: 10px 12px;
    border-radius: 4px;
    font-size: 11.5px;
    color: #1F3864;
    margin-bottom: 12px;
  }
  .callout.warn { background: #FFF8E7; border-left-color: #E08E0B; color: #6B4D00; }
  .callout.ok   { background: #E7F5EC; border-left-color: #1B873F; color: #125C2A; }
  .callout.danger { background: #FDECEC; border-left-color: #C62828; color: #C62828; }
  .callout b { font-weight: 700; }

  /* ─── Card ─── */
  .card {
    background: #fff;
    border: 1px solid #D8DDE5;
    border-radius: 6px;
    padding: 14px 16px;
    margin-bottom: 14px;
    box-shadow: 0 1px 2px rgba(0,0,0,.03);
  }
  .card-title {
    font-size: 13px;
    font-weight: 700;
    color: #1F3864;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #D8DDE5;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-title::before {
    content: '';
    width: 4px; height: 14px;
    background: #C8A000;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* ─── Gold card variant ─── */
  .card-gold {
    background: #FFF5D6;
    border: 1px solid #C8A000;
    border-radius: 6px;
    padding: 14px 16px;
    margin-bottom: 14px;
  }

  /* ─── Section label (sub-heading inside card) ─── */
  .section-label {
    font-size: 11.5px;
    font-weight: 700;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px dashed #D8DDE5;
  }
  .section-label.red  { color: #C62828; }
  .section-label.green { color: #1B873F; }

  /* ─── Form grid ─── */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
  .g2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* ─── Field ─── */
  .field { margin-bottom: 10px; }
  .field label {
    display: block;
    font-size: 11px;
    color: #1F3864;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .field label .req { color: #C62828; margin-left: 1px; }
  .field .hint { font-size: 10px; color: #6b7385; margin-top: 2px; }
  .field input,
  .field select,
  .field textarea {
    width: 100%;
    padding: 7px 9px;
    border: 1px solid #D8DDE5;
    border-radius: 4px;
    font-size: 12px;
    background: #fff;
    color: #1a1a2e;
    font-family: inherit;
    outline: none;
    transition: border-color .15s;
  }
  .field input:focus,
  .field select:focus { border-color: #1F3864; box-shadow: 0 0 0 2px rgba(31,56,100,.1); }
  .readonly { background: #f8f9fb !important; color: #555 !important; }

  /* ─── Action bar ─── */
  .actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed #D8DDE5;
  }
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: .3px;
    transition: .15s;
  }
  .btn-primary { background: #1F3864; color: #fff; }
  .btn-primary:hover { background: #2a4a80; }
  .btn-gold { background: #C8A000; color: #1F3864; }
  .btn-gold:hover { filter: brightness(1.07); }
  .btn-ghost { background: #fff; border: 1px solid #1F3864; color: #1F3864; }
  .btn-ghost:hover { background: #EAF0F9; }

  /* ─── Table ─── */
  .txn-table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
  .txn-table thead th {
    background: #1F3864;
    color: #fff;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: .3px;
  }
  .txn-table thead th.num { text-align: right; }
  .txn-table tbody td { padding: 7px 10px; border-bottom: 1px solid #D8DDE5; }
  .txn-table tbody td.num { text-align: right; font-variant-numeric: tabular-nums; }
  .txn-table tbody tr:last-child td { border-bottom: none; }
  .txn-table tbody tr:hover { background: #fafbfd; }
  .txn-table tbody tr:nth-child(even) { background: #fcfcfd; }
  .tfoot-row { font-weight: 700; background: #EAF0F9 !important; }
  .tfoot-row td { border-bottom: none; }

  /* ─── Badges ─── */
  .badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .3px;
  }
  .b-approved  { background: #E7F5EC; color: #1B873F; }
  .b-pending   { background: #FFF3D6; color: #E08E0B; }
  .b-rejected  { background: #FDECEC; color: #C62828; }
  .b-info      { background: #EAF0F9; color: #1F3864; }
  .b-liquid    { background: #E7F5EC; color: #1B873F; }
  .b-debt      { background: #EAF0F9; color: #1F3864; }
  .b-overnight { background: #E8F4FD; color: #0B5B98; }
  .b-near-cap  { background: #FFF3D6; color: #E08E0B; }

  /* ─── Toast ─── */
  .toast {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 12px;
    margin-bottom: 14px;
  }
  .toast.ok     { background: #E7F5EC; border-left: 3px solid #1B873F; color: #125C2A; }
  .toast.warn   { background: #FFF8E7; border-left: 3px solid #E08E0B; color: #6B4D00; }

  /* ─── Summary row (inside gold card) ─── */
  .summary-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
  .summary-item { }
  .summary-item .s-label { font-size: 10.5px; font-weight: 600; color: #6b7385; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .4px; }
  .summary-item .s-value { font-size: 15px; font-weight: 700; color: #1F3864; }
  .summary-item .s-value.green { color: #1B873F; }
  .summary-item .s-value.amber { color: #E08E0B; }

  /* ─── Active SIP table status ─── */
  .col-green { color: #1B873F; font-weight: 700; }
  .col-amber { color: #E08E0B; font-weight: 700; }
  .col-navy  { color: #1F3864; font-weight: 600; }

  /* ─── MC banner ─── */
  .mc-banner {
    background: linear-gradient(90deg, #FFF5D6 0%, #fff 100%);
    border: 1px dashed #C8A000;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    color: #1F3864;
  }

  /* ─── Footer ─── */
  .txn-footer {
    text-align: center;
    font-size: 11px;
    color: #6b7385;
    padding: 18px 24px 14px;
    border-top: 1px solid #D8DDE5;
    background: #fff;
    margin-top: 4px;
  }

  @media (max-width: 960px) {
    .g3 { grid-template-columns: 1fr 1fr; }
    .g4, .summary-grid { grid-template-columns: 1fr 1fr; }
    .g2-col { grid-template-columns: 1fr; }
    .stepper { flex-wrap: wrap; }
  }
  @media (max-width: 600px) {
    .g2, .g3 { grid-template-columns: 1fr; }
  }
    /* ─── MF Portfolio Module – Additional Styles ─── */

/* KPI cards with purple variant */
.kpi {
  background: #fff;
  border: 1px solid #D8DDE5;
  border-left: 4px solid #C8A000;
  border-radius: 5px;
  padding: 12px 14px;
}
.kpi.alt   { border-left-color: #1F3864; }
.kpi.green { border-left-color: #1B873F; }
.kpi.red   { border-left-color: #C62828; }
.kpi.purple { border-left-color: #6A1B9A; }
.kpi .s-label {
  font-size: 10.5px;
  color: #6b7385;
  text-transform: uppercase;
  letter-spacing: .5px;
  font-weight: 600;
}
.kpi .s-value {
  font-size: 19px;
  font-weight: 700;
  color: #1F3864;
  margin-top: 4px;
}
.kpi .s-sub { font-size: 11px; color: #6b7385; margin-top: 2px; }

/* IDCW badges */
.b-idcw    { background: #E0F7FA; color: #00695C; }
.b-growth  { background: #F3E5F5; color: #6A1B9A; }

/* Folio filters row */
.mf-folio-filters {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 14px;
}
.mf-folio-filters input {
  flex: 1;
  padding: 7px 10px;
  border: 1px solid #D8DDE5;
  border-radius: 4px;
  font-size: 12px;
}
.mf-folio-filters select {
  padding: 7px 10px;
  border: 1px solid #D8DDE5;
  border-radius: 4px;
  font-size: 12px;
  background: #fff;
}

/* Category allocation bar */
.cat-bar {
  display: flex;
  height: 18px;
  border-radius: 4px;
  overflow: hidden;
  margin: 12px 0 6px;
}
.cat-bar-seg {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  transition: flex .3s;
}

/* AMC block grouping for By-AMC view */
.amc-block { margin-bottom: 12px; }
.amc-block-header {
  background: #EAF0F9;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #1F3864;
  border-radius: 4px 4px 0 0;
  border: 1px solid #D8DDE5;
}

/* NAV Upload stepper */
.nav-stepper {
  display: flex;
  margin-bottom: 14px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #D8DDE5;
}
.nav-step {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  background: #fff;
  font-size: 11px;
  border-right: 1px solid #D8DDE5;
  color: #6b7385;
}
.nav-step:last-child { border-right: none; }
.nav-step .sn {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #D8DDE5;
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 10px;
  flex-shrink: 0;
}
.nav-step.done { background: #EAF0F9; color: #1F3864; }
.nav-step.done .sn { background: #1B873F; }
.nav-step.current { background: #FFF5D6; color: #1F3864; font-weight: 600; }
.nav-step.current .sn { background: #C8A000; color: #1F3864; }

/* Portfolio grid layouts */
.folio-kpi-row,
.holdings-kpi,
.idcw-kpi-row,
.nav-stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 14px;
}
.holdings-kpi { grid-template-columns: repeat(5, 1fr); }

/* IDCW record form 3-col grid */
.idcw-record-form .g3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

/* Tabs */
.tabs { display: flex; gap: 4px; border-bottom: 2px solid #D8DDE5; margin-bottom: 14px; }
.tab  { padding: 8px 14px; cursor: pointer; font-size: 12px; font-weight: 600; color: #6b7385; border-bottom: 2px solid transparent; margin-bottom: -2px; }
.tab.active { color: #1F3864; border-bottom-color: #C8A000; }

@media (max-width: 960px) {
  .folio-kpi-row,
  .idcw-kpi-row,
  .nav-stat-row { grid-template-columns: 1fr 1fr; }
  .holdings-kpi { grid-template-columns: 1fr 1fr; }
  .idcw-record-form .g3 { grid-template-columns: 1fr 1fr; }
  .nav-stepper { flex-wrap: wrap; }
}
@media (max-width: 600px) {
  .folio-kpi-row,
  .idcw-kpi-row,
  .nav-stat-row,
  .holdings-kpi,
  .idcw-record-form .g3 { grid-template-columns: 1fr; }
}
`;