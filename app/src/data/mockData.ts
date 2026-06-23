// Données simulées — utilisées côté front pour l'affichage
// En production ces données viendraient de MongoDB / PostgreSQL / Redis

export interface Film {
  id: string;
  title: string;
  year: number;
  synopsis: string;
  duration: number;
  genres: string[];
  cast: { name: string; role: string }[];
  crew: { name: string; position: string }[];
  poster: string;
  country: string;
  language: string;
  avgScore: number;
  ratingsCount: number;
  published: boolean;
}

export interface MockUser {
  id: string;
  pseudo: string;
  avatar: string;
  bio: string;
  filmsWatched: number;
  reviewsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface Review {
  id: string;
  user: MockUser;
  film: Film;
  content: string;
  score: number;
  date: string;
  likesCount: number;
}

// ─── Films ────────────────────────────────────────────────────
export const MOCK_FILMS: Film[] = [
  {
    id: "6f7a8b9c0d1e2f3a4b5c6d7e",
    title: "The Godfather",
    year: 1972,
    synopsis:
      "Le patriarche vieillissant d'une dynastie du crime organisé transfère le contrôle de son empire clandestin à son fils réticent.",
    duration: 175,
    genres: ["Crime", "Drame"],
    cast: [
      { name: "Marlon Brando", role: "Vito Corleone" },
      { name: "Al Pacino", role: "Michael Corleone" },
      { name: "James Caan", role: "Sonny Corleone" },
      { name: "Diane Keaton", role: "Kay Adams" },
    ],
    crew: [
      { name: "Francis Ford Coppola", position: "Réalisateur" },
      { name: "Mario Puzo", position: "Scénariste" },
      { name: "Gordon Willis", position: "Directeur de la photographie" },
    ],
    poster: "https://placehold.co/300x450/1a0a00/f5c518?text=The+Godfather",
    country: "États-Unis",
    language: "Anglais",
    avgScore: 4.8,
    ratingsCount: 24831,
    published: true,
  },
  {
    id: "1a2b3c4d5e6f7a8b9c0d1e2f",
    title: "Pulp Fiction",
    year: 1994,
    synopsis:
      "Les histoires entrelacées de criminels, gangsters, paumés et personnages en marge de Los Angeles.",
    duration: 154,
    genres: ["Crime", "Drame", "Thriller"],
    cast: [
      { name: "John Travolta", role: "Vincent Vega" },
      { name: "Samuel L. Jackson", role: "Jules Winnfield" },
      { name: "Uma Thurman", role: "Mia Wallace" },
      { name: "Bruce Willis", role: "Butch Coolidge" },
    ],
    crew: [
      { name: "Quentin Tarantino", position: "Réalisateur" },
      { name: "Roger Avary", position: "Scénariste" },
      { name: "Andrzej Sekula", position: "Directeur de la photographie" },
    ],
    poster: "https://placehold.co/300x450/1a0a1a/f5c518?text=Pulp+Fiction",
    country: "États-Unis",
    language: "Anglais",
    avgScore: 4.6,
    ratingsCount: 19402,
    published: true,
  },
  {
    id: "2b3c4d5e6f7a8b9c0d1e2f3a",
    title: "The Dark Knight",
    year: 2008,
    synopsis:
      "Batman doit faire face à un ennemi psychotique connu sous le nom du Joker qui sème le chaos à Gotham City.",
    duration: 152,
    genres: ["Action", "Crime", "Drame"],
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne / Batman" },
      { name: "Heath Ledger", role: "The Joker" },
      { name: "Aaron Eckhart", role: "Harvey Dent" },
      { name: "Maggie Gyllenhaal", role: "Rachel Dawes" },
    ],
    crew: [
      { name: "Christopher Nolan", position: "Réalisateur" },
      { name: "Jonathan Nolan", position: "Scénariste" },
      { name: "Wally Pfister", position: "Directeur de la photographie" },
    ],
    poster: "https://placehold.co/300x450/0a0a1a/f5c518?text=The+Dark+Knight",
    country: "États-Unis",
    language: "Anglais",
    avgScore: 4.7,
    ratingsCount: 22011,
    published: true,
  },
  {
    id: "3c4d5e6f7a8b9c0d1e2f3a4b",
    title: "Parasite",
    year: 2019,
    synopsis:
      "Les membres d'une famille pauvre s'infiltrent progressivement dans la vie d'une famille riche, avec des conséquences dévastatrices.",
    duration: 132,
    genres: ["Comédie", "Drame", "Thriller"],
    cast: [
      { name: "Song Kang-ho", role: "Ki-taek" },
      { name: "Lee Sun-kyun", role: "Park Dong-ik" },
      { name: "Cho Yeo-jeong", role: "Choi Yeon-gyo" },
    ],
    crew: [
      { name: "Bong Joon-ho", position: "Réalisateur" },
      { name: "Han Jin-won", position: "Scénariste" },
      { name: "Hong Kyung-pyo", position: "Directeur de la photographie" },
    ],
    poster: "https://placehold.co/300x450/0a1a0a/f5c518?text=Parasite",
    country: "Corée du Sud",
    language: "Coréen",
    avgScore: 4.5,
    ratingsCount: 17830,
    published: true,
  },
  {
    id: "4d5e6f7a8b9c0d1e2f3a4b5c",
    title: "Inception",
    year: 2010,
    synopsis:
      "Un voleur qui s'infiltre dans les rêves des autres pour dérober leurs secrets doit accomplir une mission inverse : implanter une idée.",
    duration: 148,
    genres: ["Action", "Science-Fiction", "Thriller"],
    cast: [
      { name: "Leonardo DiCaprio", role: "Cobb" },
      { name: "Joseph Gordon-Levitt", role: "Arthur" },
      { name: "Elliot Page", role: "Ariadne" },
      { name: "Tom Hardy", role: "Eames" },
    ],
    crew: [
      { name: "Christopher Nolan", position: "Réalisateur" },
      { name: "Wally Pfister", position: "Directeur de la photographie" },
    ],
    poster: "https://placehold.co/300x450/0a0a2a/f5c518?text=Inception",
    country: "États-Unis",
    language: "Anglais",
    avgScore: 4.4,
    ratingsCount: 20765,
    published: true,
  },
  {
    id: "5e6f7a8b9c0d1e2f3a4b5c6d",
    title: "Spirited Away",
    year: 2001,
    synopsis:
      "Lors d'un déménagement, une petite fille se retrouve piégée dans un monde fantastique peuplé de dieux et de monstres.",
    duration: 125,
    genres: ["Animation", "Aventure", "Famille"],
    cast: [
      { name: "Daveigh Chase", role: "Chihiro (VF anglaise)" },
      { name: "Suzanne Pleshette", role: "Yubaba (VF anglaise)" },
    ],
    crew: [
      { name: "Hayao Miyazaki", position: "Réalisateur" },
      { name: "Nobuyuki Isshiki", position: "Scénariste" },
      { name: "Atsushi Okui", position: "Directeur de la photographie" },
    ],
    poster: "https://placehold.co/300x450/1a0a2a/f5c518?text=Spirited+Away",
    country: "Japon",
    language: "Japonais",
    avgScore: 4.6,
    ratingsCount: 16294,
    published: true,
  },
  {
    id: "6a7b8c9d0e1f2a3b4c5d6e7f",
    title: "Schindler's List",
    year: 1993,
    synopsis:
      "L'histoire vraie d'Oskar Schindler, un industriel allemand qui sauve plus de mille Juifs polonais pendant la Shoah.",
    duration: 195,
    genres: ["Biographie", "Drame", "Histoire"],
    cast: [
      { name: "Liam Neeson", role: "Oskar Schindler" },
      { name: "Ben Kingsley", role: "Itzhak Stern" },
      { name: "Ralph Fiennes", role: "Amon Goeth" },
    ],
    crew: [
      { name: "Steven Spielberg", position: "Réalisateur" },
      { name: "Steven Zaillian", position: "Scénariste" },
      { name: "Janusz Kamiński", position: "Directeur de la photographie" },
    ],
    poster: "https://placehold.co/300x450/1a1a1a/f5c518?text=Schindler%27s+List",
    country: "États-Unis",
    language: "Anglais",
    avgScore: 4.7,
    ratingsCount: 18943,
    published: true,
  },
  {
    id: "7b8c9d0e1f2a3b4c5d6e7f8a",
    title: "2001: A Space Odyssey",
    year: 1968,
    synopsis:
      "HAL 9000, l'intelligence artificielle d'un vaisseau spatial, se retourne contre son équipage lors d'une mission vers Jupiter.",
    duration: 149,
    genres: ["Science-Fiction", "Aventure", "Mystère"],
    cast: [
      { name: "Keir Dullea", role: "Dr. Dave Bowman" },
      { name: "Gary Lockwood", role: "Dr. Frank Poole" },
    ],
    crew: [
      { name: "Stanley Kubrick", position: "Réalisateur" },
      { name: "Arthur C. Clarke", position: "Scénariste" },
    ],
    poster: "https://placehold.co/300x450/02020a/4af?text=2001+Space+Odyssey",
    country: "États-Unis",
    language: "Anglais",
    avgScore: 4.3,
    ratingsCount: 12788,
    published: true,
  },
];

// ─── Utilisateurs ─────────────────────────────────────────────
export const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    pseudo: "cinephile_max",
    avatar: "https://placehold.co/80x80/2C3440/00AB6C?text=CM",
    bio: "Passionné de cinéma depuis toujours. Spécialiste du cinéma d'auteur européen.",
    filmsWatched: 847,
    reviewsCount: 312,
    followersCount: 1204,
    followingCount: 87,
  },
  {
    id: "u2",
    pseudo: "moviebuff_anna",
    avatar: "https://placehold.co/80x80/2C3440/F90?text=MA",
    bio: "J'aime les films qui font réfléchir. Mon genre préféré : le thriller psychologique.",
    filmsWatched: 423,
    reviewsCount: 89,
    followersCount: 456,
    followingCount: 203,
  },
  {
    id: "u3",
    pseudo: "filmlover_sam",
    avatar: "https://placehold.co/80x80/2C3440/9AB?text=FS",
    bio: "Cinéphile compulsif. 1200+ films dans la liste, impossible d'arrêter.",
    filmsWatched: 1203,
    reviewsCount: 541,
    followersCount: 3870,
    followingCount: 145,
  },
  {
    id: "u4",
    pseudo: "sophie_watches",
    avatar: "https://placehold.co/80x80/2C3440/00AB6C?text=SW",
    bio: "Adepte du cinéma asiatique et du noir américain.",
    filmsWatched: 312,
    reviewsCount: 67,
    followersCount: 189,
    followingCount: 311,
  },
];

// ─── Critiques récentes ───────────────────────────────────────
export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    user: MOCK_USERS[0],
    film: MOCK_FILMS[0],
    content:
      "Un chef-d'œuvre intemporel. Coppola nous livre une fresque familiale d'une densité extraordinaire. La performance de Brando est tout simplement inoubliable — chaque mot, chaque geste, chaque silence est chargé d'une autorité absolue. Le script de Puzo, la photo crépusculaire de Willis... tout concourt à créer quelque chose d'unique dans l'histoire du cinéma.",
    score: 5.0,
    date: "2024-11-12",
    likesCount: 847,
  },
  {
    id: "r2",
    user: MOCK_USERS[2],
    film: MOCK_FILMS[3],
    content:
      "Bong Joon-ho réussit l'exploit de changer complètement de registre à mi-chemin sans jamais perdre le spectateur. La tension monte crescendo jusqu'à un final dévastateur. La métaphore des classes sociales est limpide sans être grossière. Palme d'Or amplement méritée.",
    score: 4.5,
    date: "2024-11-10",
    likesCount: 512,
  },
  {
    id: "r3",
    user: MOCK_USERS[1],
    film: MOCK_FILMS[2],
    content:
      "Heath Ledger transcende totalement le genre du film de super-héros. Son Joker est une force du chaos pure, terrifiante et fascinante. Nolan construit une réflexion sur le mal, la justice et le sacrifice qui dépasse largement le cadre du blockbuster.",
    score: 4.5,
    date: "2024-11-08",
    likesCount: 391,
  },
  {
    id: "r4",
    user: MOCK_USERS[3],
    film: MOCK_FILMS[5],
    content:
      "Miyazaki à son sommet absolu. Un monde d'une richesse visuelle et narrative incroyable, une héroïne attachante, une bande-son de Joe Hisaishi à couper le souffle. Ce film grandit avec vous.",
    score: 5.0,
    date: "2024-11-07",
    likesCount: 673,
  },
];

// ─── Genres disponibles ───────────────────────────────────────
export const ALL_GENRES = [
  "Action", "Animation", "Aventure", "Biographie", "Comédie",
  "Crime", "Drame", "Famille", "Histoire", "Horreur",
  "Mystère", "Romance", "Science-Fiction", "Thriller",
];
