# API Documentation

Swagger is available at `/docs`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user and return a JWT |
| POST | `/api/auth/login` | Authenticate and return a JWT |
| POST | `/api/predict/{diabetes,heart,kidney,liver}` | Run a local persisted model |
| GET | `/api/doctors` | Actual workbook-backed doctor list |
| GET | `/api/recommendations` | Actual workbook-backed recommendations |
| GET | `/api/history` | Authenticated user assessment history |
| POST | `/api/doctor-reviews` | Set review status and notes |
| GET | `/api/health` | Service liveness |

Prediction requests use `{ "values": { ...feature fields... }, "include_explanation": true }` and require `Authorization: Bearer <JWT>`. Exact feature names are defined by each persisted pipeline and supplied by the corresponding frontend form.

`/api/doctor-reviews` also requires Bearer authentication. Every configured `DATABASE_URL` uses the SQLAlchemy/pyodbc SQL Server repository; it persists predictions, inputs/explanations, review events, and history. In-memory persistence is only available when `ALLOW_IN_MEMORY_STORE=true` is explicitly set for isolated tests.
