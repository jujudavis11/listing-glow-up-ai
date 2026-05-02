export default function FlyerPreview({ input, flyerText, template }) {
  return (
    <div id="flyer-preview" className={`flyer ${template.toLowerCase()}`}>
      <div className="flyer-image-wrap">
        <img src={input.imagePreview || '/placeholder-home.svg'} alt="Listing preview" className="flyer-image" />
        <span className="status-badge">{input.status}</span>
      </div>
      <div className="flyer-body">
        <h3>{flyerText.headline}</h3>
        <p className="flyer-price">{input.price}</p>
        <p>{input.address}</p>
        <p>{flyerText.subheadline}</p>
        <p>{flyerText.featureLine}</p>
        <button className="cta-chip">{flyerText.cta}</button>
      </div>
    </div>
  );
}
