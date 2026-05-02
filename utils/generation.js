const styleMap = {
  Modern: 'streamlined silhouettes, matte black accents, neutral textiles, sculptural decor',
  Luxury: 'high-end layered textures, statement lighting, elegant art, premium materials',
  Farmhouse: 'organic woods, cozy linen textiles, soft rustic accents, welcoming warmth',
  Coastal: 'light airy textures, soft blues, sandy neutrals, relaxed natural fibers',
  Boho: 'layered textiles, curated global decor, natural woods, soft earthy colors',
  Minimalist: 'clean lines, restrained decor, subtle textures, calm monochrome palette',
  'Warm Traditional': 'classic furnishings, warm wood tones, timeless detailing, soft ambient lighting'
};

const roomMap = {
  Exterior: 'front elevation and curb appeal composition',
  'Living Room': 'seating layout and conversational flow',
  Kitchen: 'countertop styling and dining/bar accents',
  Bedroom: 'restful bedding layers and cozy bedside styling',
  Bathroom: 'spa-inspired towel, vanity, and accessory styling',
  'Dining Room': 'table vignette and ambient entertaining atmosphere',
  Office: 'productive desk setup and polished backdrop decor',
  Backyard: 'outdoor lounge zoning and inviting evening ambiance'
};

export function generateOutputs(input) {
  const roomDetail = roomMap[input.roomType] || 'room composition and balanced styling';
  const styleDetail = styleMap[input.style] || 'warm, polished, market-ready styling';

  const stagingPrompt = `Create a photorealistic virtual staging concept for this ${input.roomType} in a ${input.style} style. Focus on ${roomDetail} with ${styleDetail}. Preserve all existing architecture, doorways, windows, flooring, walls, ceiling lines, and original room dimensions exactly as-is. Only add furniture, decor, layered lighting, and visual warmth to make the space feel aspirational and buyer-ready.`;

  const enhancementPrompt = `Enhance this real estate photo with professional MLS-quality retouching. Brighten exposure, improve white balance, increase sharpness, refine contrast, and reduce harsh shadows while keeping highlights natural. Keep all structural elements unchanged, preserve true room proportions, and deliver a clean, realistic, high-end final image.`;

  const mlsDescription = `${input.cityState} living shines at ${input.address}. Offered at ${input.price}, this ${input.beds} bed, ${input.baths} bath home spans ${input.sqft} sq ft and blends comfort with standout style. Enjoy ${input.features}. Thoughtful layout, inviting natural light, and move-in-ready presentation make this a must-see opportunity.`;

  const captionByStatus = {
    'Coming Soon': `✨ Coming Soon in ${input.cityState}! ${input.beds}BR/${input.baths}BA at ${input.address} with ${input.features}. Buyers, this one is worth the wait. DM for early details. #ComingSoon #RealEstate`,
    'Just Listed': `🏡 Just Listed: ${input.address} in ${input.cityState}. Priced at ${input.price}, featuring ${input.beds}BR/${input.baths}BA and ${input.sqft} sq ft. Highlights: ${input.features}. Message me for a private showing! #JustListed #DreamHome`,
    'Open House': `📍 Open House Alert at ${input.address}! Tour this ${input.beds}BR/${input.baths}BA home in ${input.cityState}, listed at ${input.price}. You'll love ${input.features}. Join us and fall in love in person! #OpenHouse #HouseHunting`,
    'Price Improvement': `💥 Price Improvement at ${input.address}! Now offered at ${input.price} in ${input.cityState}. ${input.beds}BR/${input.baths}BA, ${input.sqft} sq ft, and standout features like ${input.features}. Incredible value—let’s schedule your showing. #PriceImprovement #RealEstateDeal`
  };

  const flyer = {
    headline: input.status === 'Price Improvement' ? 'New Price. New Opportunity.' : `${input.status} in ${input.cityState}`,
    subheadline: `${input.beds} Beds • ${input.baths} Baths • ${input.sqft} Sq Ft`,
    featureLine: `Highlighted features: ${input.features}`,
    cta: 'Message me for details'
  };

  return {
    stagingPrompt,
    enhancementPrompt,
    mlsDescription,
    socialCaption: captionByStatus[input.status] || captionByStatus['Just Listed'],
    flyer
  };
}
