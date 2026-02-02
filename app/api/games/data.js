//Almacenamiento de juegos, lo he hecho en un array
let games = [
  {
    id: 1,
    title: "The Last of Us Part II",
    platform: "PlayStation 5",
    genre: "Acción-Aventura",
    releaseDate: "2020-06-19",
    cover: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/mixcollage-14-dec-2024-05-56-am-7891.jpg",
    isFavorite: true,
    description: "Una épica historia de venganza y redención en un mundo postapocalíptico devastado por una infección fúngica."
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    platform: "PlayStation 4",
    genre: "Acción-Aventura",
    releaseDate: "2018-10-26",
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.png",
    isFavorite: true,
    description: "Vive la épica historia de Arthur Morgan y la banda de Van der Linde en el ocaso del Viejo Oeste americano."
  },
  {
    id: 3,
    title: "God of War (2018)",
    platform: "PlayStation 4",
    genre: "Acción-Aventura",
    releaseDate: "2018-04-20", 
    cover: "https://th.bing.com/th/id/R.1bb6ce415ff593a6b20f190ed2ff2152?rik=71VnF6h1apvJZQ&pid=ImgRaw&r=0",
    isFavorite: true,
    description: "Kratos y su hijo Atreus emprenden un viaje épico por los reinos nórdicos con una emotiva historia padre-hijo."
  },
  {
    id: 4,
    title: "Ghost of Tsushima",
    platform: "PlayStation 5",
    genre: "Acción-Aventura",
    releaseDate: "2020-07-17",
    cover: "https://th.bing.com/th/id/R.2a61e945f3a7893ee5604706f1fc065e?rik=vOW3yC5g0Axmaw&pid=ImgRaw&r=0",
    isFavorite: false,
    description: "Conviértete en el Fantasma y defiende la isla de Tsushima durante la invasión mongol del Japón feudal en 1274."
  },
  {
    id: 5,
    title: "Horizon Zero Dawn",
    platform: "PlayStation 4",
    genre: "RPG de Acción",
    releaseDate: "2017-02-28",
    cover: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/10/horizon-zero-dawn-remastered-cover-1.jpg",
    isFavorite: false,
    description: "Descubre los misterios de un mundo postapocalíptico dominado por máquinas con forma de dinosaurios."
  },
  {
    id: 6,
    title: "Uncharted 4: A Thief's End",
    platform: "PlayStation 4",
    genre: "Acción-Aventura",
    releaseDate: "2016-05-10",
    cover: "https://th.bing.com/th/id/R.ac68f6fa9aba6b5289de0ee7edd36ad9?rik=ZlasYbQ7VcBZFQ&riu=http%3a%2f%2fwww.mobygames.com%2fimages%2fcovers%2fl%2f330413-uncharted-4-a-thief-s-end-playstation-4-front-cover.jpg&ehk=4mRGVKo1P%2bXswRgBB89RwSYm9F2vYyT143sRv%2bZy3LM%3d&risl=&pid=ImgRaw&r=0",
    isFavorite: false,
    description: "Acompaña a Nathan Drake en su última aventura buscando el tesoro perdido del pirata Henry Avery."
  },
  {
    id: 7,
    title: "The Witcher 3: Wild Hunt",
    platform: "PC",
    genre: "RPG",
    releaseDate: "2015-05-19",
    cover: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/05/the-witcher-wild-hunt-poster.jpg",
    isFavorite: true,
    description: "Geralt de Rivia busca a su hija adoptiva en un mundo de fantasía oscuro lleno de decisiones morales complejas."
  },
  {
    id: 8,
    title: "A Plague Tale: Innocence",
    platform: "PC",
    genre: "Aventura",
    releaseDate: "2019-05-14",
    cover: "https://tse1.mm.bing.net/th/id/OIP.uolBYZOTHla67Th7uPI52gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    isFavorite: false,
    description: "Dos hermanos luchan por sobrevivir en la Francia medieval durante la plaga negra y la Inquisición."
  },
  {
    id: 9,
    title: "Assassin's Creed Valhalla",
    platform: "Xbox Series X",
    genre: "RPG de Acción",
    releaseDate: "2020-11-10",
    cover: "https://wallpapercave.com/wp/wp6364510.jpg",
    isFavorite: false,
    description: "Lidera a tu clan vikingo desde Noruega hasta Inglaterra durante la era vikinga del siglo IX."
  },
  {
    id: 10,
    title: "Metro Exodus",
    platform: "PC",
    genre: "Shooter",
    releaseDate: "2019-02-15",
    cover: "https://tse2.mm.bing.net/th/id/OIP.CBk4V6EYg8bt4Ayw2Ea89gHaKk?rs=1&pid=ImgDetMain&o=7&rm=3",
    isFavorite: false,
    description: "Viaja a través de la Rusia postapocalíptica en un tren mientras buscas un nuevo hogar tras una guerra nuclear."
  },
  {
    id: 11,
    title: "Days Gone",
    platform: "PlayStation 4",
    genre: "Acción-Aventura",
    releaseDate: "2019-04-26",
    cover: "https://tse4.mm.bing.net/th/id/OIP.FZaZCM0s2H4MUfGAjUQO_AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    isFavorite: false,
    description: "Sobrevive en un mundo postapocalíptico infestado de Freakers mientras buscas a tu esposa desaparecida."
  },
  {
    id: 12,
    title: "Mafia: Definitive Edition",
    platform: "PC",
    genre: "Acción-Aventura",
    releaseDate: "2020-09-25",
    cover: "https://store-images.s-microsoft.com/image/apps.22534.14479109482538687.fee2b7fd-33b8-463e-b444-b5f0839c1d2b.9e1c69d0-5107-4eda-8b73-1a50f3b88b32",
    isFavorite: false,
    description: "Vive la historia de Tommy Angelo en la ciudad ficticia de Lost Heaven durante la era de la Ley Seca."
  }
];

let nextId = 13; // Para generar IDs únicos

export { games, nextId };