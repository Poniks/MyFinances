import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  X,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  GraduationCap,
  PartyPopper,
  Heart,
  Banknote,
  Briefcase,
} from "lucide-react";
import styles from "./New_Transaction.module.scss";

const New_Transaction = ({ onAdd }) => {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    amount: "",
    date: getTodayDate(),
    type: "Przychód",
    category: "zakupy",
    description: "",
  });

  const categories = [
    { id: "zakupy", label: "Zakupy", icon: <ShoppingCart size={24} /> },
    { id: "jedzenie", label: "Jedzenie", icon: <Utensils size={24} /> },
    { id: "transport", label: "Transport", icon: <Car size={24} /> },
    { id: "dom", label: "Dom", icon: <Home size={24} /> },
    { id: "edukacja", label: "Edukacja", icon: <GraduationCap size={24} /> },
    { id: "rozrywka", label: "Rozrywka", icon: <PartyPopper size={24} /> },
    { id: "zdrowie", label: "Zdrowie", icon: <Heart size={24} /> },
    { id: "wyplata", label: "Wypłata", icon: <Banknote size={24} /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) return alert("Wpisz kwotę!");

    const categoryIcons = {
      zakupy: ShoppingCart,
      jedzenie: Utensils,
      transport: Car,
      dom: Home,
      edukacja: GraduationCap,
      rozrywka: PartyPopper,
      zdrowie: Heart,
      wyplata: Briefcase,
    };

    const newEntry = {
      id: Date.now(),
      title: formData.description || formData.category,
      amount: Math.abs(Number(formData.amount)),
      icon: categoryIcons[formData.category] || Banknote,
      category: formData.category,
      type: formData.type === "Przychód" ? "income" : "expense",
      date: formData.date,
    };
    console.log("Wysyłam do App:", newEntry);
    onAdd(newEntry); // WYSYŁAMY DANE DO APP.JSX
    navigate("/"); // WRACAMY DO DASHBOARDU
  };

  return (
    <div className={styles.new_transaction_container}>
      <header className={styles.transaction_header}>
        <button
          className={styles.icon_btn}
          onClick={() => window.history.back()}
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <h2>Nowa Transakcja</h2>
        <button
          className={styles.icon_btn}
          onClick={() => window.history.back()}
          type="button"
        >
          <X size={20} />
        </button>
      </header>

      <form className={styles.transaction_form} onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          {/* KAFEL KWOTY */}
          <div className={styles.form_card}>
            <span className={styles.label_text}>Kwota:</span>
            <div className={styles.input_wrapper}>
              <input
                type="number"
                name="amount"
                placeholder="0,00"
                value={formData.amount}
                onChange={handleInputChange}
                className={styles.amount_input}
                required
              />
              <span className={styles.currency}>PLN</span>
            </div>
          </div>

          {/* KAFEL DATY */}
          <div className={styles.form_card} onClick={openDatePicker}>
            <span className={styles.label_text}>Data:</span>
            <input
              type="date"
              name="date"
              ref={dateInputRef}
              value={formData.date}
              onChange={handleInputChange}
              className={styles.date_input}
            />
          </div>
        </div>
        {/* KAFEL TYPU */}
        <div className={styles.type_toggle}>
          <span className={styles.type_label}>Typ:</span>
          <div className={styles.pill_wrapper}>
            {["Przychód", "Wydatek", "Inwestycja"].map((t) => (
              <button
                key={t}
                type="button"
                className={`${formData.type === t ? styles.active_pill : ""} ${t === "Inwestycja" ? styles.disabled_pill : ""}`}
                onClick={() => setFormData({ ...formData, type: t })}
                disabled={t === "Inwestycja"}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {/* KAFEL KATEGORI */}
        <div className={styles.categories_grid}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`${styles.category_item} ${formData.category === cat.id ? styles.is_active : ""}`}
              onClick={() => setFormData({ ...formData, category: cat.id })}
            >
              <div className={styles.icon_circle}>{cat.icon}</div>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>

        <textarea
          name="description"
          className={styles.description_field}
          placeholder="Opis (Opcjonalnie)"
          value={formData.description}
          onChange={handleInputChange}
        />

        <button type="submit" className={styles.submit_button}>
          Zatwierdź
        </button>
      </form>
    </div>
  );
};

export default New_Transaction;
