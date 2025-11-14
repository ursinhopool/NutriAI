import React, { useState, useEffect } from "react";

function Tab({ label, id, active, onClick }) {
  const sel = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`px-3 py-1 rounded-lg font-medium ${sel ? "bg-slate-800 text-white" : "bg-transparent"}`}
      aria-pressed={sel}
      type="button"
    >
      {label}
    </button>
  );
}

function InicioPanel() {
  const [form, setForm] = useState({
    nome: "",
    sexo: "",
    sexo_outro: "",
    altura: "",
    peso: "",
    idade: "",
    alergia: "",
    nao_gosta: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const idadeNum = Number(form.idade);
    if (!form.nome.trim() || Number.isNaN(idadeNum) || idadeNum < 0) {
      alert("Preencha corretamente o nome e idade (idade não pode ser negativa).");
      return;
    }
    alert(`Questionário enviado. Obrigado, ${form.nome}!`);
    setForm({ nome: "", sexo: "", sexo_outro: "", altura: "", peso: "", idade: "", alergia: "", nao_gosta: "" });
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col items-center">
        <img src="/logo_nutri.png" alt="NutriAI" className="w-48 mb-4" />
        <h2 className="text-xl font-semibold mb-4">Assistente Nutricional Inteligente</h2>
        <p className="text-center text-slate-700 mb-6">Responda o questionário para que possamos entender melhor seu perfil nutricional.</p>

        <form className="grid gap-4 w-full max-w-md" onSubmit={handleSubmit}>
          <input name="nome" value={form.nome} onChange={handleChange} type="text" placeholder="Nome completo" className="border rounded-lg px-4 py-2" required />

          <label className="text-sm text-slate-600">Sexo</label>
          <select name="sexo" value={form.sexo} onChange={handleChange} className="border rounded-lg px-4 py-2" required>
            <option value="" disabled>Selecione seu sexo</option>
            <option value="Homem">Homem</option>
            <option value="Mulher">Mulher</option>
            <option value="Outro">Outro (especifique abaixo)</option>
          </select>

          {form.sexo === "Outro" && (
            <input name="sexo_outro" value={form.sexo_outro} onChange={handleChange} type="text" placeholder="Especifique seu gênero" className="border rounded-lg px-4 py-2" />
          )}

          <input name="altura" value={form.altura} onChange={handleChange} type="text" placeholder="Altura (em cm)" className="border rounded-lg px-4 py-2" required />
          <input name="peso" value={form.peso} onChange={handleChange} type="text" placeholder="Peso (em kg)" className="border rounded-lg px-4 py-2" required />

          <input name="idade" value={form.idade} onChange={handleChange} type="number" min="0" placeholder="Idade" className="border rounded-lg px-4 py-2" required />

          <input name="alergia" value={form.alergia} onChange={handleChange} type="text" placeholder="Alérgico a algum alimento?" className="border rounded-lg px-4 py-2" />
          <input name="nao_gosta" value={form.nao_gosta} onChange={handleChange} type="text" placeholder="Alimento que não gosta" className="border rounded-lg px-4 py-2" />

          <div className="flex justify-end">
            <button type="submit" className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700">Enviar Questionário</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DuvidasPanel() {
  const perguntas = [
    "Qual é a quantidade ideal de proteína por dia?",
    "Devo evitar carboidratos à noite?",
    "Como calcular meu IMC corretamente?",
    "Quantas refeições devo fazer por dia?",
    "Quais alimentos ajudam no ganho de massa muscular?",
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Dúvidas Frequentes</h2>
      <ul className="space-y-3">
        {perguntas.map((p, i) => (
          <li key={i} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">{p}</li>
        ))}
      </ul>
    </div>
  );
}

function ProgressoPanel() {
  const [calorias, setCalorias] = useState("");
  const [exercicio, setExercicio] = useState("");
  const [registros, setRegistros] = useState(() => {
    try {
      const raw = localStorage.getItem("nutri_registros");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [mostrarRegistros, setMostrarRegistros] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("nutri_registros", JSON.stringify(registros));
    } catch (e) {}
  }, [registros]);

  function handleAddRegistro(e) {
    e.preventDefault();
    const kcal = Number(calorias);
    if (Number.isNaN(kcal) || kcal < 0 || !exercicio.trim()) {
      alert("Por favor, insira um valor válido de calorias e descreva o exercício.");
      return;
    }

    const novoRegistro = {
      id: Date.now().toString(),
      calorias: kcal,
      exercicio: exercicio.trim(),
      data: new Date().toISOString(),
    };

    setRegistros((prev) => [...prev, novoRegistro]);
    setCalorias("");
    setExercicio("");
  }

  function handleRemover(id) {
    setRegistros((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 text-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-center">Registro de Progresso Diário</h2>
      <form onSubmit={handleAddRegistro} className="grid gap-4 max-w-md mx-auto">
        <input type="number" placeholder="Calorias perdidas hoje (kcal)" value={calorias} onChange={(e) => setCalorias(e.target.value)} className="border rounded-lg px-4 py-2" min="0" required />
        <input type="text" placeholder="Exercícios realizados" value={exercicio} onChange={(e) => setExercicio(e.target.value)} className="border rounded-lg px-4 py-2" required />
        <div className="flex justify-end">
          <button type="submit" className="bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700">Adicionar Registro</button>
        </div>
      </form>

      <div className="text-center mt-6">
        <button onClick={() => setMostrarRegistros((s) => !s)} className="text-slate-800 font-medium hover:underline" type="button">
          {mostrarRegistros ? "Ocultar Registros" : "Ver Registros"}
        </button>
      </div>

      {mostrarRegistros && (
        <div className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-3 text-center">Seus Registros</h3>
          {registros.length === 0 ? (
            <p className="text-center text-slate-500">Nenhum registro adicionado ainda.</p>
          ) : (
            <ul className="space-y-3">
              {registros.map((r) => (
                <li key={r.id} className="border rounded-lg p-3 shadow-sm bg-slate-50">
                  <p><strong>Data:</strong> {new Date(r.data).toLocaleString()}</p>
                  <p><strong>Calorias:</strong> {r.calorias} kcal</p>
                  <p><strong>Exercício:</strong> {r.exercicio}</p>
                  <div className="flex justify-end mt-2"><button onClick={() => handleRemover(r.id)} className="text-red-600">Remover</button></div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function InformacoesPanel() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Informações Importantes</h2>
      <p className="text-slate-700 mb-2">O NutriAI é um assistente criado para auxiliar no acompanhamento nutricional, oferecendo orientações gerais sobre hábitos saudáveis.</p>
      <p className="text-slate-700">As informações aqui fornecidas são educativas e não substituem a consulta com um nutricionista ou profissional de saúde.</p>
    </div>
  );
}

function NutricionistaPanel() {
  const [expandedId, setExpandedId] = useState(null);

  const nutricionistas = [
    { id: 1, nome: "Dra. Ana Paula Lima", especialidade: "Nutrição Esportiva", contato: "ana.lima@nutriai.com", descricao: "Especialista em desempenho atlético e dietas personalizadas.", foto: "" },
    { id: 2, nome: "Dr. Carlos Souza", especialidade: "Nutrição Clínica", contato: "carlos.souza@nutriai.com", descricao: "Foco em reeducação alimentar e acompanhamento de doenças metabólicas.", foto: "" },
    { id: 3, nome: "Dra. Beatriz Mendes", especialidade: "Nutrição Funcional", contato: "beatriz.mendes@nutriai.com", descricao: "Atuação em equilíbrio hormonal e saúde intestinal.", foto: "" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6">Nutricionistas Cadastrados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {nutricionistas.map((n) => (
          <div key={n.id} className="border rounded-2xl shadow-sm p-4 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-slate-100 overflow-hidden mb-3 flex items-center justify-center">
              {n.foto ? <img src={n.foto} alt={n.nome} className="w-full h-full object-cover" /> : <span className="text-slate-500">{n.nome.split(" ")[0]}</span>}
            </div>
            <h3 className="text-lg font-semibold">{n.nome}</h3>
            <p className="text-slate-600 text-sm">{n.especialidade}</p>

            {expandedId === n.id ? (
              <>
                <p className="text-slate-700 text-sm mt-3">{n.descricao}</p>
                <p className="text-slate-700 text-sm mt-1 font-medium">Contato: {n.contato}</p>
                <button onClick={() => setExpandedId(null)} className="mt-3 text-slate-800 font-medium hover:underline">Mostrar menos</button>
              </>
            ) : (
              <button onClick={() => setExpandedId(n.id)} className="mt-3 text-slate-800 font-medium hover:underline">Ler mais</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DietaPanel() {
  const pratos = [
    { id: 1, nome: "Omelete Proteico", ingredientes: "3 ovos, 1 colher de queijo cottage, espinafre, sal e pimenta.", preparo: "Bata os ovos, misture os ingredientes e cozinhe em fogo médio até dourar." },
    { id: 2, nome: "Frango Grelhado com Legumes", ingredientes: "150g de frango, brócolis, cenoura, azeite, sal e alho.", preparo: "Grelhe o frango e refogue os legumes no azeite com alho." },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold mb-4 text-xl">Sugestões de Dieta</h3>
      <div className="grid gap-4">
        {pratos.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-lg">{p.nome}</h4>
            <p className="text-slate-700 mt-2"><strong>Ingredientes:</strong> {p.ingredientes}</p>
            <p className="text-slate-700 mt-1"><strong>Modo de preparo:</strong> {p.preparo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [activeTab, setActiveTab] = useState("inicio");

  useEffect(() => {
    try {
      const logged = localStorage.getItem("nutri_logged_in");
      if (logged === "true") setIsLoggedIn(true);
    } catch (e) {}
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("nutri_logged_in", "true");
      setIsLoggedIn(true);
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

  function handlePasswordReset(e) {
    e.preventDefault();
    if (resetEmail) {
      alert(`Um link de recuperação foi enviado para ${resetEmail}`);
      setResetEmail("");
      setResetMode(false);
    } else {
      alert("Digite seu e-mail para recuperar a senha.");
    }
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center md:flex-row md:justify-between">
            <h1 className="text-lg font-semibold mb-2 md:mb-0 text-center">NutriAI — Painel</h1>
            <nav className="flex flex-wrap gap-2 justify-center">
              <Tab label="Início" id="inicio" active={activeTab} onClick={setActiveTab} />
              <Tab label="Dúvidas" id="duvidas" active={activeTab} onClick={setActiveTab} />
              <Tab label="Progresso" id="progresso" active={activeTab} onClick={setActiveTab} />
              <Tab label="Informações" id="informacoes" active={activeTab} onClick={setActiveTab} />
              <Tab label="Nutricionista" id="nutricionista" active={activeTab} onClick={setActiveTab} />
              <Tab label="Dieta" id="dieta" active={activeTab} onClick={setActiveTab} />
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4">
          {activeTab === "inicio" && <InicioPanel />}
          {activeTab === "duvidas" && <DuvidasPanel />}
          {activeTab === "progresso" && <ProgressoPanel />}
          {activeTab === "informacoes" && <InformacoesPanel />}
          {activeTab === "nutricionista" && <NutricionistaPanel />}
          {activeTab === "dieta" && <DietaPanel />}
        </main>

        <footer className="max-w-6xl mx-auto p-4 text-sm text-slate-600">
          <div className="flex justify-between">
            <div>© {new Date().getFullYear()} NutriAI</div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {!resetMode ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">NutriAI — Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg px-4 py-2" required />
              <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-lg px-4 py-2" required />
              <button type="submit" className="bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700">Entrar</button>
            </form>
            <p className="text-center text-sm text-slate-600 mt-4">
              <button onClick={() => setResetMode(true)} className="text-slate-800 font-medium hover:underline">Esqueceu sua senha?</button>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Recuperar Senha</h1>
            <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
              <input type="email" placeholder="Digite seu e-mail" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="border rounded-lg px-4 py-2" required />
              <button type="submit" className="bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700">Enviar Link de Recuperação</button>
              <button type="button" onClick={() => setResetMode(false)} className="text-slate-700 hover:underline">Voltar ao login</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
