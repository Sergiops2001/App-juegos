export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Juegos",
  description: "Gestiona tu lista de juegos y favoritos.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Favoritos",
      href: "/favoritos",
    },

  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Favoritos",
      href: "/favoritos",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};
