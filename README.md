# AI-Powered Medical Diagnosis and Healthcare Recommendation System

An academic decision-support prototype that trains and serves local scikit-learn models for diabetes, heart disease, chronic kidney disease, and liver disease. It uses **no external generative-AI API**.

## Safety

Outputs are AI-generated preliminary assessments, not confirmed diagnoses. They require professional verification and must not replace qualified healthcare advice.

## Components

- `AI/`: reproducible cleaning, training, metrics, confusion matrices, persisted `.pkl` pipelines, notebooks, and SHAP contributions.
- `API/`: FastAPI REST service with Pydantic validation, local model loading, JWT authentication, doctor-review status, history, doctors, and data-backed recommendations.
- `Frontend/`: responsive HTML/CSS/JavaScript UI using Fetch API.
- `Database/`: SQL Server / SSMS-compatible schema, index, and source-data seed scripts.
- `Datasets/`: original source files (read-only); `datasets/processed/` contains generated cleaned copies.

## Setup

```powershell
python -m pip install -r requirements.txt
python -m AI.train_models
uvicorn API.app:app --reload
```

Open Swagger at `http://127.0.0.1:8000/docs`. Serve `Frontend/` with a static HTTP server (for example VS Code Live Server) on port 5500.

## Actual training results

See [model_results.json](reports/model_results/model_results.json) for actual held-out metrics. The training process uses a stratified 80/20 split, an imputation/encoding/scaling pipeline, logistic regression and random forest candidates, and selects the higher macro-F1 candidate.

## SQL Server

Execute `Database/full_database.sql` in SSMS with SQLCMD mode enabled, or execute the schema scripts then seed scripts in order.
Set `DATABASE_URL` in a local `.env` file using the SQL Server URL shape in [.env.example](.env.example). When configured, the API uses SQL Server through SQLAlchemy and pyodbc; it does not fall back to in-memory persistence.

### Doctor demonstration account

Public registration always creates a `Patient`; it cannot assign privileged roles. After registering an account, promote it manually in SSMS for the academic demonstration:

```sql
UPDATE dbo.Users
SET Role = N'Doctor'
WHERE Email = N'YOUR_REGISTERED_EMAIL';
```

Only `Doctor` and `Admin` roles can submit `POST /api/doctor-reviews`. Run [002_add_users_role.sql](Database/migrations/002_add_users_role.sql) against an existing database before using role authorization.

## Tests

```powershell
pytest -q
```

Read [clinical safety](docs/project/clinical_safety.md), [privacy](docs/project/privacy.md), [limitations](docs/project/limitations.md), and the [API documentation](docs/api/API_DOCUMENTATION.md) before use.
