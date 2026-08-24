from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from API.routes import auth_routes, health_routes, prediction_routes, support_routes

app = FastAPI(
    title="AI Medical Diagnosis Decision-Support API",
    version="1.0.0",
    description=(
        "Academic decision-support prototype using local scikit-learn artifacts. "
        "Its outputs are preliminary assessments, not confirmed medical diagnoses."
    ),
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_routes.router)
app.include_router(prediction_routes.router)
app.include_router(support_routes.router)
app.include_router(health_routes.router)
