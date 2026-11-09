import { next } from '@vercel/functions';
import { regionResponse } from './lib/hk-region-gate.mjs';

export default function middleware(request) {
  const denied = regionResponse(request);
  if (denied) return denied;
  const url = new URL(request.url);
  if (url.hostname === 'posx.network') {
    url.hostname = 'www.posx.network';
    return new Response(null, {status:307, headers:{Location:url.href}});
  }
  return next();
}
