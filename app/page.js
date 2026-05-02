'use client';

import { useMemo, useState } from 'react';
import FlyerPreview from '@/components/FlyerPreview';
import { generateOutputs } from '@/utils/generation';

const defaultInput = {
  imagePreview: '',
  address: '',
  cityState: '',
  price: '',
  beds: '',
  baths: '',
  sqft: '',
  features: '',
  status: 'Coming Soon',
  roomType: 'Living Room',
  style: 'Modern'
};

export default function HomePage() {
  const [step, setStep] = useState('dashboard');
  const [input, setInput] = useState(defaultInput);
  const [outputs, setOutputs] = useState(null);
  const [flyerTemplate, setFlyerTemplate] = useState('Modern');

  const glowScore = useMemo(() => (outputs ? 5 : 0), [outputs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setInput((prev) => ({ ...prev, imagePreview: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function handleGenerate(e) {
    e.preventDefault();
    // TODO: Replace with OpenAI text + image prompt generation calls in production.
    setOutputs(generateOutputs(input));
    setStep('results');
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
  }

  function resetFlow() {
    setStep('form');
  }

  function downloadFlyer() {
    // TODO: Implement PNG export with html-to-image or dom-to-image package.
    alert('TODO: Connect PNG export in the next iteration.');
  }

  return (
    <main className="page">
      <header className="hero card">
        <h1>Listing Glow Up AI</h1>
        <p>Turn listing photos into staging prompts, listing copy, and social-ready marketing in minutes.</p>
        <small>Beginner tip: Fill out just the basics to generate polished marketing copy fast.</small>
      </header>

      {step === 'dashboard' && (
        <section className="card center">
          <button className="primary" onClick={() => setStep('form')}>Start a Listing Glow Up</button>
        </section>
      )}

      {step === 'form' && (
        <form className="card grid" onSubmit={handleGenerate}>
          <h2>Listing Input</h2>
          <label>Upload listing photo<input type="file" accept="image/*" onChange={handleImage} /></label>
          <label>Property address<input name="address" value={input.address} onChange={handleChange} required /></label>
          <label>City/state<input name="cityState" value={input.cityState} onChange={handleChange} required /></label>
          <label>Price<input name="price" value={input.price} onChange={handleChange} required placeholder="$799,000"/></label>
          <label>Beds<input name="beds" value={input.beds} onChange={handleChange} required /></label>
          <label>Baths<input name="baths" value={input.baths} onChange={handleChange} required /></label>
          <label>Square footage<input name="sqft" value={input.sqft} onChange={handleChange} required /></label>
          <label className="full">Best features<textarea name="features" value={input.features} onChange={handleChange} required /></label>
          <label>Listing status
            <select name="status" value={input.status} onChange={handleChange}>
              <option>Coming Soon</option><option>Just Listed</option><option>Open House</option><option>Price Improvement</option>
            </select>
          </label>
          <label>Room/photo type
            <select name="roomType" value={input.roomType} onChange={handleChange}>
              <option>Exterior</option><option>Living Room</option><option>Kitchen</option><option>Bedroom</option><option>Bathroom</option><option>Dining Room</option><option>Office</option><option>Backyard</option>
            </select>
          </label>
          <label>Style
            <select name="style" value={input.style} onChange={handleChange}>
              <option>Modern</option><option>Luxury</option><option>Farmhouse</option><option>Coastal</option><option>Boho</option><option>Minimalist</option><option>Warm Traditional</option>
            </select>
          </label>
          <button className="primary full" type="submit">Generate Glow Up</button>
        </form>
      )}

      {step === 'results' && outputs && (
        <section className="results">
          <div className="card glow-score">
            <h3>Glow Score</h3>
            <p className="score">{glowScore}/5</p>
            <small>Market-ready assets generated</small>
          </div>

          {[
            ['Virtual Staging Prompt', outputs.stagingPrompt],
            ['Photo Enhancement Prompt', outputs.enhancementPrompt],
            ['MLS Listing Description', outputs.mlsDescription],
            ['Social Media Caption', outputs.socialCaption]
          ].map(([title, text]) => (
            <article key={title} className="card">
              <h3>{title}</h3>
              <p>{text}</p>
              {title === 'Virtual Staging Prompt' && <small>Always disclose virtually staged or AI-enhanced images according to your MLS, brokerage, and local advertising rules.</small>}
              <button onClick={() => copyText(text)}>Copy</button>
            </article>
          ))}

          <article className="card">
            <h3>Flyer Text</h3>
            <p><strong>Headline:</strong> {outputs.flyer.headline}</p>
            <p><strong>Subheadline:</strong> {outputs.flyer.subheadline}</p>
            <p><strong>Feature line:</strong> {outputs.flyer.featureLine}</p>
            <p><strong>CTA:</strong> {outputs.flyer.cta}</p>
            <button onClick={() => copyText(`${outputs.flyer.headline}\n${outputs.flyer.subheadline}\n${outputs.flyer.featureLine}\n${outputs.flyer.cta}`)}>Copy</button>
          </article>

          <article className="card">
            <h3>Flyer Preview</h3>
            <div className="template-row">
              {['Modern', 'Luxury', 'Bold'].map((t) => <button key={t} onClick={() => setFlyerTemplate(t)}>{t}</button>)}
            </div>
            <FlyerPreview input={input} flyerText={outputs.flyer} template={flyerTemplate} />
            <button className="primary" onClick={downloadFlyer}>Download Flyer</button>
          </article>

          <button className="secondary" onClick={resetFlow}>Reset / Edit Inputs</button>
        </section>
      )}
    </main>
  );
}
