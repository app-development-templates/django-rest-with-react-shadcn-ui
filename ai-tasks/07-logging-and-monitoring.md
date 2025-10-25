# Task: Establish Logging and Monitoring

## Goal
Provide operational visibility for the Django backend in production.

## Prerequisites
- Access to organization observability tooling (e.g., CloudWatch, ELK, Sentry, Datadog).

## Steps
1. **Structured Logging**
   - Update Django `LOGGING` settings to emit JSON-formatted logs to stdout for container collection.
   - Ensure Gunicorn access logs are enabled and forwarded to the same sink.
2. **Error Tracking**
   - Integrate an APM/error tracking SDK (e.g., Sentry) with DSN pulled from environment variables.
   - Verify PII scrubbing and sampling rate configurations.
3. **Health Checks**
   - Implement a lightweight health-check endpoint or rely on ASGI lifespan pings.
   - Configure the hosting platform to poll health and restart unhealthy pods/containers.
4. **Metrics and Alerts**
   - Emit key metrics (request throughput, latency, error rate) either via middleware or infrastructure-level monitoring.
   - Define alert thresholds and on-call routing before launch.
