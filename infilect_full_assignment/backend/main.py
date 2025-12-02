from fastapi import FastAPI
import random, time

app = FastAPI()
counter = 0

@app.get("/metrics")
def get_metrics():
    global counter
    counter += 1
    return {
        "cpu_usage": round(random.uniform(10, 90), 2),
        "latency_ms": round(random.uniform(50, 300), 2),
        "memory_usage": round(random.uniform(20, 80), 2),
        "request_count": counter,
        "timestamp": time.time()
    }
