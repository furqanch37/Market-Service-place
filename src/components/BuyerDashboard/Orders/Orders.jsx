'use client';
import { useRouter } from 'next/navigation';
import './Orders.css';

export default function ManageOrders() {
  const router = useRouter();

  const requests = [
    {
      id: 1,
      title: 'Photo shoot for national campaign',
      company: 'Acme Company',
      time: '10 minutes ago',
      status: 'Pending',
      budget: '$10,000.00',
    },
    {
      id: 2,
      title: 'Brand refresh of marketing campaign',
      company: 'Acme Company',
      time: '10 minutes ago',
      status: 'Pending',
      budget: '$27,500.00',
    },
    {
      id: 3,
      title: 'Subscription billing engine',
      company: 'Acme Company',
      time: '10 minutes ago',
      status: 'Pending',
      budget: '$5,000.00',
    },
    {
      id: 4,
      title: 'Salesforce integration implementation',
      company: 'Acme Company',
      time: '11 minutes ago',
      status: 'Pending',
      budget: '$34,000.00',
    },
    {
      id: 5,
      title: 'Product launch marketing campaign PEARL',
      company: 'Acme Company',
      time: '12 minutes ago',
      status: 'Pending',
      budget: '$10,000.00',
    },
  ];

  return (
    <div className="approvals-container">
      <div className="approvals-header">
        <h2>Orders</h2>
      </div>

      <div className="filters">
        <input type="text" placeholder="Search by request title" />
        <select>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <select>
          <option>Requested...</option>
        </select>
        <select>
          <option>All Teams</option>
        </select>
        <button className="clear-btn">Clear all filters</button>
      </div>

      <div className="request-table">
        <div className="table-header">
          <div className="col-request">Request</div>
          <div className="col-status">Status</div>
          <div className="col-time">Request Sent</div>
          <div className="col-budget">Budget</div>
          <div className="col-action"></div>
        </div>

        {requests.map((req) => (
          <div
            key={req.id}
            className="table-row"
            onClick={() => router.push('/buyer/order-details')}
          >
            <div className="col-request">
              <div className="request-title">{req.title}</div>
              <div className="company-name">{req.company}</div>
            </div>
            <div className="col-status">
              <span className="status-badge">{req.status}</span>
            </div>
            <div className="col-time">{req.time}</div>
            <div className="col-budget">{req.budget}</div>
            <div className="col-action">
              <button className="view-btn" onClick={e => e.stopPropagation()}>
                View Request
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <span>&laquo;</span>
        <span className="active-page">1</span>
        <span>2</span>
        <span>3</span>
        <span>&raquo;</span>
      </div>
    </div>
  );
}
