export const GITHUB_URL = 'https://github.com/juanvieiraprado99/ng-mapcn';
export const NPM_URL = 'https://www.npmjs.com/package/ng-mapcn';
export const MAPCN_URL = 'https://www.mapcn.dev/';

export const FEATURES = [
  {
    title: 'Theme-aware',
    description:
      'O mapa se adapta ao modo claro/escuro (ou à preferência do sistema).',
    icon: 'pi pi-sun',
  },
  {
    title: 'Zero config',
    description:
      'Funciona com valores padrão; basta usar ng-map com mapId e opcionalmente centro e zoom.',
    icon: 'pi pi-cog',
  },
  {
    title: 'Estilo shadcn',
    description:
      'Componentes composáveis e variáveis CSS; fácil integração com design systems como shadcn.',
    icon: 'pi pi-palette',
  },
  {
    title: 'MapLibre GL',
    description:
      'Acesso às capacidades do MapLibre: zoom, rotação, pitch, projeções e estilos vetoriais.',
    icon: 'pi pi-map',
  },
  {
    title: 'Composável',
    description:
      'Mapa, marcadores, rotas e controles são componentes separados; monte apenas o que precisar.',
    icon: 'pi pi-th-large',
  },
  {
    title: 'Marcadores e popups',
    description:
      'Popups, tooltips, ícones e tamanhos; marcadores arrastáveis e numerados em rotas.',
    icon: 'pi pi-map-marker',
  },
  {
    title: 'Rotas',
    description:
      'Desenhe linhas com cor, espessura, traço e paradas numeradas; suporte a dados OSRM.',
    icon: 'pi pi-directions',
  },
  {
    title: 'Planejamento OSRM',
    description:
      'Calcule rotas entre origem e destino com múltiplas alternativas e duração/distância.',
    icon: 'pi pi-route',
  },
  {
    title: 'Controles',
    description:
      'Zoom, bússola, localizar e tela cheia; posicionáveis e agrupáveis.',
    icon: 'pi pi-sliders-h',
  },
] as const;

/** Exemplos alinhados com docs/EXAMPLES.md (resumo rápido). Cada id corresponde ao componente em example-maps/. */
export type ExampleId =
  | 'basic-map'
  | 'controls-map'
  | 'custom-style-map'
  | 'dark-theme-map'
  | 'flyto-globe-map'
  | 'flyto-markers-map'
  | 'markers-map'
  | 'routes-map'
  | 'route-planning-map'
  | 'tooltips-map';

export const EXAMPLES: ReadonlyArray<{
  id: ExampleId;
  name: string;
  description: string;
  demoLink: string;
}> = [
  {
    id: 'basic-map',
    name: 'Basic Map',
    description: 'Mapa mínimo com zoom.',
    demoLink: '#',
  },
  {
    id: 'controls-map',
    name: 'Controls Map',
    description:
      'Mapa com todos os controles: zoom, bússola, localizar, tela cheia.',
    demoLink: '#',
  },
  {
    id: 'custom-style-map',
    name: 'Custom Style',
    description: 'Mapa com estilo customizado (URL ou objeto).',
    demoLink: '#',
  },
  {
    id: 'dark-theme-map',
    name: 'Dark Theme',
    description: 'Mapa em tema escuro (theme="\'dark\'").',
    demoLink: '#',
  },
  {
    id: 'flyto-globe-map',
    name: 'Fly To Globe',
    description: 'Projeção globo + animação flyTo para uma coordenada.',
    demoLink: '#',
  },
  {
    id: 'flyto-markers-map',
    name: 'Fly To Markers',
    description: 'Marcadores; clique faz flyTo até o marcador.',
    demoLink: '#',
  },
  {
    id: 'markers-map',
    name: 'Markers Map',
    description: 'Marcadores com tamanhos, cores e popups; inclui uma rota.',
    demoLink: '#',
  },
  {
    id: 'routes-map',
    name: 'Routes Map',
    description: 'Múltiplas rotas; uma com paradas e marcadores numerados.',
    demoLink: '#',
  },
  {
    id: 'route-planning-map',
    name: 'Route Planning',
    description:
      'Rotas OSRM entre dois pontos; alternativas, tempo e distância.',
    demoLink: '#',
  },
  {
    id: 'tooltips-map',
    name: 'Tooltips Map',
    description:
      'Marcadores com tooltips (âncora, offset, enabled, showOnHover).',
    demoLink: '#',
  },
];

export const COMPONENTS_LIST = [
  {
    name: 'Map',
    selector: 'ng-map',
    description: 'Cria e gerencia a instância do mapa (MapLibre).',
  },
  {
    name: 'Marker',
    selector: 'ng-marker',
    description: 'Marcador com popup, tooltip e ícone.',
  },
  {
    name: 'Route',
    selector: 'ng-route',
    description: 'Linha/rota com coordenadas e paradas.',
  },
  {
    name: 'Route Planning',
    selector: 'ng-route-planning',
    description: 'Planejamento de rotas com OSRM.',
  },
  {
    name: 'Map Controls',
    selector: 'ng-map-controls',
    description: 'Agrupa zoom, bússola, localizar e tela cheia.',
  },
  {
    name: 'Zoom / Compass / Locate / Fullscreen',
    selector: 'ng-zoom-control, etc.',
    description: 'Controles individuais posicionáveis.',
  },
] as const;
