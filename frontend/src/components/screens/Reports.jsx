import React from 'react';
import { ClipboardList, Landmark } from 'lucide-react';

export default function Reports() {
  const standardReports = [
    { title: 'Complete Investment Portfolio Statement', sub: 'All instruments — G-Sec, FD, MF, Call, CP, CD' },
    { title: 'SLR / CRR Position Report', sub: 'Daily/Weekly compliance position' },
    { title: 'Interest & Income Statement', sub: 'Accrued, received across all instruments' },
    { title: 'Maturity Ladder Report', sub: '30/60/90/180 days — all types' },
    { title: 'MTM Valuation Report (FIMMDA/NAV)', sub: 'AFS/HFT/MF — provision working' },
    { title: 'Call Money Deal Register', sub: 'All O/N, notice, term placements' },
    { title: 'CP / CD Investment Register', sub: 'Active + matured CPs with ratings' },
    { title: 'Mutual Fund Statement (AMFI Format)', sub: 'Units, NAV, P&L — all schemes' },
    { title: 'Board Investment Report (Monthly)', sub: 'Executive summary for Board of Directors' },
    { title: 'Investment Limit Utilization Report', sub: 'Board limits vs actuals — all categories' },
  ];

  const rbiReturns = [
    { title: 'Form VIII — SLR Weekly Return', sub: 'Due every Friday | Auto-populated', actions: ['Preview', 'Submit'] },
    { title: 'NBS-8 Quarterly Return', sub: 'UCB Investment Return — NABARD format', actions: ['Preview', 'Submit'] },
    { title: 'Call Money NDS-CALL Report', sub: 'Daily deal reporting to RBI NDS platform', actions: ['Auto-Report'] },
    { title: 'CRAR — Investment Impact', sub: 'Capital risk assessment, investment weighting', actions: ['Generate'] },
    { title: 'Annual Investment Policy Submission', sub: 'Board approval record to RBI', actions: ['Upload'] },
    { title: 'CP Investment Register (FIMMDA)', sub: 'CP/CD investments & rating report', actions: ['Generate'] },
  ];

  return (
    <div>
      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={16} /> Standard Reports
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {standardReports.map((report, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: 'var(--gray-50)', borderRadius: '7px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--navy)' }}>{report.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{report.sub}</div>
                  </div>
                  <button className="btn-sm gold">PDF</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Landmark size={16} /> RBI Regulatory Returns
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {rbiReturns.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', border: '1.5px solid var(--border)', borderRadius: '7px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--navy)' }}>{item.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{item.sub}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {item.actions.map((action, j) => (
                      <button key={j} className={`btn-sm ${j === item.actions.length - 1 ? 'gold' : 'primary'}`}>{action}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
