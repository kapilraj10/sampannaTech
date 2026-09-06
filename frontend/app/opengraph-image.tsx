import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0f172a',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#1B6FF5',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 64 64">
              <path
                d="M32 12 L48 22 L48 42 L32 52 L16 42 L16 22 Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="32" r="6" fill="#ffffff" />
            </svg>
          </div>
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 700 }}>
            Sampanna
            <span style={{ color: '#59b0ff' }}>Tech</span>
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 32, marginTop: 24, color: '#cbd5e1' }}>
          Technology That Helps Your Business Grow.
        </div>
      </div>
    ),
    size
  );
}