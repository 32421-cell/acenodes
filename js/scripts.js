document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // Disable navbar animations on homepage
  // ---------------------------
  if (document.body.classList.contains('home')) {
    const navItems = document.querySelectorAll('.nav-links > li');
    navItems.forEach(item => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      item.style.animation = 'none';
    });
  }

  // ---------------------------
  // Plans Page billing cycle buttons
  // ---------------------------
  const billingButtons = document.querySelectorAll(".billing-cycle-selector button");
  const planCards = document.querySelectorAll(".plan-card");

  function updatePrices(months, event) {
    if (event) {
      billingButtons.forEach(btn => btn.classList.remove("active"));
      event.target.classList.add("active");
    }

    planCards.forEach(card => {
      const monthlyPrice = parseFloat(card.dataset.price);
      const totalPrice = (monthlyPrice * months).toFixed(2);
      const priceEl = card.querySelector(".price");

      const perMonth = monthlyPrice.toFixed(2);
      const label = months === 1 ? " / month" : ` / ${months} mo`;

      priceEl.textContent = `$${totalPrice} (${perMonth}/mo${months > 1 ? ` x${months}` : ""})`;
    });
  }

  billingButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const months = parseInt(event.target.textContent);
      updatePrices(months, event);
    });
  });

  updatePrices(1); // Initialize prices on page load

  // ---------------------------
  // Custom Plan price calculator
  // ---------------------------
  const customPlanForm = document.getElementById('custom-plan-form');
  if (customPlanForm) {
    const quoteResult = document.getElementById('quote-result');

    function calculatePrice(ram, slots, cpu, storage, duration) {
      const ramPrice = 3.5; // per GB
      const slotPrice = 0.4; // per player slot
      const cpuPrice = 7; // per core
      const storagePrice = 0.1; // per GB SSD

      let price = (ram * ramPrice) + (slots * slotPrice) + (cpu * cpuPrice) + (storage * storagePrice);

      if (duration === 'yearly') price = price * 12 * 0.85; // 15% discount

      return price.toFixed(2);
    }

    customPlanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ram = parseInt(customPlanForm.ram.value);
      const slots = parseInt(customPlanForm.slots.value);
      const cpu = parseInt(customPlanForm.cpu.value);
      const storage = parseInt(customPlanForm.storage.value);
      const duration = customPlanForm.duration.value;

      if (ram < 1 || slots < 1 || cpu < 1 || storage < 10) {
        quoteResult.textContent = 'Please enter valid values.';
        return;
      }

      const price = calculatePrice(ram, slots, cpu, storage, duration);

      quoteResult.innerHTML = `
        <p>Your custom Minecraft server plan price is:</p>
        <p><strong>$${price} ${duration === 'monthly' ? '/ month' : '/ year'}</strong></p>
        <p><em>Ready to order? Contact our sales team or visit the <a href="contact.html">Contact page</a>.</em></p>
      `;
    });
  }

  // ---------------------------
  // Contact form validation (basic)
  // ---------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.style.color = 'red';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.style.color = 'red';
        return;
      }

      formStatus.textContent = 'Sending message...';

      setTimeout(() => {
        formStatus.textContent = 'Thank you for contacting AceNodes! We will get back to you shortly.';
        formStatus.style.color = 'green';
        contactForm.reset();
      }, 1500);
    });
  }
});
