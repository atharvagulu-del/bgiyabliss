import React from 'react';

export default async function InformationalPage({ params }) {
  const { slug } = await params;
  
  return (
    <div className="container section">
      <h1 className="section-title" style={{ textTransform: 'capitalize' }}>
        {slug.replace('-', ' ')}
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--color-gray-600)' }}>
        This is a dynamically generated informational page for "{slug}". This template is used for Track Order, Rewards Club, Returns, etc.
      </p>
    </div>
  );
}
