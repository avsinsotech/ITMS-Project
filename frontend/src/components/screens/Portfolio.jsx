import { Search } from 'lucide-react';

export default function Portfolio({ onNavigate, onOpenModal }) {
  return (
    <div>
      <div className="search-bar">
        <div className="search-input-wrap">
          <Search className="search-icon" size={14} />
          <input type="text" placeholder="Search by Instrument, ISIN, Issuer, Category..." />
        </div>
        <select className="form-select" style={{ width: '130px' }}>
          <option>All Types</option><option>G-Sec</option><option>SDL</option><option>T-Bill</option>
          <option>FD</option><option>Bond</option><option>Mutual Fund</option><option>Call Money</option>
          <option>CP</option><option>CD</option>
        </select>
        <select className="form-select" style={{ width: '120px' }}>
          <option>All Classes</option><option>HTM</option><option>AFS</option><option>HFT</option>
        </select>
        <select className="form-select" style={{ width: '120px' }}>
          <option>All SLR</option><option>SLR</option><option>Non-SLR</option>
        </select>
        <button className="btn-sm gold">Export Excel</button>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th><th>Instrument</th><th>Issuer</th><th>Type</th><th>Class</th>
                <th>SLR</th><th>Amount (₹)</th><th>Rate/YTM</th><th>Maturity</th>
                <th>Days Left</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV-001</td><td><b>7.26% GS 2033</b></td><td>RBI / Govt</td>
                <td><span className="badge slr">G-Sec</span></td><td><span className="badge htm">HTM</span></td>
                <td><span className="badge slr">SLR</span></td><td>₹98,75,000</td><td>7.26%</td>
                <td>26-Oct-2033</td><td>2752</td><td><span className="badge active">Active</span></td>
                <td><button className="btn-sm outline">View</button></td>
              </tr>
              <tr>
                <td>INV-003</td><td><b>MH SDL 7.55% 2028</b></td><td>Maharashtra Govt</td>
                <td><span className="badge slr">SDL</span></td><td><span className="badge htm">HTM</span></td>
                <td><span className="badge slr">SLR</span></td><td>₹49,80,000</td><td>7.55%</td>
                <td>12-Aug-2028</td><td>849</td><td><span className="badge active">Active</span></td>
                <td><button className="btn-sm outline">View</button></td>
              </tr>
              <tr>
                <td>INV-004</td><td><b>91-Day T-Bill</b></td><td>RBI</td>
                <td><span className="badge slr">T-Bill</span></td><td><span className="badge hft">HFT</span></td>
                <td><span className="badge slr">SLR</span></td><td>₹1,98,20,000</td><td>6.80%</td>
                <td>23-Apr-2026</td><td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>8</span></td>
                <td><span className="badge alert">Due Soon</span></td>
                <td><button className="btn-sm gold">Mature</button></td>
              </tr>
              <tr>
                <td>INV-005</td><td><b>SBI FD #2024001</b></td><td>SBI Mumbai</td>
                <td><span className="badge cd">FD-SCB</span></td><td><span className="badge afs">AFS</span></td>
                <td><span className="badge non-slr">Non-SLR</span></td><td>₹1,50,00,000</td><td>7.00%</td>
                <td>18-Apr-2026</td><td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>3</span></td>
                <td><span className="badge alert">Urgent</span></td>
                <td><button className="btn-sm gold" onClick={() => onNavigate('renewal')}>Renew</button></td>
              </tr>
              <tr>
                <td>MF-001</td><td><b>HDFC Liquid Fund</b></td><td>HDFC AMC</td>
                <td><span className="badge mf">Mutual Fund</span></td><td><span className="badge afs">AFS</span></td>
                <td><span className="badge non-slr">Non-SLR</span></td><td>₹3,30,98,000</td><td>7.45%</td>
                <td>Open-ended</td><td>On demand</td><td><span className="badge active">Active</span></td>
                <td><button className="btn-sm gold" onClick={() => onNavigate('mutual_fund')}>Redeem</button></td>
              </tr>
              <tr>
                <td>CM-2604-001</td><td><b>Call Money – SBI</b></td><td>SBI Mumbai</td>
                <td><span className="badge cm">Call Money</span></td><td><span className="badge hft">HFT</span></td>
                <td><span className="badge non-slr">Non-SLR</span></td><td>₹1,00,00,000</td><td>6.60%</td>
                <td>16-Apr-2026</td><td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>1</span></td>
                <td><span className="badge alert">O/N Due</span></td>
                <td><button className="btn-sm gold" onClick={() => onOpenModal('cmRoll')}>Roll</button></td>
              </tr>
              <tr>
                <td>CP-2601-001</td><td><b>HDFC Ltd. CP</b></td><td>HDFC Ltd.</td>
                <td><span className="badge cp">CP</span></td><td><span className="badge afs">AFS</span></td>
                <td><span className="badge non-slr">Non-SLR</span></td><td>₹97,88,000</td><td>7.85%</td>
                <td>20-Apr-2026</td><td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>5</span></td>
                <td><span className="badge alert">Due Soon</span></td>
                <td><button className="btn-sm gold" onClick={() => onNavigate('cp_cd')}>Mature</button></td>
              </tr>
              <tr>
                <td>CD-2601-001</td><td><b>Axis Bank CD</b></td><td>Axis Bank</td>
                <td><span className="badge cd">CD</span></td><td><span className="badge afs">AFS</span></td>
                <td><span className="badge non-slr">Non-SLR</span></td><td>₹96,50,000</td><td>7.25%</td>
                <td>30-Jun-2026</td><td>76</td><td><span className="badge active">Active</span></td>
                <td><button className="btn-sm outline">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
