import { describe, it, expect } from 'vitest';
import { mediaUrl } from './media';

describe('mediaUrl helper', () => {
  it('correctly encodes media path segments', () => {
    const url = mediaUrl('video/Hasil Konten Fun Lassiewear.mp4');
    expect(url).toContain('assets/video/Hasil%20Konten%20Fun%20Lassiewear.mp4');
  });

  it('handles leading slash without duplicate slashes', () => {
    const url = mediaUrl('/img/flyer_kecantikan_1.jpg');
    expect(url).toContain('assets/img/flyer_kecantikan_1.jpg');
  });
});
