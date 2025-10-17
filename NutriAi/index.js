import React, { useState } from "react";

// Painel principal do NutriAI com nova aba Início
function NutriAIMain() {
  const [activeTab, setActiveTab] = useState("inicio");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center">
          <h1 className="text-lg font-semibold mb-2 text-center">NutriAI — Painel</h1>
          <nav className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab("inicio")}
              className={`px-3 py-1 rounded-lg font-medium ${
                activeTab === "inicio" ? "bg-slate-800 text-white" : "bg-transparent"
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setActiveTab("duvidas")}
              className={`px-3 py-1 rounded-lg font-medium ${
                activeTab === "duvidas" ? "bg-slate-800 text-white" : "bg-transparent"
              }`}
            >
              Dúvidas
            </button>
            <button
              onClick={() => setActiveTab("progresso")}
              className={`px-3 py-1 rounded-lg font-medium ${
                activeTab === "progresso" ? "bg-slate-800 text-white" : "bg-transparent"
              }`}
            >
              Progresso
            </button>
            <button
              onClick={() => setActiveTab("informacoes")}
              className={`px-3 py-1 rounded-lg font-medium ${
                activeTab === "informacoes" ? "bg-slate-800 text-white" : "bg-transparent"
              }`}
            >
              Informações
            </button>
            <button
              onClick={() => setActiveTab("configuracoes")}
              className={`px-3 py-1 rounded-lg font-medium ${
                activeTab === "configuracoes" ? "bg-slate-800 text-white" : "bg-transparent"
              }`}
            >
              Configurações
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {activeTab === "inicio" && <InicioPanel />}
        {activeTab === "duvidas" && <DuvidasPanel />}
        {activeTab === "progresso" && <ProgressoPanel />}
        {activeTab === "informacoes" && <InformacoesPanel />}
        {activeTab === "configuracoes" && <ConfiguracoesPanel />}
      </main>

      <footer className="max-w-6xl mx-auto p-4 text-sm text-slate-600">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} NutriAI</div>
        </div>
      </footer>
    </div>
  );
}

function InicioPanel() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col items-center">
        <img
          src="/logo_nutri.png"
          alt="Assistente nutricional inteligente"
          className="w-48 mb-4"
        />
        <h2 className="text-xl font-semibold mb-6">Assistente Nutricional Inteligente</h2>
        <p className="text-center text-slate-700 mb-6">
          Bem-vindo(a) ao NutriAI! Responda o questionário abaixo para que possamos entender melhor
          seu perfil nutricional e oferecer recomendações personalizadas.
        </p>
        <form className="grid gap-4 w-full max-w-md">
          <input type="email" placeholder="Seu e-mail" className="border rounded-lg px-4 py-2" required />
          <select className="border rounded-lg px-4 py-2" required>
            <option value="" disabled selected>
              Selecione seu sexo
            </option>
            <option value="Homem">Homem</option>
            <option value="Mulher">Mulher</option>
          </select>
          <input type="text" placeholder="Altura (em cm)" className="border rounded-lg px-4 py-2" required />
          <input type="text" placeholder="Peso (em kg)" className="border rounded-lg px-4 py-2" required />
          <input type="number" placeholder="Idade" className="border rounded-lg px-4 py-2" required />
          <input type="text" placeholder="Alérgico a algum alimento?" className="border rounded-lg px-4 py-2" />
          <input type="text" placeholder="Alimento que não gosta" className="border rounded-lg px-4 py-2" />
          <button
            type="submit"
            className="bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700"
          >
            Enviar Questionário
          </button>
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
          <li
            key={i}
            className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressoPanel() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 h-[60vh] flex items-center justify-center text-slate-500">
      <p>Espaço reservado para futuros gráficos e relatórios de progresso nutricional.</p>
    </div>
  );
}

function InformacoesPanel() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Informações Importantes</h2>
      <p className="text-slate-700 mb-2">
        O NutriAI é um assistente criado para auxiliar no acompanhamento nutricional,
        oferecendo orientações gerais sobre hábitos saudáveis.
      </p>
      <p className="text-slate-700">
        Lembre-se: as informações aqui fornecidas são educativas e não substituem a consulta
        com um nutricionista ou profissional de saúde.
      </p>
    </div>
  );
}

function ConfiguracoesPanel() {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  function save() {
    localStorage.setItem("nutri_api_url", apiUrl);
    localStorage.setItem("nutri_api_key", apiKey);
    alert("Configurações salvas localmente (demo).");
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold mb-4">Configurações</h3>
      <div className="grid grid-cols-1 gap-4 max-w-xl">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-700">API URL</span>
          <input
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="px-3 py-2 rounded-lg border"
            placeholder="https://seu-backend/api/nutri"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-700">API Key (opcional)</span>
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="px-3 py-2 rounded-lg border"
            placeholder="chave-secreta"
          />
        </label>

        <div className="flex gap-2">
          <button
            onClick={save}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white"
          >
            Salvar
          </button>
          <button
            onClick={() => {
              setApiUrl("");
              setApiKey("");
              localStorage.removeItem("nutri_api_url");
              localStorage.removeItem("nutri_api_key");
            }}
            className="px-4 py-2 rounded-lg border"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

// Tela de Login
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("nutri_logged_in", "true");
      setIsLoggedIn(true);
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  if (isLoggedIn) {
    return <NutriAIMain />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">NutriAI — Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
