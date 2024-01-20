import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: {
      background: '#F8F8F8', // Light gray
      text: '#333333', // Dark gray
      accent: '#4CAF50', // Green
      accentHover: '#388E3C', // Darker green
      accentSelected: '#1B5E20', // Darkest green
    },
    secondary: {
      background: '#FFFFFF', // White
      text: '#666666', // Medium gray
      border: '#CCCCCC', // Light gray
      accent: '#2196F3', // Blue
      accentHover: '#1976D2', // Darker blue
      accentSelected: '#0D47A1', // Darkest blue
    },
    action: {
      success: '#4CAF50', // Green
      danger: '#F44336', // Red
      warning: '#FFC107', // Yellow
      info: '#2196F3', // Blue
    },
  },
})

export default theme
