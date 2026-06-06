import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { api } from '../services/api';

// WordPress Contact Form 7 form ID for the Membership Application form.
// Configure the form in the WP admin (Contact > Forms) and expose its
// numeric ID at build time via VITE_WP_MEMBERSHIP_FORM_ID.
const MEMBERSHIP_FORM_ID = import.meta.env.VITE_WP_MEMBERSHIP_FORM_ID;

const CATEGORIES = [
  'Technology & Software', 'Healthcare & Wellness', 'Real Estate & Construction',
  'Finance & Insurance', 'Retail & E-commerce', 'Education & Training',
  'Marketing & Advertising', 'Legal Services', 'Non-Profit & Community',
  'Food & Beverage', 'Consulting', 'Manufacturing', 'Other',
];

const CATEGORY_SUBCATEGORIES = {
  'Technology & Software': ['Software Development', 'IT Services', 'Digital Marketing', 'Start-up', 'Other'],
  'Healthcare & Wellness': ['Medical Practice', 'Fitness Center', 'Other'],
  'Real Estate & Construction': ['Residential', 'Commercial', 'Other'],
  'Finance & Insurance': ['Banking', 'Investment', 'Other'],
  'Retail & E-commerce': ['Clothing', 'Electronics', 'Other'],
  'Education & Training': ['School', 'University', 'Other'],
  'Marketing & Advertising': ['Digital Marketing', 'PR', 'Agency', 'Other'],
  'Legal Services': ['Law Firm', 'Notary', 'Other'],
  'Non-Profit & Community': ['Charity', 'Foundation', 'Other'],
  'Food & Beverage': ['Restaurant', 'Cafe', 'Other'],
  Consulting: ['Management Consulting', 'Freelance', 'Other'],
  Manufacturing: ['Textiles', 'Machinery', 'Other'],
  Other: ['Other'],
};

const SOCIAL_PLATFORMS = [
  'LinkedIn', 'Facebook', 'Instagram', 'Twitter / X', 'YouTube', 'TikTok', 'Pinterest', 'Other',
];

const MembershipCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const plan = location.state?.plan || {
    name: 'Life Member',
    price: 'Contact Us',
    description: 'Membership application',
  };

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    businessAddress: '',
    city: '',
    state: '',
    zip: '',
    category: '',
    subCategory: '',
    primaryContact: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    socialLinks: [{ platform: 'LinkedIn', url: '' }],
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSocialChange = (index, key, value) => {
    setFormData((prev) => {
      const next = [...prev.socialLinks];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, socialLinks: next };
    });
  };

  const handleAddSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: 'LinkedIn', url: '' }],
    }));
  };

  const handleRemoveSocial = (index) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Required';
    if (!formData.businessName.trim()) errs.businessName = 'Required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email required';
    }
    if (!formData.phone.trim() || !/^[0-9+()\-\s]{7,}$/.test(formData.phone)) {
      errs.phone = 'Valid phone required';
    }
    if (!formData.businessAddress.trim()) errs.businessAddress = 'Required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setLoading(true);

    // Field names below MUST match the field names defined in the
    // Contact Form 7 "Membership Application" form on the WP backend.
    const socialLinksText = formData.socialLinks
      .filter((s) => s.url.trim())
      .map((s) => `${s.platform}: ${s.url}`)
      .join('\n');

    const result = await api.submitForm(MEMBERSHIP_FORM_ID, {
      'membership-tier': plan.name,
      'membership-price': plan.price,
      'your-name': formData.fullName,
      'business-name': formData.businessName,
      'category': formData.category,
      'sub-category': formData.subCategory,
      'description': formData.description,
      'primary-contact': formData.primaryContact,
      'your-email': formData.email,
      'your-tel': formData.phone,
      'website': formData.website,
      'address': formData.businessAddress,
      'city': formData.city,
      'state': formData.state,
      'zip': formData.zip,
      'social-links': socialLinksText,
    });

    setLoading(false);

    if (result.status === 'mail_sent') {
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitError(result.message || 'Something went wrong. Please try again.');
      if (Array.isArray(result.invalid_fields) && result.invalid_fields.length > 0) {
        const wpErrs = {};
        result.invalid_fields.forEach((f) => {
          wpErrs[f.field || f.into] = f.message;
        });
        setFieldErrors((prev) => ({ ...prev, ...wpErrs }));
      }
    }
  };

  if (success) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-3">
              Application Received
            </h1>
            <p className="text-slate-600 mb-8">
              Thank you for applying to NACOC. Our team will review your{' '}
              <span className="font-semibold">{plan.name}</span> application and reach out
              within 2&ndash;3 business days with next steps.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
            Membership Application
          </h1>
          <p className="text-slate-500 mt-2">
            Complete the form below to apply. After we review your application, our
            membership team will follow up with the next steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 space-y-10">
            {/* 1. Business */}
            <div>
              <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 pb-2 border-b border-slate-100">
                <Briefcase className="w-4 h-4 mr-2 text-primary" /> Business Information
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-slate-50 border ${fieldErrors.businessName ? 'border-red-300' : 'border-slate-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all`}
                    placeholder="Acme Inc."
                  />
                  {fieldErrors.businessName && (
                    <span className="text-xs text-red-500 mt-1">{fieldErrors.businessName}</span>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Owner / Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 bg-slate-50 border ${fieldErrors.fullName ? 'border-red-300' : 'border-slate-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all`}
                      placeholder="John Doe"
                    />
                  </div>
                  {fieldErrors.fullName && (
                    <span className="text-xs text-red-500 mt-1">{fieldErrors.fullName}</span>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Category / Industry
                  </label>
                  <input
                    list="category-list"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                    placeholder="Select or type..."
                  />
                  <datalist id="category-list">
                    {CATEGORIES.map((c) => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Sub-category
                  </label>
                  <input
                    list="sub-list"
                    type="text"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    disabled={!formData.category}
                    className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all ${!formData.category ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={formData.category ? 'Select or type...' : 'Select Category first'}
                  />
                  <datalist id="sub-list">
                    {(CATEGORY_SUBCATEGORIES[formData.category] || []).map((s) => <option key={s} value={s} />)}
                  </datalist>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Brief Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all resize-none"
                  placeholder="Tell us about your business in a few sentences..."
                />
              </div>
            </div>

            {/* 2. Contact & Location */}
            <div>
              <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 pb-2 border-b border-slate-100">
                <MapPin className="w-4 h-4 mr-2 text-primary" /> Contact & Location
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Primary Contact
                  </label>
                  <input
                    type="text"
                    name="primaryContact"
                    value={formData.primaryContact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                    placeholder="Same as owner if blank"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 bg-slate-50 border ${fieldErrors.email ? 'border-red-300' : 'border-slate-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {fieldErrors.email && (
                    <span className="text-xs text-red-500 mt-1">{fieldErrors.email}</span>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 bg-slate-50 border ${fieldErrors.phone ? 'border-red-300' : 'border-slate-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all`}
                      placeholder="(214) 555-0137"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <span className="text-xs text-red-500 mt-1">{fieldErrors.phone}</span>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                    placeholder="https://"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-slate-50 border ${fieldErrors.businessAddress ? 'border-red-300' : 'border-slate-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all`}
                    placeholder="123 Main St"
                  />
                  {fieldErrors.businessAddress && (
                    <span className="text-xs text-red-500 mt-1">{fieldErrors.businessAddress}</span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Zip"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 3. Social */}
            <div>
              <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 pb-2 border-b border-slate-100">
                <Users className="w-4 h-4 mr-2 text-primary" /> Digital Presence
              </h4>
              <div className="space-y-3">
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <select
                      value={link.platform}
                      onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                      className="w-1/3 min-w-[120px] px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                    >
                      {SOCIAL_PLATFORMS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                      placeholder="https://"
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                    />
                    {formData.socialLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSocial(index)}
                        className="px-3 text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSocial}
                  className="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 bg-primary/5 px-3 py-2 rounded-md"
                >
                  <span>+</span> Add Another
                </button>
              </div>
            </div>

            {/* Errors / Submit */}
            {submitError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm">
                {submitError}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>Submit Application</>
                )}
              </button>
              <p className="text-xs text-slate-400 mt-3">
                By submitting, you agree to be contacted by NACOC about your application.
              </p>
            </div>
          </form>

          {/* Summary sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sticky top-24">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                Selected Plan
              </h3>
              <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50">
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  {plan.name}
                </div>
                <div className="text-3xl font-heading font-bold text-slate-900 mb-2">
                  {plan.price}
                </div>
                {plan.description && (
                  <p className="text-sm text-slate-500">{plan.description}</p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start text-sm text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Your information is sent securely to our membership team for review.</span>
                </div>
                <div className="flex items-start text-sm text-slate-600">
                  <Check className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>No payment is collected on this form. Dues will be invoiced after approval.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MembershipCheckout;
