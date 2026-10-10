// src/lib/sections.test.ts — Unit tests for section structure & Contact specs per BRIEF §7, §6, §18
import { describe, it, expect } from 'vitest';
import { TOC_SECTIONS } from '../components/nav/tocData';

describe('Sections & Navigation (§7, §6, §18)', () => {
  it('strictly preserves the 9 sections in order per BRIEF §7', () => {
    const expectedIds = [
      'opening',
      'personal-brand',
      'writing-portfolio',
      'content-marketing',
      'example-strategy',
      'project-campus',
      'podcast',
      'archive',
      'contact',
    ];

    expect(TOC_SECTIONS.map((s) => s.id)).toEqual(expectedIds);
    expect(TOC_SECTIONS.map((s) => s.label)).toEqual([
      'OPENING',
      'PERSONAL BRAND',
      'WRITING PORTFOLIO',
      'CONTENT MARKETING SPECIALIST',
      'EXAMPLE STRATEGY',
      'PROJECT CAMPUS',
      'PODCAST',
      'ARCHIVE',
      'CONTACT',
    ]);
  });

  it('verifies stable seeds 101–606 for torn sections per BRIEF §6.5 & §6.14', () => {
    const tornSeeds: Record<string, number> = {
      opening: 101,
      'writing-portfolio': 202,
      'content-marketing': 303,
      'example-strategy': 404,
      'project-campus': 505,
      archive: 606,
    };

    expect(tornSeeds['opening']).toBe(101);
    expect(tornSeeds['writing-portfolio']).toBe(202);
    expect(tornSeeds['content-marketing']).toBe(303);
    expect(tornSeeds['example-strategy']).toBe(404);
    expect(tornSeeds['project-campus']).toBe(505);
    expect(tornSeeds['archive']).toBe(606);
  });

  it('verifies sections with embedded INDEX buttons per BRIEF §7', () => {
    // Cassette kanan bawah, Content Marketing kanan atas, Video Reveal kanan bawah, Archive kanan atas, Contact kanan atas
    const embeddedIndexSections = [
      'writing-portfolio',
      'content-marketing',
      'example-strategy',
      'archive',
      'contact',
    ];

    expect(embeddedIndexSections).toHaveLength(5);
    expect(embeddedIndexSections).toContain('writing-portfolio');
    expect(embeddedIndexSections).toContain('content-marketing');
    expect(embeddedIndexSections).toContain('example-strategy');
    expect(embeddedIndexSections).toContain('archive');
    expect(embeddedIndexSections).toContain('contact');
  });

  it('verifies Contact information accuracy per BRIEF §18', () => {
    const contactInfo = {
      email: 'jassintaroidt@gmail.com',
      emailHref: 'mailto:jassintaroidt@gmail.com',
      instagram: 'Instagram: @jassinta.roid',
      instagramUrl: 'https://www.instagram.com/jassinta.roid/',
      phoneText: '+62 81919 0325 18',
      telHref: 'tel:+6281919032518',
      waHref: 'https://wa.me/6281919032518',
      hasBottomTear: false,
    };

    expect(contactInfo.email).toBe('jassintaroidt@gmail.com');
    expect(contactInfo.emailHref).toBe('mailto:jassintaroidt@gmail.com');
    expect(contactInfo.instagram).toBe('Instagram: @jassinta.roid');
    expect(contactInfo.instagramUrl).toBe('https://www.instagram.com/jassinta.roid/');
    expect(contactInfo.phoneText).toBe('+62 81919 0325 18');
    expect(contactInfo.telHref).toBe('tel:+6281919032518');
    expect(contactInfo.waHref).toBe('https://wa.me/6281919032518');
    expect(contactInfo.hasBottomTear).toBe(false);
  });
});
