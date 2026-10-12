export const verificationHostname = 'hicancan.top';
export const verificationPath = '/baidu_verify_codeva-TlJBZmli1p.html';

export function serveVerification(request, verificationText) {
  const url = new URL(request.url);
  if (
    url.hostname !== verificationHostname
    || url.pathname !== verificationPath
    || !['GET', 'HEAD'].includes(request.method)
  ) {
    return new Response(null, { status: 404 });
  }

  return new Response(request.method === 'HEAD' ? null : verificationText, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': String(new TextEncoder().encode(verificationText).byteLength),
      'Cache-Control': 'no-store',
    },
  });
}
