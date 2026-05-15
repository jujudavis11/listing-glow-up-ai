import { FormEvent, useState } from 'react';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/complete';

const promptForClaude = ({ address, price, bedrooms, description }: { address: string; price: string; bedrooms: string; description: string; }) => {
  return `You are a real estate listing coach helping a busy realtor improve a listing.

Listing details:
- Address: ${address}
- Price: ${price}
- Bedrooms: ${bedrooms}
- Description: ${description}

Analyze this listing and provide:
1. Three quick optimization wins the agent can apply immediately.
2. One specific headline or copy improvement for the listing description.
3. One fast idea to improve how the listing performs on social media or email follow-up.

Write the response in short, clear bullet points so the agent can act fast.`;
};

function App() {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailCaptured, setEmailCaptured] = useState(false);

  const canAnalyze = address.trim() && price.trim() && bedrooms.trim() && description.trim();

  const handleAnalyze = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canAnalyze) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_CLAUDE_API_KEY || '',
        },
        body: JSON.stringify({
          model: 'claude-3.5',
          prompt: promptForClaude({ address, price, bedrooms, description }),
          max_tokens_to_sample: 450,
          temperature: 0.25,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Claude API request failed: ${response.status} ${body}`);
      }

      const data = await response.json();
      const text = data?.completion || data?.output || data?.completion?.[0]?.data?.text;

      if (!text) {
        throw new Error('Unexpected Claude response format.');
      }

      setResult(text.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error while analyzing listing.');
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setEmailCaptured(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-card ring-1 ring-slate-200">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Listing Glow Up AI</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Fast listing optimization for real estate agents</h1>
            <p className="mt-4 text-slate-600">Paste your listing details and get instant, actionable recommendations. Capture an email, then show your audience the value of the Pro tool.</p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Property address</span>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="123 Main St, Anytown"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Price</span>
                <input
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="$425,000"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Bedrooms</span>
                <input
                  value={bedrooms}
                  onChange={(event) => setBedrooms(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="4"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Listing description</span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="mt-2 min-h-[160px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="Beautiful home with a new kitchen, open floor plan, and large backyard..."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!canAnalyze || loading}
              className="inline-flex items-center justify-center rounded-3xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Analyzing...' : 'Get optimization wins'}
            </button>

            <p className="text-sm text-slate-500">This free tool is your lead magnet. Use it to capture one quick win and move agents toward the Pro tool.</p>
          </form>
        </div>

        {error && (
          <div className="mb-6 rounded-3xl bg-rose-50 px-6 py-5 text-rose-700 ring-1 ring-rose-100">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900">Your quick listing analysis</h2>
              <p className="mt-3 text-slate-600">Copy these optimization wins directly into your listing, social post, or agent follow-up message.</p>
              <pre className="mt-6 whitespace-pre-wrap rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-800">{result}</pre>
            </div>

            {!emailCaptured ? (
              <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-card">
                <h3 className="text-xl font-semibold">Lock in your free report</h3>
                <p className="mt-2 max-w-2xl text-slate-300">Enter your email so the agent can get a clean copy of this analysis and learn about the Pro tool that automates the whole listing glow-up.</p>
                <form onSubmit={handleCaptureEmail} className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="you@realestatepro.com"
                    className="min-w-0 flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-300 transition hover:bg-brand-400"
                  >
                    Send me the report
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-3xl bg-emerald-50 p-8 text-emerald-900 shadow-card ring-1 ring-emerald-200">
                <h3 className="text-xl font-semibold">Email captured ✅</h3>
                <p className="mt-2 text-slate-700">Nice work. Your lead is now qualified, and the agent sees value before the upsell.</p>
              </div>
            )}

            <div className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-slate-200">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Pro tool upsell</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-900">Upgrade to the full Listing Glow Up AI</h3>
                </div>
                <div className="rounded-3xl bg-slate-50 px-5 py-4 text-slate-900 ring-1 ring-slate-200">
                  <p className="text-sm">Target price:</p>
                  <p className="mt-2 text-3xl font-semibold">$127–197</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">What it does</p>
                  <p className="mt-2 text-slate-600">Automates listing optimization, suggests stronger headlines, and generates better captions for social, email, and open house follow-up.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">Why it converts</p>
                  <p className="mt-2 text-slate-600">Agents see value from the free analysis, and the Pro tool delivers a working output they can use immediately.</p>
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-brand-600 px-6 py-5 text-white">
                <p className="text-sm uppercase tracking-[0.3em]">Pro conversion prompt</p>
                <p className="mt-3 text-slate-100">“If you want the exact messaging, captions, and listing copy already optimized for your market, upgrade now and get it done in seconds.”</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
