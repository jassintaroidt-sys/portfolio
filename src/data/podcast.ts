// src/data/podcast.ts — BRIEF §16 Podcast Data

export interface SpotifyEpisode {
  id: string;
  title: string;
  subtitle: string;
  embedUrl: string;
  spotifyUrl: string;
}

export interface PodcastCredits {
  script: string;
  hosts: string;
  podcastName: string;
}

export const PODCAST_EPISODES: SpotifyEpisode[] = [
  {
    id: '5v0J711J5xyWvYZn8JWC76',
    title: 'Episode 1',
    subtitle: 'Kartini Podcast · Discussion & Storytelling',
    embedUrl: 'https://open.spotify.com/embed/episode/5v0J711J5xyWvYZn8JWC76',
    spotifyUrl: 'https://open.spotify.com/episode/5v0J711J5xyWvYZn8JWC76',
  },
  {
    id: '4dfqcKbGRCaxuoztDsqu0d',
    title: 'Episode 2',
    subtitle: 'Kartini Podcast · Cultural & Student Narratives',
    embedUrl: 'https://open.spotify.com/embed/episode/4dfqcKbGRCaxuoztDsqu0d',
    spotifyUrl: 'https://open.spotify.com/episode/4dfqcKbGRCaxuoztDsqu0d',
  },
];

export const PODCAST_CREDITS: PodcastCredits = {
  script: 'Jassinta Roid Triniti',
  hosts: 'Tataq, Aqilah',
  podcastName: 'Kartini Podcast',
};
