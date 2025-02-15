import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../services/api";

const MyPieChart: React.FC = () => {
  const [alunos, setAlunos] = useState<[]>([]);
  const [funcionarios, setFuncionarios] = useState<[]>([]);

  const getInformationsGraphic = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      // 🔹 Busca alunos Noite
      const alunosNoiteResponse = await api.get("/alunosData/DataNoite", {
        headers: { Authorization: token },
      });

      // 🔹 Busca Funcionários Noite
      const funcionariosNoiteResponse = await api.get("/listarFuncionario/ListarNoite", {
        headers: {
            Authorization: token
        }
      })

      setFuncionarios(funcionariosNoiteResponse.data.response)
      setAlunos(alunosNoiteResponse.data.consultaAlunos);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInformationsGraphic();
  }, []);

  // 🔹 Valores do gráfico
  const alunosNoiteNumber = alunos.length;
  const funcionariosNoiteNumber = funcionarios.length

  const data = [
    { name: "Alunos Noite", value: alunosNoiteNumber },
    { name: "Funcionários Noite", value: funcionariosNoiteNumber },
  ];

  const COLORS = ["#F59E0B", "#1E3A8A"];

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
