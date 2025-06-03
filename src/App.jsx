import { useEffect, useState } from "react";

function App() {
  const [conversations, setConversations] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://wppweb.onrender.com/status")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setConversations(data.conversations || {});
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
      });
  }, []);

  const filteredEntries = Object.entries(conversations).filter(([wa_id]) =>
    wa_id.includes(filter)
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mensagens do WhatsApp</h1>

      <input
        placeholder="Filtrar por número..."
        className="mb-4 border p-2 rounded w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filteredEntries.length === 0 && (
        <p className="text-gray-500">Nenhuma conversa encontrada.</p>
      )}

      {filteredEntries.map(([wa_id, data]) => (
        <div key={wa_id} className="border rounded p-4 mb-4 shadow">
          <h2 className="text-lg font-semibold">{wa_id}</h2>
          <p className="text-sm text-gray-500 mb-2">
            Última mensagem: {new Date(data.last_message).toLocaleString()}
          </p>
          <ul className="list-disc list-inside">
            {data.history.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
