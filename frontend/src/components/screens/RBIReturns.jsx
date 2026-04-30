import React from 'react';
import { Landmark } from 'lucide-react';

export default function RBIReturns() {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Landmark size={16} /> RBI Return Submission Status
          </span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr><th>Return</th><th>Frequency</th><th>Period</th><th>Due Date</th><th>Status</th><th>Submitted On</th><th>Action</th></tr></thead>
            <tbody>
              <tr>
                <td><b>Form VIII – SLR</b></td><td>Weekly</td><td>Week ending 11-Apr-2026</td><td>14-Apr-2026</td>
                <td><span className="badge active">Submitted</span></td><td>14-Apr-2026</td>
                <td><button className="btn-sm outline">View</button></td>
              </tr>
              <tr>
                <td><b>Form VIII – SLR</b></td><td>Weekly</td><td>Week ending 18-Apr-2026</td><td>21-Apr-2026</td>
                <td><span className="badge pending">Pending</span></td><td>—</td>
                <td><button className="btn-sm gold">Prepare</button></td>
              </tr>
              <tr>
                <td><b>NDS-CALL Report</b></td><td>Daily</td><td>15-Apr-2026</td><td>15-Apr-2026</td>
                <td><span className="badge pending">Pending</span></td><td>—</td>
                <td><button className="btn-sm gold">Auto-Submit</button></td>
              </tr>
              <tr>
                <td><b>NBS-8</b></td><td>Quarterly</td><td>Q4 FY2025-26</td><td>30-Apr-2026</td>
                <td><span className="badge pending">Pending</span></td><td>—</td>
                <td><button className="btn-sm primary">Prepare</button></td>
              </tr>
              <tr>
                <td><b>Annual Inv. Policy</b></td><td>Annual</td><td>FY2026-27</td><td>30-Apr-2026</td>
                <td><span className="badge active">Submitted</span></td><td>15-Mar-2026</td>
                <td><button className="btn-sm outline">View</button></td>
              </tr>
              <tr>
                <td><b>CRAR (Inv. Impact)</b></td><td>Half-Yearly</td><td>Sep 2025</td><td>31-Oct-2025</td>
                <td><span className="badge active">Submitted</span></td><td>28-Oct-2025</td>
                <td><button className="btn-sm outline">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
