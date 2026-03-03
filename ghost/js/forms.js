/**
 * forms.js — Contact form validation and mailto: fallback submission
 */

function initForms() {
  var forms = document.querySelectorAll('[data-contact-form]');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit(form);
    });
  });
}

function handleSubmit(form) {
  // Check honeypot
  var honeypot = form.querySelector('[data-honeypot]');
  if (honeypot && honeypot.value) return;

  // Clear previous errors
  form.querySelectorAll('.form-group').forEach(function (group) {
    group.classList.remove('has-error');
  });

  // Validate
  var errors = validate(form);

  if (errors.length > 0) {
    errors.forEach(function (error) {
      var group = error.element.closest('.form-group');
      if (group) {
        group.classList.add('has-error');
        var msg = group.querySelector('.error-message');
        if (msg) msg.textContent = error.message;
      }
    });
    // Focus first error
    errors[0].element.focus();
    return;
  }

  // Gather form data
  var name = form.querySelector('[name="name"]');
  var email = form.querySelector('[name="email"]');
  var phone = form.querySelector('[name="phone"]');
  var message = form.querySelector('[name="message"]');

  // Build mailto link
  var businessEmail = '';
  if (window.siteData && window.siteData.business) {
    businessEmail = window.siteData.business.email || '';
  }

  var subject = 'Contact from ' + (name ? name.value : 'Website');
  var body = '';
  if (name) body += 'Name: ' + name.value + '\n';
  if (email) body += 'Email: ' + email.value + '\n';
  if (phone && phone.value) body += 'Phone: ' + phone.value + '\n';
  if (message) body += '\nMessage:\n' + message.value;

  var mailtoLink = 'mailto:' + encodeURIComponent(businessEmail) +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);

  window.location.href = mailtoLink;

  // Show success state
  var successEl = form.parentElement.querySelector('.form-success');
  if (successEl) {
    form.style.display = 'none';
    successEl.classList.add('is-visible');
  }

  form.reset();
}

function validate(form) {
  var errors = [];

  // Required fields
  form.querySelectorAll('[required]').forEach(function (field) {
    if (!field.value.trim()) {
      errors.push({
        element: field,
        message: 'This field is required'
      });
    }
  });

  // Email validation
  form.querySelectorAll('[type="email"]').forEach(function (field) {
    if (field.value.trim() && !isValidEmail(field.value)) {
      errors.push({
        element: field,
        message: 'Please enter a valid email address'
      });
    }
  });

  return errors;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export { initForms };
