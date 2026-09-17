import React from 'react';

const Legal = ({ type }) => {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white">{title}</h1>
          <p className="mt-4 text-slate-400">Nepalese American Chamber of Commerce</p>
        </div>
      </section>
      <article className="container mx-auto max-w-4xl px-6 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-12 prose prose-slate max-w-none">
          {isPrivacy ? (
            <>
              <p>NACOC respects your privacy. This policy explains how information is handled when you visit our website, contact us, register for an event, or apply for membership.</p>
              <h2>Information we collect</h2>
              <p>We may collect information you choose to provide, such as your name, organization, email address, phone number, and message. We may also receive basic technical information needed to operate and secure the website.</p>
              <h2>How we use information</h2>
              <p>We use submitted information to respond to inquiries, administer membership and events, provide requested resources, and improve our services. We do not sell personal information.</p>
              <h2>Contact</h2>
              <p>Questions about this policy may be sent to <a href="mailto:secretary@nacoc.org">secretary@nacoc.org</a>.</p>
            </>
          ) : (
            <>
              <p>By using this website, you agree to use it lawfully and respectfully. Website content is provided for general informational purposes and may be updated without notice.</p>
              <h2>Website content</h2>
              <p>NACOC works to keep information accurate and current, but does not guarantee that every item is complete, current, or free from errors. External links are provided for convenience and are operated by third parties.</p>
              <h2>Events and resources</h2>
              <p>Event details, availability, and schedules may change. Participation may be subject to additional registration terms provided for the relevant event or program.</p>
              <h2>Contact</h2>
              <p>Questions about these terms may be sent to <a href="mailto:secretary@nacoc.org">secretary@nacoc.org</a>.</p>
            </>
          )}
        </div>
      </article>
    </div>
  );
};

export default Legal;
