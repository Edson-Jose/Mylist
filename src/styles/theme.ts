// Tema Claro (Light Mode)
export const theme = {
  isDark: false,
  colors: {
    backgroundPrimary: '#F4F5F7',
    backgroundSecondary: '#FFFFFF',
    textPrimary: '#172B4D',
    textSecondary: '#5E6C84',
    textLight: '#97A0AF',
    primary: '#0052CC',
    success: '#36B37E',
    warning: '#FFAB00',
    danger: '#FF5630',
    border: '#DFE1E6',
    shadow: 'rgba(9, 30, 66, 0.15)'
  },
  borderRadius: { small: 4, medium: 8, large: 12, round: 50 }
};

// Tema Escuro (Dark Mode - Inspirado no Trello Negro/Notion Dark)
export const darkTheme = {
  isDark: true,
  colors: {
    backgroundPrimary: '#1D2125',   // Fundo escuro principal
    backgroundSecondary: '#22272B', // Fundo dos cards e containers escuros
    textPrimary: '#B6C2CF',         // Texto claro para contraste
    textSecondary: '#9FADBC',       // Texto secundário cinza claro
    textLight: '#738496',
    primary: '#579DFF',             // Azul mais suave para telas escuras
    success: '#4BCE97',
    warning: '#F5CD47',
    danger: '#F87168',
    border: '#30363D',              // Bordas escuras discretas
    shadow: 'rgba(0, 0, 0, 0.5)'
  },
  borderRadius: theme.borderRadius
};