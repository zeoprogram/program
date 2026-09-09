import asyncio
from datetime import datetime, timezone

from lib.db import db, ensure_indexes


SEED_BOOKINGS = [
    {
        "id": "demo-booking-01",
        "code": "HG-2026-DEMO01",
        "customer_name": "Raka Pratama",
        "whatsapp": "081234567890",
        "vehicle_category": "Motor",
        "vehicle_type": "Matic Besar / Sport",
        "vehicle_model": "Yamaha NMAX 2023",
        "plate_number": "B 4821 KZZ",
        "service_location": "workshop",
        "services": ["Paint Correction 2-Step", "Ceramic Coating 9H+"],
        "preferred_date": "2026-08-20",
        "time_slot": "09:00 - 11:00",
        "address": None,
        "notes": "Fokus pada baret halus tangki dan panel samping.",
        "estimated_total": 1325000,
        "status": "in_progress",
    },
    {
        "id": "demo-booking-02",
        "code": "HG-2026-DEMO02",
        "customer_name": "Maya Sari",
        "whatsapp": "081298765432",
        "vehicle_category": "Mobil",
        "vehicle_type": "SUV / MPV",
        "vehicle_model": "Toyota Fortuner",
        "plate_number": "B 1092 RFL",
        "service_location": "home_service",
        "services": ["Wet Gloss Finish", "Engine Deep Degreaser"],
        "preferred_date": "2026-08-20",
        "time_slot": "13:00 - 15:00",
        "address": "Komplek Bintaro Jaya sektor 5",
        "notes": None,
        "estimated_total": 775000,
        "status": "confirmed",
    },
    {
        "id": "demo-booking-03",
        "code": "HG-2026-DEMO03",
        "customer_name": "Dimas Wicaksono",
        "whatsapp": "082112223333",
        "vehicle_category": "Helm",
        "vehicle_type": "Full Face",
        "vehicle_model": "Shoei X-Spirit",
        "plate_number": "-",
        "service_location": "workshop",
        "services": ["Helmet Spa"],
        "preferred_date": "2026-08-19",
        "time_slot": "15:00 - 16:00",
        "address": None,
        "notes": None,
        "estimated_total": 150000,
        "status": "completed",
    },
]


async def main() -> None:
    now = datetime.now(timezone.utc)
    for item in SEED_BOOKINGS:
        item["created_at"] = now
        item["updated_at"] = now
        await db.bookings.update_one({"id": item["id"]}, {"$setOnInsert": item}, upsert=True)
    await ensure_indexes()
    print("Seeded Haryadi Garage demo bookings")


if __name__ == "__main__":
    asyncio.run(main())
