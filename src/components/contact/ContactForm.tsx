import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        product: '',
        quantity: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to submit enquiry. Please try again or contact us directly.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-neutral-50 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-50 focus:border-primary focus:outline-none transition-colors"
          placeholder="Enter your full name"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-900 dark:text-neutral-50 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-50 focus:border-primary focus:outline-none transition-colors"
          placeholder="Your company name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-neutral-50 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-50 focus:border-primary focus:outline-none transition-colors"
          placeholder="your.email@company.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-neutral-50 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-50 focus:border-primary focus:outline-none transition-colors"
          placeholder="+91-XXXXX-XXXXX"
        />
      </div>

      {/* Product Required */}
      <div>
        <label htmlFor="product" className="block text-sm font-semibold text-gray-900 dark:text-neutral-50 mb-2">
          Product Required
        </label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-50 focus:border-primary focus:outline-none transition-colors"
          placeholder="e.g., Copper Bonded Earthing Rod"
        />
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-semibold text-gray-900 dark:text-neutral-50 mb-2">
          Estimated Quantity
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-50 focus:border-primary focus:outline-none transition-colors"
          placeholder="e.g., 500 pieces"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-neutral-50 mb-2">
          Message / Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-50 focus:border-primary focus:outline-none transition-colors resize-none"
          placeholder="Please provide details about your project requirements, delivery timeline, etc."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-xl">
          <p className="text-green-800 dark:text-green-200 font-semibold">
            ✓ Thank you! Your enquiry has been submitted successfully. We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-xl">
          <p className="text-red-800 dark:text-red-200 font-semibold">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
      </button>
    </form>
  );
}
