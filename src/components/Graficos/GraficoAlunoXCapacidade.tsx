import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../services/api";

const MyPieChart: React.FC = () => {
  const [alunos, setAlunos] = useState<[]>([]);
  const [capacidadeNumber, setCapacidade] = useState<number>(0);

  const getInformationsGraphic = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      // 🔹 Busca alunos
      const alunosResponse = await api.get("/alunosData/Data", {
        headers: { Authorization: token },
      });

      // 🔹 Busca capacidade da academia
      const capacidadeResponse = await api.get("/gymProfile/gymProfileData", {
        headers: { Authorization: token },
      });

      const capacidadeMax = Number(capacidadeResponse.data.capacidadeMax);

      setAlunos(alunosResponse.data.consultaAlunos);
      setCapacidade(capacidadeMax);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInformationsGraphic();
  }, []);

  // 🔹 Calcula dinamicamente os valores do gráfico
  const alunosNumber = alunos.length;
  const capacidadeRestante = capacidadeNumber - alunosNumber;

  const data = [
    { name: "Alunos", value: alunosNumber },
    { name: "Capacidade Restante", value: capacidadeRestante },
  ];

  const COLORS = ["#e03b3b", "#33cc26"];

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
