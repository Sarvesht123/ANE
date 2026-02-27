export function StoreConfigCard({ config }) {
  const entries = [
    ['Store name', config.store_name],
    ['Base URL', config.base_url],
    ['Secure URL', config.secure_base_url],
    ['Locale', config.locale],
    ['Default currency', config.default_currency],
  ];

  return (
    <section className="card">
      <h2>Magento Store Configuration</h2>
      <dl>
        {entries.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value || 'Not configured'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
