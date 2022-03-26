import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Typography, Grid, AccordionSummary, AccordionDetails, Accordion } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LEVEL_ERROR, LogError } from '../../dataServices/Logger';

interface ErrorBoundaryProps extends RouteComponentProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
  info: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    LogError(LEVEL_ERROR, error, 'ErrorBoundary');
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    const { error, hasError, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '70vh' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* RK9 Logo Here */}
              <Typography variant="h1">Oops...</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Something went wrong. Please let someone know!</Typography>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{error.toString()}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{info.componentStack}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return children;
  }
}

export default withRouter(ErrorBoundary);
