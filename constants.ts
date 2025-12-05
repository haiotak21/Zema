
import { Song, Playlist, LyricLine, Artist, Album, Podcast } from './types';

export const MOCK_LYRICS: LyricLine[] = [
  { time: 5, text: "Waitin' for the day to come" },
  { time: 10, text: "When we can be together" },
  { time: 15, text: "Singing songs of love and peace" },
  { time: 20, text: "Underneath the sunny weather" },
  { time: 25, text: "(Instrumental Break)" },
  { time: 35, text: "Ethiopia, rise and shine" },
  { time: 40, text: "Your beauty is divine" }
];

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Tizita',
    artist: 'Aster Aweke',
    album: 'Ebo',
    coverUrl: 'https://picsum.photos/200/200?random=1',
    duration: 245,
    genre: 'Traditional',
    url: '#',
    lyrics: MOCK_LYRICS,
    status: 'APPROVED'
  },
  {
    id: '2',
    title: 'Yene Konjo',
    artist: 'Teddy Afro',
    album: 'Ethiopia',
    coverUrl: 'https://picsum.photos/200/200?random=2',
    duration: 310,
    genre: 'Pop',
    url: '#',
    lyrics: MOCK_LYRICS,
    status: 'APPROVED'
  },
  {
    id: '3',
    title: 'Gue',
    artist: 'Gigi',
    album: 'Gigi',
    coverUrl: 'https://picsum.photos/200/200?random=3',
    duration: 280,
    genre: 'Jazz Fusion',
    url: '#',
    lyrics: [],
    status: 'APPROVED'
  },
  {
    id: '4',
    title: 'Pending Release',
    artist: 'New Artist',
    album: 'Demo Tape',
    coverUrl: 'https://picsum.photos/200/200?random=4',
    duration: 180,
    genre: 'Hip Hop',
    url: '#',
    status: 'PENDING',
    lyrics: [{ time: 0, text: "Pending review lyrics..." }]
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: '1', title: 'Addis Top 50', coverUrl: 'https://picsum.photos/200/200?random=10', songCount: 50 },
  { id: '2', title: 'Ethio-Jazz Classics', coverUrl: 'https://picsum.photos/200/200?random=11', songCount: 24 },
  { id: '3', title: 'Weekend Vibe', coverUrl: 'https://picsum.photos/200/200?random=12', songCount: 15 },
];

export const MOCK_ARTISTS: Artist[] = [
  { id: '1', name: 'Aster Aweke', image: 'https://picsum.photos/200?random=1', followers: '1.2M', verified: true, bio: 'Aster Aweke is an Ethiopian singer who is known for her soulful, buzzing tone. She is often referred to as the "Aretha Franklin of Ethiopia".' },
  { id: '2', name: 'Teddy Afro', image: 'https://picsum.photos/200?random=2', followers: '2.5M', verified: true, bio: 'Tewodros Kassahun Germamo, known professionally as Teddy Afro, is an Ethiopian singer-songwriter. He is considered by many to be the most popular artist in Ethiopia.' },
  { id: '3', name: 'Gigi', image: 'https://picsum.photos/200?random=3', followers: '800K', verified: false, bio: 'Ejigayehu Shibabaw, known by her stage name Gigi, is an Ethiopian singer and one of the most successful contemporary Ethiopian artists.' },
  { id: '4', name: 'Rophnan', image: 'https://picsum.photos/200?random=21', followers: '950K', verified: true, bio: 'Rophnan Nuri, known mononymously as Rophnan, is an Ethiopian DJ, singer, songwriter, and record producer.' },
  { id: '5', name: 'New Artist', image: 'https://picsum.photos/200?random=4', followers: '10K', verified: false, bio: 'Up and coming talent from the streets of Addis.' },
];

export const MOCK_ALBUMS: Album[] = [
  { id: '1', title: 'Ebo', artist: 'Aster Aweke', coverUrl: 'https://picsum.photos/200?random=1', year: '1999' },
  { id: '2', title: 'Ethiopia', artist: 'Teddy Afro', coverUrl: 'https://picsum.photos/200?random=2', year: '2017' },
  { id: '3', title: 'Gigi', artist: 'Gigi', coverUrl: 'https://picsum.photos/200?random=3', year: '2001' },
];

export const MOCK_PODCASTS: Podcast[] = [
    { id: '1', title: 'Tech Talk Addis', host: 'Solomon K.', coverUrl: 'https://picsum.photos/200?random=50', category: 'Technology', episodes: 42 },
    { id: '2', title: 'Ethio History', host: 'Dr. Girma', coverUrl: 'https://picsum.photos/200?random=51', category: 'History', episodes: 15 },
    { id: '3', title: 'Morning Coffee', host: 'Helen & Friends', coverUrl: 'https://picsum.photos/200?random=52', category: 'Lifestyle', episodes: 89 },
    { id: '4', title: 'Business Ethiopia', host: 'Zemedeneh', coverUrl: 'https://picsum.photos/200?random=53', category: 'Business', episodes: 24 },
];

// Treat episodes as Songs for the Player compatibility
export const MOCK_PODCAST_EPISODES: Record<string, Song[]> = {
    '1': [
        { id: 'p1e1', title: 'The Rise of AI in Africa', artist: 'Tech Talk Addis', album: 'Tech Talk Addis', coverUrl: 'https://picsum.photos/200?random=50', duration: 1840, genre: 'Technology', url: '#', status: 'APPROVED' },
        { id: 'p1e2', title: 'Startups to Watch in 2024', artist: 'Tech Talk Addis', album: 'Tech Talk Addis', coverUrl: 'https://picsum.photos/200?random=50', duration: 2100, genre: 'Technology', url: '#', status: 'APPROVED' },
        { id: 'p1e3', title: 'Mobile Money Revolution', artist: 'Tech Talk Addis', album: 'Tech Talk Addis', coverUrl: 'https://picsum.photos/200?random=50', duration: 1560, genre: 'Technology', url: '#', status: 'APPROVED' },
    ],
    '2': [
        { id: 'p2e1', title: 'The Battle of Adwa', artist: 'Dr. Girma', album: 'Ethio History', coverUrl: 'https://picsum.photos/200?random=51', duration: 3200, genre: 'History', url: '#', status: 'APPROVED' },
        { id: 'p2e2', title: 'Lalibela Architecture', artist: 'Dr. Girma', album: 'Ethio History', coverUrl: 'https://picsum.photos/200?random=51', duration: 2800, genre: 'History', url: '#', status: 'APPROVED' },
    ],
    '3': [
         { id: 'p3e1', title: 'Best Coffee Spots', artist: 'Helen & Friends', album: 'Morning Coffee', coverUrl: 'https://picsum.photos/200?random=52', duration: 1200, genre: 'Lifestyle', url: '#', status: 'APPROVED' },
    ],
    '4': [
         { id: 'p4e1', title: 'Import/Export 101', artist: 'Zemedeneh', album: 'Business Ethiopia', coverUrl: 'https://picsum.photos/200?random=53', duration: 2400, genre: 'Business', url: '#', status: 'APPROVED' },
    ]
};
