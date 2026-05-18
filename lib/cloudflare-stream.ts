export function streamThumbnailUrl(
  customerCode: string,
  videoUid: string,
): string {
  return `https://customer-${customerCode}.cloudflarestream.com/${videoUid}/thumbnails/thumbnail.jpg`;
}

export function streamIframeSrc(
  customerCode: string,
  videoUid: string,
): string {
  return `https://customer-${customerCode}.cloudflarestream.com/${videoUid}/iframe`;
}

export function streamIframeAutoplaySrc(
  customerCode: string,
  videoUid: string,
): string {
  return `${streamIframeSrc(customerCode, videoUid)}?autoplay=true`;
}
