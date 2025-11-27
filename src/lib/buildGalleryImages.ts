// Builds 4 images total: 1 main + 3 thumbnails.
// Primary image ALWAYS first. If fewer exist, repeat primary.
export function buildGalleryImages(
  items: { image: string; is_primary?: boolean }[],
  frameCount = 4
): string[] {
  const primary = items.find((i) => i.is_primary) ?? items[0] ?? null;

  const frames: string[] = [];
  if (primary) frames.push(primary.image);

  // push non-primary images
  const nonPrimary = items.filter((i) => i !== primary);
  for (const img of nonPrimary.slice(0, frameCount - frames.length)) {
    frames.push(img.image);
  }

  // fill remaining slots with primary (or empty string)
  while (frames.length < frameCount) {
    frames.push(primary ? primary.image : "");
  }

  return frames;
}
