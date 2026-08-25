const RegisterField = ({ label, name, type = "text", value, onChange, placeholder, options }) => {
  if (options) {
    return (
      <label className="casaley-rf__field">
        <span className="casaley-rf__label">{label}</span>
        <select name={name} value={value || ""} onChange={e => onChange(e.target.value)}>
          <option value="" disabled></option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  }
  return (
    <label className="casaley-rf__field">
      <span className="casaley-rf__label">{label}</span>
      <input
        name={name}
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
};

const RegisterForm = ({ open, onOpen, onClose }) => {
  const [data, setData] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const set = (k) => (v) => setData(d => ({ ...d, [k]: v }));

  // TODO: wire to a real endpoint (e.g. POST /api/register or a form service like Formspree)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <button
        type="button"
        className={"casaley-rf__tab" + (open ? " is-hidden" : "")}
        onClick={onOpen}
        aria-label="Open register form"
        aria-expanded={open}
        tabIndex={open ? -1 : 0}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="14 6 8 12 14 18"/>
        </svg>
        <span>Register now</span>
      </button>

      <aside
        className={"casaley-rf" + (open ? " is-open" : "")}
        aria-hidden={!open}
      >
        <div className="casaley-rf__inner">
          <header className="casaley-rf__head">
            <span className="casaley-eyebrow" style={{ color: "rgba(242,226,221,0.85)" }}>
              Register your interest
            </span>
            <button
              type="button"
              className="casaley-rf__close"
              onClick={onClose}
              aria-label="Hide register form"
              tabIndex={open ? 0 : -1}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18"/>
                <line x1="6" y1="18" x2="18" y2="6"/>
              </svg>
            </button>
          </header>

          <h2 className="casaley-rf__title">
            Be among the first<br />to uncover Casaley.
          </h2>

          <form className="casaley-rf__form" onSubmit={handleSubmit}>
            <div className="casaley-rf__row casaley-rf__row--two">
              <RegisterField label="First name" name="first_name" value={data.first} onChange={set("first")} />
              <RegisterField label="Last name"  name="last_name"  value={data.last}  onChange={set("last")} />
            </div>
            <RegisterField label="Email" name="email" type="email" value={data.email} onChange={set("email")} />
            <RegisterField label="Phone" name="phone" type="tel"   value={data.phone} onChange={set("phone")} />
            <div className="casaley-rf__row casaley-rf__row--two">
              <RegisterField label="Postcode"     name="postcode"  value={data.postcode} onChange={set("postcode")} />
              <RegisterField label="Enquiring as" name="enquirer"  value={data.enquirer} onChange={set("enquirer")}
                options={["Builder", "Investor", "Owner occupier", "Buyer's advocate"]} />
            </div>
            <RegisterField label="Product" name="product" value={data.product} onChange={set("product")}
              options={["3 bedroom home", "4 bedroom home", "Not sure"]} />

            <button type="submit" className="casaley-rf__submit">
              {submitted ? "Thank you ✓" : "Submit"}
            </button>
          </form>

          <p className="casaley-rf__legal">
            By registering you agree to receive updates about Casaley Officer.
            View our <a href="./privacy-policy.html">privacy policy</a>.
          </p>
        </div>
      </aside>
    </>
  );
};

window.RegisterForm = RegisterForm;
