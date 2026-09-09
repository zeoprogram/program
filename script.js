/* =========================================
   HARYADI GARAGE
   Workshop & Home Detailing
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     CONFIGURATION
  ========================================= */

  const WHATSAPP_NUMBER = "6285771776702";

  /* =========================================
     ELEMENT HELPERS
  ========================================= */

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = $("#menuToggle");
  const navMenu = $("#navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");

      const isOpen = navMenu.classList.contains("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu" : "Buka menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    $$("#navMenu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Buka menu"
        );

        menuToggle.textContent = "☰";
      });
    });
  }

  /* =========================================
     WHATSAPP HELPER
  ========================================= */

  function openWhatsApp(message = "") {
    const encodedMessage = encodeURIComponent(message);

    const url = message
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
      : `https://wa.me/${WHATSAPP_NUMBER}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  /* =========================================
     CURRENCY FORMAT
  ========================================= */

  function formatRupiah(value) {
    const number = Number(value) || 0;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  }

  /* =========================================
     PRICE CALCULATOR
  ========================================= */

  const vehicleSelect = $("#vehicleType");
  const serviceSelect = $("#serviceType");
  const locationSelect = $("#serviceLocation");

  const totalElement = $(".total");

  const breakdownVehicle = $("#breakdownVehicle");
  const breakdownService = $("#breakdownService");
  const breakdownLocation = $("#breakdownLocation");

  /*
    Harga kendaraan
  */

  const vehiclePrices = {
    motor: 0,
    mobil: 75000,
    suv: 125000,
    premium: 200000
  };

  /*
    Harga layanan
  */

  const servicePrices = {
    motor-detailing: 150000,
    car-detailing: 300000,
    helmet-spa: 75000,
    ceramic-coating: 850000
  };

  /*
    Biaya lokasi
  */

  const locationPrices = {
    workshop: 0,
    homeservice: 50000
  };

  function calculatePrice() {
    if (!vehicleSelect || !serviceSelect || !locationSelect) {
      return;
    }

    const vehicleValue = vehicleSelect.value;
    const serviceValue = serviceSelect.value;
    const locationValue = locationSelect.value;

    const vehiclePrice =
      vehiclePrices[vehicleValue] || 0;

    const servicePrice =
      servicePrices[serviceValue] || 0;

    const locationPrice =
      locationPrices[locationValue] || 0;

    const total =
      vehiclePrice +
      servicePrice +
      locationPrice;

    if (totalElement) {
      totalElement.textContent =
        formatRupiah(total);
    }

    if (breakdownVehicle) {
      breakdownVehicle.textContent =
        formatRupiah(vehiclePrice);
    }

    if (breakdownService) {
      breakdownService.textContent =
        formatRupiah(servicePrice);
    }

    if (breakdownLocation) {
      breakdownLocation.textContent =
        formatRupiah(locationPrice);
    }
  }

  [
    vehicleSelect,
    serviceSelect,
    locationSelect
  ].forEach((element) => {
    if (element) {
      element.addEventListener(
        "change",
        calculatePrice
      );
    }
  });

  calculatePrice();

  /* =========================================
     BOOKING DATE
  ========================================= */

  const bookingDate = $("#bookingDate");

  if (bookingDate) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    bookingDate.min =
      `${year}-${month}-${day}`;
  }

  /* =========================================
     BOOKING STORAGE
  ========================================= */

  const STORAGE_KEY =
    "haryadiGarageBookings";

  function getBookings() {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || {};
    } catch (error) {
      console.error(
        "Gagal membaca data booking:",
        error
      );

      return {};
    }
  }

  function saveBooking(booking) {
    const bookings = getBookings();

    bookings[booking.code] = booking;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(bookings)
    );
  }

  /* =========================================
     BOOKING CODE
  ========================================= */

  function generateBookingCode() {
    const year =
      new Date().getFullYear();

    const randomNumber =
      Math.floor(
        100000 +
        Math.random() * 900000
      );

    return `HG-${year}-${randomNumber}`;
  }

  /* =========================================
     TOAST NOTIFICATION
  ========================================= */

  const toast = $("#toast");

  let toastTimer;

  function showToast(message) {
    if (!toast) {
      alert(message);
      return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  /* =========================================
     BOOKING FORM
  ========================================= */

  const bookingForm = $("#bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const formData =
          new FormData(bookingForm);

        const name =
          String(formData.get("name") || "")
            .trim();

        const phone =
          String(formData.get("phone") || "")
            .trim();

        const mode =
          String(formData.get("mode") || "")
            .trim();

        const vehicle =
          String(formData.get("vehicle") || "")
            .trim();

        const vehicleDetail =
          String(
            formData.get("vehicleDetail") || ""
          ).trim();

        const service =
          String(formData.get("service") || "")
            .trim();

        const date =
          String(formData.get("date") || "")
            .trim();

        const time =
          String(formData.get("time") || "")
            .trim();

        const notes =
          String(formData.get("notes") || "")
            .trim();

        if (!name || !phone || !service || !date || !time) {
          showToast(
            "Mohon lengkapi data booking terlebih dahulu."
          );

          return;
        }

        /* ================================
           CREATE BOOKING
        ================================= */

        const code =
          generateBookingCode();

        const booking = {
          code,
          name,
          phone,
          mode,
          vehicle,
          vehicleDetail,
          service,
          date,
          time,
          notes,

          status: "Menunggu Konfirmasi",

          createdAt:
            new Date().toISOString()
        };

        saveBooking(booking);

        /* ================================
           WHATSAPP MESSAGE
        ================================= */

        const message = [
          "Halo Haryadi Garage 👋",
          "",
          "Saya ingin melakukan booking service.",
          "",
          `Kode Booking: ${code}`,
          `Nama: ${name}`,
          `No. WhatsApp: ${phone}`,
          `Mode Service: ${mode}`,
          `Kendaraan: ${vehicle}`,
          `Detail Kendaraan: ${vehicleDetail}`,
          `Layanan: ${service}`,
          `Tanggal: ${date}`,
          `Jam: ${time}`,
          `Catatan: ${notes || "-"}`,
          "",
          "Mohon konfirmasi ketersediaan jadwal saya.",
          "",
          "Terima kasih."
        ].join("\n");

        /* ================================
           SAVE CODE TO TRACKING
        ================================= */

        const trackingInput =
          $("#trackingCode");

        if (trackingInput) {
          trackingInput.value = code;
        }

        /* ================================
           SHOW SUCCESS MESSAGE
        ================================= */

        showToast(
          `Booking berhasil dibuat. Kode booking: ${code}`
        );

        /* ================================
           OPEN WHATSAPP
        ================================= */

        setTimeout(() => {
          openWhatsApp(message);
        }, 700);

        /* ================================
           RESET FORM
        ================================= */

        bookingForm.reset();

        /* Restore today's minimum date */

        if (bookingDate) {
          const today = new Date();

          const year =
            today.getFullYear();

          const month =
            String(
              today.getMonth() + 1
            ).padStart(2, "0");

          const day =
            String(
              today.getDate()
            ).padStart(2, "0");

          bookingDate.min =
            `${year}-${month}-${day}`;
        }

        /* ================================
           KEEP TRACKING CODE
        ================================= */

        if (trackingInput) {
          trackingInput.value = code;
        }
      }
    );
  }

  /* =========================================
     TRACKING BOOKING
  ========================================= */

  const trackingForm =
    $("#trackingForm");

  const trackingCodeInput =
    $("#trackingCode");

  const trackingResult =
    $("#trackingResult");

  function showTrackingResult(
    booking,
    isSuccess = true
  ) {
    if (!trackingResult) {
      return;
    }

    trackingResult.className =
      "tracking-result " +
      (isSuccess ? "success" : "error");

    if (!booking) {
      trackingResult.innerHTML = `
        <strong>Booking tidak ditemukan</strong>
        <span>
          Pastikan kode booking yang Anda masukkan sudah benar.
        </span>
      `;

      return;
    }

    trackingResult.innerHTML = `
      <strong>
        ${booking.status}
      </strong>

      <span>
        Kode: ${booking.code}
      </span>

      <span>
        Nama: ${booking.name}
      </span>

      <span>
        Layanan: ${booking.service}
      </span>

      <span>
        Jadwal: ${booking.date} • ${booking.time}
      </span>

      <span>
        Mode: ${booking.mode}
      </span>
    `;
  }

  if (trackingForm) {
    trackingForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const code =
          String(
            trackingCodeInput?.value || ""
          )
            .trim()
            .toUpperCase();

        if (!code) {
          showToast(
            "Masukkan kode booking terlebih dahulu."
          );

          return;
        }

        const bookings =
          getBookings();

        const booking =
          bookings[code];

        showTrackingResult(
          booking,
          Boolean(booking)
        );

        if (booking) {
          showToast(
            "Booking berhasil ditemukan."
          );
        } else {
          showToast(
            "Kode booking tidak ditemukan."
          );
        }
      }
    );
  }

  /* =========================================
     SERVICE → CALCULATOR SYNC
  ========================================= */

  $$(".service-card").forEach(
    (card) => {
      card.addEventListener(
        "click",
        () => {
          const serviceName =
            card.dataset.service;

          if (
            serviceName &&
            serviceSelect
          ) {
            serviceSelect.value =
              serviceName;

            calculatePrice();

            const calculator =
              $("#calculator");

            if (calculator) {
              calculator.scrollIntoView({
                behavior: "smooth"
              });
            }
          }
        }
      );
    }
  );

  /* =========================================
     BOOKING BUTTONS
  ========================================= */

  $$(
    'a[href="#booking"], button[data-booking]'
  ).forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          const firstInput =
            $("#bookingForm input");

          if (firstInput) {
            firstInput.focus();
          }
        }, 500);
      }
    );
  });

  /* =========================================
     PHONE NUMBER FORMATTING
  ========================================= */

  const phoneInput =
    $("#phone");

  if (phoneInput) {
    phoneInput.addEventListener(
      "input",
      () => {
        let value =
          phoneInput.value.replace(
            /[^0-9+]/g,
            ""
          );

        phoneInput.value = value;
      }
    );
  }

  /* =========================================
     DATE VALIDATION
  ========================================= */

  if (bookingDate) {
    bookingDate.addEventListener(
      "change",
      () => {
        if (
          bookingDate.value &&
          bookingDate.min &&
          bookingDate.value <
            bookingDate.min
        ) {
          bookingDate.value =
            bookingDate.min;

          showToast(
            "Tanggal booking tidak boleh sebelum hari ini."
          );
        }
      }
    );
  }

  /* =========================================
     SMOOTH ANCHOR FALLBACK
  ========================================= */

  $$('a[href^="#"]').forEach(
    (link) => {
      link.addEventListener(
        "click",
        (event) => {
          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      );
    }
  );

  /* =========================================
     WHATSAPP LINKS
  ========================================= */

  $$("[data-whatsapp]").forEach(
    (element) => {
      element.addEventListener(
        "click",
        (event) => {
          event.preventDefault();

          const message =
            element.dataset.whatsapp ||
            "Halo Haryadi Garage, saya ingin bertanya mengenai layanan.";

          openWhatsApp(message);
        }
      );
    }
  );

  /* =========================================
     INTERSECTION ANIMATION
  ========================================= */

  if (
    "IntersectionObserver" in window
  ) {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12
        }
      );

    $$(
      ".service-card, .product-card, .compare-card, .calculator-card, .booking-info, .booking-form-card"
    ).forEach((element) => {
      observer.observe(element);
    });
  }

  /* =========================================
     CONSOLE INFO
  ========================================= */

  console.log(
    "%cHARYADI GARAGE",
    "font-size:20px;font-weight:900;"
  );

  console.log(
    "Workshop & Home Detailing"
  );

  console.log(
    "Booking system initialized."
  );
});
