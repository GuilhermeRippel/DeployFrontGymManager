import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../services/api";

const MyPieChart: React.FC = () => {
  const [alunos, setAlunos] = useState<[]>([]);
  const [totalAparelhos, setTotalAparelhos] = useState<[]>([]);

  const getInformationsGraphic = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      // 🔹 Busca alunos
      const alunosResponse = await api.get("/alunosData/Data", {
        headers: { Authorization: token },
      });

      // 🔹 Busca Total Aparelhos
      const totalAparelhos = await api.get("/listarAparelho/Listar", {
        headers: { Authorization: token },
      });

      setAlunos(alunosResponse.data.consultaAlunos);
      setTotalAparelhos(totalAparelhos.data.getAparelhos);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInformationsGraphic();
  }, []);

  // 🔹 Valores do gráfico
  const alunosNumber = alunos.length;
  const aparelhos = totalAparelhos.length;

  const data = [
    { name: "Total Alunos", value: alunosNumber },
    { name: "Total Aparelhos", value: aparelhos },
  ];

  const COLORS = ["#8fac28", "#1a1735"];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyPieChart;
