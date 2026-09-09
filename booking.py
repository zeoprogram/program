@router.get("/track", response_model=list[Booking])
async def track_bookings(q: str = Query(min_length=2, max_length=100)):
    ).sort("created_at", -1).to_list(20)
    return [Booking(**document) for document in documents]


@router.get("/meta", response_model=MetaResponse)
async def get_booking_meta():
    return MetaResponse(today=today_iso("Asia/Jakarta"), workshop_name="Haryadi Garage")


@router.get("/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking tidak ditemukan")
    document = await db.bookings.find_one({"id": booking_id})
    return Booking(**document)
  

@router.get("/meta", response_model=MetaResponse)
async def get_booking_meta():
    return MetaResponse(today=today_iso("Asia/Jakarta"), workshop_name="Haryadi Garage")
