const defaultColors = {
	primary: '#ED8936',
	black: '#000000',
	white: '#FFFFFF',
	'100': '#F7FAFC',
	'200': '#EDF2F7',
	'300': '#E2E8F0',
	'400': '#CBD5E0',
	'500': '#A0AEC0',
	'600': '#718096',
	'700': '#4A5568',
	'800': '#2D3748',
	'900': '#1A202C',
};

const darkColors = {
	primary: '#F6AD55',
	black: defaultColors.white,
	white: defaultColors.black,
	'100': defaultColors[900],
	'200': defaultColors[800],
	'300': defaultColors[700],
	'400': defaultColors[600],
	'500': defaultColors[500],
	'600': defaultColors[400],
	'700': defaultColors[300],
	'800': defaultColors[200],
	'900': defaultColors[100],
};

export const getThemeColor = (color, theme = 'default') => {
	const themeColor = themes[theme][color];
	const fallbackColor = themes.default[color];
	return themeColor || fallbackColor;
};

const themes = {
	default: { ...defaultColors },
	dark: { ...darkColors },
	blue: { ...defaultColors, primary: '#4299E1' },
	'blue-dark': { ...darkColors, primary: '#63B3ED' },
};

export default themes;
