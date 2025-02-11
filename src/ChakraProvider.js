'use client';

import { ChakraProvider, EnvironmentProvider } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import root from 'react-shadow/emotion';
import { system } from './system';

export function Provider(props) {
  const [shadow, setShadow] = useState(null);
  const [cache, setCache] = useState(null);

  useEffect(() => {
    if (!shadow?.shadowRoot || cache) return;

    const emotionCache = createCache({
      key: 'calendar-widget',
      container: shadow.shadowRoot,
    });
    setCache(emotionCache);
  }, [shadow, cache]);

  return (
    <root.div ref={setShadow}>
      {shadow && cache && (
        <EnvironmentProvider value={() => shadow.shadowRoot ?? document}>
          <CacheProvider value={cache}>
            <ChakraProvider value={system}>
              <ThemeProvider {...props} />
            </ChakraProvider>
          </CacheProvider>
        </EnvironmentProvider>
      )}
    </root.div>
  );
}
