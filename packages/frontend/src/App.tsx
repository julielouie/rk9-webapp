import React, { Suspense, useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { SWRFetcher } from './dataServices/SWRFetcher';
import basename from './dataServices/Basename';
import { Layout } from './components/Layout';
import ErrorBoundary from './components/Error/ErrorBoundary';
import NotFound from './components/Error/NotFound';
import IndexRedirect from './components/utils/IndexRedirect';
import DelayedSpinner from './components/utils/DelayedSpinner';
import Home from './components/Home';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Training from './components/Training';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import SingleBlogPost from './components/Blog/SingleBlogPost';
import ClientPortal from './components/ClientPortal';
import Swag from './components/Swag';
import Settings from './components/Settings';
import { SessionContext } from './context/SessionContext';
import ThenAndNow from './components/ThenAndNow';

const App: React.FC = () => {
  const {
    state: { user },
  } = useContext(SessionContext);

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
              <Switch>
                <Route exact path="/" component={IndexRedirect} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/philosophy" component={Philosophy} />
                <Route exact path="/training" component={Training} />
                <Route exact path="/thenAndNow" component={ThenAndNow} />
                <Route exact path="/testimonials" component={Testimonials} />
                <Route exact path="/blog" component={Blog} />
                {user && <Route exact path="/swag" component={Swag} />}
                {user && <Route exact path="/settings" component={Settings} />}
                <Route path="/blog/:id" component={SingleBlogPost} />
                <Route path="/clientPortal" component={ClientPortal} />
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
