import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Logs errors and displays a fallback UI
 *
 * Best Practice: Wrap your entire app or major sections
 *
 * @example
 * <ErrorBoundary>
 *   <YourApp />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            background: "var(--color-bg-paper)",
          }}>
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              background: "white",
              padding: "2rem",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
              textAlign: "center",
            }}>
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1rem",
              }}>
              🏐
            </div>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-error)",
                marginBottom: "1rem",
                fontSize: "2rem",
              }}>
              Oops! Something went wrong
            </h1>

            <p
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "1.5rem",
                lineHeight: "1.6",
              }}>
              {this.state.error?.message || "An unexpected error occurred"}
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  background: "var(--color-bg-paper)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "left",
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                }}>
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}>
                  Error Details
                </summary>
                <pre
                  style={{
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "var(--color-primary-dark)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-primary)";
                }}>
                Try Again
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "var(--color-secondary)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "var(--color-secondary-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-secondary)";
                }}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
