import { Global } from '@emotion/react';
import { useEffect, useState } from 'react';

const darkModePrefLocalStorageKey = '_mlflow_dark_mode_toggle_enabled';
const darkModeBodyClassName = 'dark-mode';

// CSS attributes to be applied when dark mode is enabled. Affects inputs and other form elements.
const darkModeCSSStyles = { body: { [`&.${darkModeBodyClassName}`]: { colorScheme: 'dark' } } };
// This component is used to set the global CSS.
const DarkModeStylesComponent = () => <Global styles={darkModeCSSStyles} />;

/**
 * This hook is used to toggle the dark mode for the entire app.
 * Used in open source MLflow.
 * Returns a boolean value with the current state, setter function, and a component to be rendered in the root of the app.
 */
export const useMLflowDarkTheme = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.ComponentType,
] => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // If the user has explicitly set a preference, use that.
    if (localStorage.getItem(darkModePrefLocalStorageKey) === 'true') {
      return true;
    }
    // Otherwise, use the system preference as a default.
    return window.matchMedia('(prefers-color-scheme: dark)').matches || false;
  });

  useEffect(() => {
    // Update the theme when the user changes their system preference.
    document.body.classList.toggle(darkModeBodyClassName, isDarkTheme);
    // Persist the user's preference in local storage.
    localStorage.setItem(darkModePrefLocalStorageKey, isDarkTheme ? 'true' : 'false');
  }, [isDarkTheme]);

  return [isDarkTheme, setIsDarkTheme, DarkModeStylesComponent];
};
