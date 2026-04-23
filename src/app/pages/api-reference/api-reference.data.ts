export interface ApiProp {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

export interface ApiSection {
  id: string;
  title: string;
  type: 'component' | 'interface';
  selector?: string;
  description: string;
  inputs?: ApiProp[];
  outputs?: ApiProp[];
  properties?: ApiProp[];
  codeExample?: string;
}

export const API_SECTIONS: ApiSection[] = [
  {
    id: 'ng-map',
    title: 'MapComponent',
    type: 'component',
    selector: 'ng-map',
    description:
      'Componente principal do mapa. Renderiza um mapa MapLibre GL e expõe eventos de ciclo de vida e interação. Todos os outros componentes filhos (markers, rotas, controles) se coordenam com ele via mapId.',
    inputs: [
      { name: 'config', type: 'MapConfig', description: 'Objeto de configuração agregado. Alternativa a passar cada input individualmente.' },
      { name: 'center', type: '[number, number]', default: '[0, 0]', description: 'Coordenadas iniciais do centro do mapa [lng, lat].' },
      { name: 'zoom', type: 'number', default: '2', description: 'Nível de zoom inicial (0–22).' },
      { name: 'styles', type: 'MapStylesConfig', description: 'Estilos customizados por tema (light / dark).' },
      { name: 'projection', type: 'ProjectionSpecification', description: "Projeção do mapa (ex: { type: 'globe' })." },
      { name: 'theme', type: "'light' | 'dark' | 'auto'", default: "'auto'", description: "Tema do mapa. 'auto' sincroniza com o atributo data-theme do <html>." },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'Identificador único. Necessário quando há múltiplos mapas na mesma página.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Exibe um estado de carregamento sobre o mapa.' },
      { name: 'viewport', type: 'Partial<MapViewport>', description: 'Controla o viewport programaticamente (centro, zoom, bearing, pitch).' },
    ],
    outputs: [
      { name: 'mapReady', type: 'Map', description: 'Emitido quando o mapa e o estilo terminam de carregar. Retorna a instância nativa MapLibre.' },
      { name: 'viewportChange', type: 'MapViewport', description: 'Emitido a cada movimento do mapa ({ center, zoom, bearing, pitch }).' },
      { name: 'mapClick', type: 'MapMouseEvent', description: 'Emitido ao clicar no mapa.' },
      { name: 'mapError', type: 'Error', description: 'Emitido quando o mapa falha ao inicializar ou ao carregar o estilo.' },
    ],
    codeExample: `<ng-map
  [center]="[-43.1729, -22.9068]"
  [zoom]="12"
  theme="auto"
  mapId="main-map"
  (mapReady)="onMapReady($event)"
  (mapClick)="onMapClick($event)"
  (viewportChange)="onViewportChange($event)"
>
  <ng-map-controls [showZoom]="true" [showCompass]="true" />
</ng-map>`,
  },

  {
    id: 'ng-marker',
    title: 'MarkerComponent',
    type: 'component',
    selector: 'ng-marker',
    description:
      'Adiciona um marcador declarativo ao mapa. Reage automaticamente a mudanças no config. Pode exibir popup, tooltip, ícone customizado e aceita arrastar.',
    inputs: [
      { name: 'config', type: 'MarkerConfig', required: true, description: 'Configuração completa do marcador (posição, ícone, popup, tooltip, etc.).' },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'ID do mapa pai onde o marcador será renderizado.' },
    ],
    outputs: [
      { name: 'markerClick', type: 'MapMouseEvent', description: 'Emitido ao clicar no marcador.' },
      { name: 'markerHover', type: 'MapMouseEvent', description: 'Emitido ao passar o mouse sobre o marcador.' },
    ],
    codeExample: `<ng-map [center]="[-43.1729, -22.9068]" [zoom]="12">
  <ng-marker
    [config]="{
      id: 'marker-1',
      position: [-43.1729, -22.9068],
      color: '#3b82f6',
      size: 'medium',
      popup: { title: 'Rio de Janeiro', content: 'Cidade Maravilhosa' },
      tooltip: { text: 'Rio de Janeiro' }
    }"
    (markerClick)="onMarkerClick($event)"
  />
</ng-map>`,
  },

  {
    id: 'ng-route',
    title: 'RouteComponent',
    type: 'component',
    selector: 'ng-route',
    description:
      'Desenha uma linha/rota GeoJSON no mapa. Suporta estilo customizado (cor, largura, tracejado), marcadores de parada numerados e atualiza propriedades visuais sem recriar a camada.',
    inputs: [
      { name: 'config', type: 'RouteConfig', required: true, description: 'Configuração da rota (coordenadas, cor, largura, paradas, etc.).' },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'ID do mapa pai.' },
    ],
    outputs: [
      { name: 'routeClick', type: 'RouteClickEvent', description: 'Emitido ao clicar sobre a linha da rota. Contém o evento MapLibre e o config da rota.' },
    ],
    codeExample: `<ng-map [center]="[-43.18, -22.91]" [zoom]="13">
  <ng-route
    [config]="{
      id: 'route-1',
      coordinates: [[-43.18, -22.91], [-43.17, -22.90], [-43.16, -22.89]],
      color: '#ef4444',
      width: 4,
      dashed: false,
      showStopMarkers: true,
      stops: [
        { position: [-43.18, -22.91], label: 'Origem' },
        { position: [-43.16, -22.89], label: 'Destino' }
      ]
    }"
    (routeClick)="onRouteClick($event)"
  />
</ng-map>`,
  },

  {
    id: 'ng-map-controls',
    title: 'MapControlsComponent',
    type: 'component',
    selector: 'ng-map-controls',
    description:
      'Adiciona controles nativos ao mapa (zoom, bússola, geolocalização, tela cheia). Pode ser usado dentro de <ng-map> (contexto automático via DI) ou fora (informando mapId).',
    inputs: [
      { name: 'position', type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", default: "'top-right'", description: 'Posição dos controles no mapa.' },
      { name: 'showZoom', type: 'boolean', default: 'true', description: 'Exibe botões de zoom in/out.' },
      { name: 'showCompass', type: 'boolean', default: 'false', description: 'Exibe a bússola (reseta bearing e pitch ao clicar).' },
      { name: 'showLocate', type: 'boolean', default: 'false', description: 'Exibe botão de geolocalização (voa para a posição atual do usuário).' },
      { name: 'showFullscreen', type: 'boolean', default: 'false', description: 'Exibe botão de tela cheia.' },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'ID do mapa. Necessário apenas quando usado fora de <ng-map>.' },
    ],
    codeExample: `<!-- Dentro de <ng-map> — mapId é resolvido automaticamente por DI -->
<ng-map [center]="[-43.1729, -22.9068]" [zoom]="12">
  <ng-map-controls
    position="top-right"
    [showZoom]="true"
    [showCompass]="true"
    [showLocate]="true"
    [showFullscreen]="true"
  />
</ng-map>`,
  },

  {
    id: 'MapConfig',
    title: 'MapConfig',
    type: 'interface',
    description: 'Objeto de configuração completo passado ao MapComponent via o input [config]. Centraliza todas as opções de inicialização do canvas MapLibre.',
    properties: [
      { name: 'center', type: 'LngLatLike', description: 'Centro inicial [lng, lat].' },
      { name: 'zoom', type: 'number', default: '2', description: 'Zoom inicial.' },
      { name: 'minZoom', type: 'number', description: 'Zoom mínimo permitido.' },
      { name: 'maxZoom', type: 'number', description: 'Zoom máximo permitido.' },
      { name: 'styles', type: 'MapStylesConfig', description: 'Estilos por tema (light/dark).' },
      { name: 'projection', type: 'ProjectionSpecification', description: 'Projeção do mapa.' },
      { name: 'pitch', type: 'number', default: '0', description: 'Inclinação em graus (0–60).' },
      { name: 'bearing', type: 'number', default: '0', description: 'Rotação em graus (-180 a 180).' },
      { name: 'doubleClickZoom', type: 'boolean', default: 'true', description: 'Habilita zoom com duplo clique.' },
      { name: 'dragRotate', type: 'boolean', default: 'true', description: 'Habilita rotação com arrastar.' },
      { name: 'dragPan', type: 'boolean', default: 'true', description: 'Habilita pan com arrastar.' },
      { name: 'keyboard', type: 'boolean', default: 'true', description: 'Habilita atalhos de teclado.' },
      { name: 'scrollZoom', type: 'boolean', default: 'true', description: 'Habilita zoom com scroll.' },
      { name: 'touchZoomRotate', type: 'boolean', default: 'true', description: 'Habilita zoom/rotação por toque.' },
      { name: 'boxZoom', type: 'boolean', default: 'true', description: 'Habilita zoom por caixa de seleção.' },
    ],
  },

  {
    id: 'MarkerConfig',
    title: 'MarkerConfig',
    type: 'interface',
    description: 'Configuração completa de um marcador no mapa. Usado pelo componente <ng-marker> e pelo MarkerService.',
    properties: [
      { name: 'position', type: 'LngLatLike', required: true, description: 'Coordenada do marcador [lng, lat].' },
      { name: 'id', type: 'string', description: 'ID único do marcador.' },
      { name: 'icon', type: 'string | HTMLElement', description: 'URL de ícone customizado ou elemento HTML.' },
      { name: 'color', type: 'string', description: 'Cor do marcador padrão (hex, rgb, etc.).' },
      { name: 'size', type: "'small' | 'medium' | 'large'", description: 'Tamanho do marcador padrão.' },
      { name: 'draggable', type: 'boolean', default: 'false', description: 'Torna o marcador arrastável.' },
      { name: 'popup', type: 'PopupConfig', description: 'Configuração do popup ao clicar.' },
      { name: 'tooltip', type: 'TooltipConfig', description: 'Configuração do tooltip ao passar o mouse.' },
      { name: 'className', type: 'string', description: 'Classe CSS customizada.' },
      { name: 'data', type: 'Record<string, unknown>', description: 'Dados arbitrários associados ao marcador.' },
      { name: 'visible', type: 'boolean', default: 'true', description: 'Visibilidade do marcador.' },
      { name: 'rotation', type: 'number', default: '0', description: 'Rotação em graus.' },
      { name: 'scale', type: 'number', default: '1', description: 'Fator de escala.' },
    ],
  },

  {
    id: 'PopupConfig',
    title: 'PopupConfig',
    type: 'interface',
    description: 'Configura o popup anexado a um marcador (balão de informação exibido ao clicar). Segue as MapLibre PopupOptions.',
    properties: [
      { name: 'content', type: 'string', description: 'Conteúdo HTML do popup.' },
      { name: 'title', type: 'string', description: 'Título do popup.' },
      { name: 'closeButton', type: 'boolean', default: 'false', description: 'Exibe botão de fechar.' },
      { name: 'closeOnClick', type: 'boolean', default: 'true', description: 'Fecha ao clicar fora.' },
      { name: 'maxWidth', type: 'string', default: "'none'", description: "Largura máxima (ex: '300px')." },
      { name: 'anchor', type: "'center' | 'top' | 'bottom' | 'left' | 'right' | ...", default: "'bottom'", description: 'Ponto de ancoragem do popup.' },
      { name: 'offset', type: 'Offset', default: '16', description: 'Deslocamento em pixels.' },
      { name: 'focusAfterOpen', type: 'boolean', default: 'true', description: 'Foca o popup ao abrir.' },
    ],
  },

  {
    id: 'TooltipConfig',
    title: 'TooltipConfig',
    type: 'interface',
    description: 'Configura o tooltip de um marcador (hint exibido ao passar o mouse).',
    properties: [
      { name: 'text', type: 'string', required: true, description: 'Texto do tooltip.' },
      { name: 'enabled', type: 'boolean', default: 'true', description: 'Habilita/desabilita o tooltip.' },
      { name: 'showOnHover', type: 'boolean', default: 'true', description: 'Exibe ao passar o mouse.' },
      { name: 'anchor', type: 'string', default: "'bottom'", description: 'Ponto de ancoragem.' },
      { name: 'offset', type: 'Offset', default: '12', description: 'Deslocamento em pixels.' },
    ],
  },

  {
    id: 'RouteConfig',
    title: 'RouteConfig',
    type: 'interface',
    description: 'Configuração de uma rota/path desenhado no mapa. Usado pelo componente <ng-route>.',
    properties: [
      { name: 'coordinates', type: 'LngLatLike[]', required: true, description: 'Array de coordenadas da rota (mínimo 2 pontos).' },
      { name: 'id', type: 'string', description: 'ID único da rota.' },
      { name: 'color', type: 'string', default: "'#3b82f6'", description: 'Cor da linha.' },
      { name: 'width', type: 'number', default: '3', description: 'Largura da linha em pixels.' },
      { name: 'dashed', type: 'boolean', default: 'false', description: 'Linha tracejada.' },
      { name: 'dashArray', type: 'number[]', default: '[2, 2]', description: 'Padrão do tracejado.' },
      { name: 'opacity', type: 'number', default: '1', description: 'Opacidade (0–1).' },
      { name: 'lineCap', type: "'butt' | 'round' | 'square'", default: "'round'", description: 'Estilo das extremidades.' },
      { name: 'lineJoin', type: "'miter' | 'round' | 'bevel'", default: "'round'", description: 'Estilo das junções.' },
      { name: 'stops', type: 'RouteStop[]', description: 'Paradas com marcadores numerados.' },
      { name: 'showStopMarkers', type: 'boolean', description: 'Exibe marcadores nas paradas.' },
      { name: 'selected', type: 'boolean', default: 'false', description: 'Eleva a rota no z-order ao selecionar.' },
      { name: 'data', type: 'Record<string, unknown>', description: 'Dados arbitrários associados à rota.' },
    ],
  },
];
