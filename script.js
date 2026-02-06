// Script principale per Hotel Arezzo
// Funzionalità: toggle nav mobile, gestione pulsanti "Prenota", validazione form, anno footer

document.addEventListener('DOMContentLoaded', function(){
  // Inserisce l'anno corrente nel footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle nav mobile
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', ()=>{
    if(nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  // Scroll fluido offset (se si usa header fisso) - calcola offset e scrolla
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      if(!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if(target){
        e.preventDefault();
        const yOffset = -70; // offset per header
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });

  // Pulsante rapido "Prenota ora" in header
  const bookNowTop = document.getElementById('bookNowTop');
  if(bookNowTop){
    bookNowTop.addEventListener('click', ()=>{
      const booking = document.getElementById('booking');
      if(booking) booking.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }

  // Booking form submission to email (mailto)
  const bookingForm = document.getElementById('bookingForm');
  if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(bookingForm);
      // Basic validation
      const required = ['first_name','last_name','email','arrival','departure','room_type','treatment'];
      for(const key of required){
        const val = formData.get(key);
        if(!val || (typeof val === 'string' && val.trim() === '')){
          alert('Per favore compila tutti i campi obbligatori.');
          return;
        }
      }

      // Destination email configurable via data attribute on the form
      const dest = bookingForm.dataset.bookingEmail || '';
      if(!dest){
        alert('Email di destinazione non configurata. Modifica data-booking-email nel form.');
        return;
      }

      const subject = `Richiesta prenotazione - ${formData.get('first_name')} ${formData.get('last_name')}`;
      let body = '';
      body += `Nome: ${formData.get('first_name')}\n`;
      body += `Cognome: ${formData.get('last_name')}\n`;
      body += `Email: ${formData.get('email')}\n`;
      body += `Telefono: ${formData.get('phone') || ''}\n`;
      body += `Arrivo: ${formData.get('arrival')}\n`;
      body += `Partenza: ${formData.get('departure')}\n`;
      body += `Adulti: ${formData.get('adults')}\n`;
      body += `Bambini: ${formData.get('children')}\n`;
      body += `Tipologia: ${formData.get('room_type')}\n`;
      body += `Trattamento: ${formData.get('treatment')}\n`;
      body += `Messaggio: ${formData.get('message') || ''}\n`;

      const mailto = `mailto:${encodeURIComponent(dest)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      // Open mail client
      window.location.href = mailto;
      bookingForm.reset();
    });
  }

  // Contact form basic validation
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const form = new FormData(contactForm);
      if(!form.get('name') || !form.get('email') || !form.get('message')){
        alert('Compila tutti i campi del modulo di contatto.');
        return;
      }
      alert('Messaggio inviato. Grazie per averci contattato.');
      contactForm.reset();
    });
  }
});