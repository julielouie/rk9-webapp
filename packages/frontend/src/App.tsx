import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { SWRFetcher } from './dataServices/SWRFetcher';
import basename from './dataServices/Basename';
import { Layout } from './components/Layout';
import ErrorBoundary from './components/Error/ErrorBoundary';
import NotFound from './components/Error/NotFound';
import IndexRedirect from './components/utils/IndexRedirect';
import DelayedSpinner from './components/utils/DelayedSpinner';
import ScrollToTop from './components/utils/ScrollToTop';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router basename={`${basename}`}>
      <Suspense fallback={<DelayedSpinner delay={2000} />}>
        <SWRConfig
          value={{
            fetcher: SWRFetcher,
            revalidateOnFocus: false,
          }}
        >
          <Layout>
            <ErrorBoundary>
              <ScrollToTop showBelow={250} />
              <Switch>
                <Route exact path="/" component={IndexRedirect} />
                <Route exact path="/home" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </ErrorBoundary>
          </Layout>
        </SWRConfig>
      </Suspense>
    </Router>
  );
};

export default App;
