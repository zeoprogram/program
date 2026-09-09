@api_router.get("/meta")
async def api_meta():
    return {"today": "", "workshop_name": "Haryadi Garage"}


api_router.include_router(bookings_router
