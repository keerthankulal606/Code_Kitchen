    const checkIn = document.querySelector("#check-in");
    const checkOut = document.querySelector("#check-out");
    const bookingForm = document.querySelector("#booking");
    const notice = document.querySelector("#booking-notice");

    function localDateString(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    const today = new Date();
    checkIn.min = localDateString(today);
    checkOut.min = localDateString(today);

    checkIn.addEventListener("change", () => {
      checkOut.min = checkIn.value || localDateString(new Date());
      if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
      }
    });

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;

      if (checkOut.value <= checkIn.value) {
        checkOut.setCustomValidity("Check-out must be after check-in.");
        checkOut.reportValidity();
        checkOut.setCustomValidity("");
        return;
      }

      const guests = document.querySelector("#guests").value;
      const room = document.querySelector("#room-type");
      const roomName = room.options[room.selectedIndex].text.toLowerCase();
      notice.textContent = `Thanks for choosing The Haven! Your ${roomName} search for ${guests} guest${guests === "1" ? "" : "s"} is ready. Our team will help you confirm your dates.`;
      notice.hidden = false;
      window.setTimeout(() => { notice.hidden = true; }, 6000);
    });
